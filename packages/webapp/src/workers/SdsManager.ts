/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import type { Remote } from 'comlink'
import { expose, proxy } from 'comlink'
import type {
	HeaderNames,
	IAggregateResult,
	IAggregateStatistics,
	IAttributesIntersectionByColumn,
	ICsvDataParameters,
	IEvaluateResult,
	IGenerateResult,
	ISelectedAttributesByColumn,
} from 'sds-wasm'

import type { AggregateStatisticsGenerator } from './AggregateStatisticsGenerator'
import AggregateStatisticsGeneratorWorker from './AggregateStatisticsGenerator?worker'
import type {
	AggregateType,
	ICancelablePromise,
	ISynthesisInfo,
	ISynthesisParameters,
	IWasmSynthesizerWorkerInfo,
	Proxy,
	WorkerProgressCallback,
} from './types'
import { IWasmSynthesizerWorkerStatus } from './types'
import type { IWorkerProxy } from './utils'
import { AtomicView, createWorkerProxy } from './utils'
import type { WasmSynthesizer } from './WasmSynthesizer'
import WasmSynthesizerWorker from './WasmSynthesizer?worker'

export type SynthesisEventCallback = (
	synthesisInfo: ISynthesisInfo,
) => Promise<void>

export class SdsManager {
	private _name: string
	private _aggregateStatisticsWorkerProxy: IWorkerProxy<
		typeof AggregateStatisticsGenerator
	> | null
	private _aggregateStatisticsGenerator: Remote<AggregateStatisticsGenerator> | null
	private _synthesizerWorkersInfoMap: Map<string, IWasmSynthesizerWorkerInfo>
	private _synthesisStartedCallback: Proxy<SynthesisEventCallback> | null
	private _synthesisFinishedCallback: Proxy<SynthesisEventCallback> | null
	private _synthesisProgressUpdatedCallback: Proxy<SynthesisEventCallback> | null
	private _synthesisTerminatedCallback: Proxy<SynthesisEventCallback> | null

	constructor(name: string) {
		this._name = name
		this._aggregateStatisticsWorkerProxy = null
		this._aggregateStatisticsGenerator = null
		this._synthesizerWorkersInfoMap = new Map()
		this._synthesisStartedCallback = null
		this._synthesisFinishedCallback = null
		this._synthesisProgressUpdatedCallback = null
		this._synthesisTerminatedCallback = null
	}

	public async registerSynthesisStartedCallback(
		cb: Proxy<SynthesisEventCallback>,
	): Promise<void> {
		this._synthesisStartedCallback = cb
	}

	public async unregisterSynthesisStartedCallback(): Promise<void> {
		this._synthesisStartedCallback = null
	}

	public async registerSynthesisFinishedCallback(
		cb: Proxy<SynthesisEventCallback>,
	): Promise<void> {
		this._synthesisFinishedCallback = cb
	}

	public async unregisterSynthesisFinishedCallback(): Promise<void> {
		this._synthesisFinishedCallback = null
	}

	public async registerSynthesisProgressUpdatedCallback(
		cb: Proxy<SynthesisEventCallback>,
	): Promise<void> {
		this._synthesisProgressUpdatedCallback = cb
	}

	public async unregisterSynthesisProgressUpdatedCallback(): Promise<void> {
		this._synthesisProgressUpdatedCallback = null
	}

	public async registerSynthesisTerminatedCallback(
		cb: Proxy<SynthesisEventCallback>,
	): Promise<void> {
		this._synthesisTerminatedCallback = cb
	}

	public async unregisterSynthesisTerminatedCallback(): Promise<void> {
		this._synthesisTerminatedCallback = null
	}

	public async init(): Promise<void> {
		this._aggregateStatisticsWorkerProxy = createWorkerProxy<
			typeof AggregateStatisticsGenerator
		>(new AggregateStatisticsGeneratorWorker())
		this._aggregateStatisticsGenerator =
			await new this._aggregateStatisticsWorkerProxy.ProxyConstructor(
				`${this._name}:AggregateStatisticsGenerator`,
			)
		// eslint-disable-next-line @essex/adjacent-await
		await this._aggregateStatisticsGenerator.init()
	}

	public async terminate(): Promise<void> {
		await this._aggregateStatisticsGenerator?.terminate()
		this._aggregateStatisticsWorkerProxy?.terminate()

		// terminate all synthesizers
		await Promise.all(
			[...this._synthesizerWorkersInfoMap.keys()].map(k =>
				this.terminateSynthesizer(k),
			),
		)
	}

	public async generateAggregateStatistics(
		csvData: string,
		csvDataParameters: ICsvDataParameters,
		reportingLength: number,
		resolution: number,
		progressCallback?: Proxy<WorkerProgressCallback>,
	): Promise<Remote<ICancelablePromise<IAggregateStatistics>> | undefined> {
		const aggregateStatisticsGenerator = this.getAggregateStatisticsGenerator()
		const continueExecutingView = new AtomicView(AtomicView.createBuffer(true))

		return proxy({
			promise: aggregateStatisticsGenerator.generateAggregateStatistics(
				csvData,
				csvDataParameters,
				reportingLength,
				resolution,
				continueExecutingView.getBuffer(),
				progressCallback,
			),
			cancel: () => {
				continueExecutingView.set(false)
			},
		}) as unknown as Remote<ICancelablePromise<IAggregateStatistics>>
	}

	public async terminateSynthesizer(key: string): Promise<void> {
		const s = this.getSynthesizerWorkInfo(key)

		s.shouldRun.set(false)
		await s.synthesizer.terminate()
		s.synthesizerWorkerProxy.terminate()
		this._synthesizerWorkersInfoMap.delete(key)
		this._synthesisTerminatedCallback?.(s.synthesisInfo)
	}

	public async startGenerateAndEvaluate(
		key: string,
		csvData: string,
		parameters: ISynthesisParameters,
	): Promise<void> {
		if (this._synthesizerWorkersInfoMap.has(key)) {
			throw new Error(`synthesis for ${key} already exists`)
		}
		const synthesizerWorkerProxy = createWorkerProxy<typeof WasmSynthesizer>(
			new WasmSynthesizerWorker(),
		)
		const progressView = new AtomicView(AtomicView.createBuffer(0))
		const shouldRunView = new AtomicView(AtomicView.createBuffer(true))
		const s: IWasmSynthesizerWorkerInfo = {
			synthesisInfo: {
				key,
				parameters,
				status: IWasmSynthesizerWorkerStatus.RUNNING,
				startedAt: new Date(),
				progress: progressView.getBuffer(),
			},
			synthesizerWorkerProxy,
			synthesizer: await new synthesizerWorkerProxy.ProxyConstructor(
				`${this._name}:WasmSynthesizer:${key}`,
			),
			shouldRun: shouldRunView,
		}

		await s.synthesizer.init()
		this._synthesizerWorkersInfoMap.set(key, s)
		this.dispatchSynthesis(s, csvData, parameters, progressView)
	}

	public async getAllSynthesisInfo(): Promise<ISynthesisInfo[]> {
		return [...this._synthesizerWorkersInfoMap.values()].map(
			s => s.synthesisInfo,
		)
	}

	public async navigate(key: string): Promise<void> {
		await this.getSynthesizerWorkInfo(key).synthesizer.navigate()
	}

	public async selectAttributes(
		key: string,
		attributes: ISelectedAttributesByColumn,
	): Promise<void> {
		await this.getSynthesizerWorkInfo(key).synthesizer.selectAttributes(
			attributes,
		)
	}

	public async attributesIntersectionByColumn(
		key: string,
		columns: HeaderNames,
	): Promise<IAttributesIntersectionByColumn> {
		return await this.getSynthesizerWorkInfo(
			key,
		).synthesizer.attributesIntersectionByColumn(columns)
	}

	public async getAggregateResult(
		key: string,
		aggregateType: AggregateType,
		aggregatesDelimiter: string,
		combinationDelimiter: string,
	): Promise<IAggregateResult> {
		return await this.getSynthesizerWorkInfo(
			key,
		).synthesizer.getAggregateResult(
			aggregateType,
			aggregatesDelimiter,
			combinationDelimiter,
		)
	}

	public async getGenerateResult(key: string): Promise<IGenerateResult> {
		return await this.getSynthesizerWorkInfo(
			key,
		).synthesizer.getGenerateResult()
	}

	public async getEvaluateResult(key: string): Promise<IEvaluateResult> {
		return await this.getSynthesizerWorkInfo(
			key,
		).synthesizer.getEvaluateResult()
	}

	private getAggregateStatisticsGenerator(): Remote<AggregateStatisticsGenerator> {
		if (this._aggregateStatisticsGenerator === null) {
			throw new Error(
				`"${this._name}" worker has not been properly initialized, did you call init?`,
			)
		}
		return this._aggregateStatisticsGenerator
	}

	private getSynthesizerWorkInfo(key: string): IWasmSynthesizerWorkerInfo {
		const s = this._synthesizerWorkersInfoMap.get(key)

		if (s === undefined) {
			throw new Error(`synthesizer with "${key}" not found`)
		}
		return s
	}

	private async dispatchSynthesis(
		s: IWasmSynthesizerWorkerInfo,
		csvData: string,
		parameters: ISynthesisParameters,
		progressView: AtomicView,
	): Promise<void> {
		await this._synthesisStartedCallback?.(s.synthesisInfo)
		s.synthesizer
			.generateAndEvaluate(
				csvData,
				parameters,
				s.shouldRun.getBuffer(),
				proxy((p: number) => {
					this._synthesisProgressUpdatedCallback?.(s.synthesisInfo)
					progressView.set(p)
				}),
			)
			.then(async () => {
				s.synthesisInfo.status = IWasmSynthesizerWorkerStatus.FINISHED
				s.synthesisInfo.finishedAt = new Date()
				await this._synthesisFinishedCallback?.(s.synthesisInfo)
			})
			.catch(async err => {
				s.synthesisInfo.status = IWasmSynthesizerWorkerStatus.ERROR
				s.synthesisInfo.finishedAt = new Date()
				s.synthesisInfo.errorMessage = err.toString()
				await this._synthesisFinishedCallback?.(s.synthesisInfo)
			})
	}
}

expose(SdsManager)
