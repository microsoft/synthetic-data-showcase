/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import type {
	HeaderNames,
	IAggregateResult,
	IAggregateStatistics,
	IAttributesIntersectionByColumn,
	ICsvDataParameters,
	IEvaluateResult,
	IGenerateResult,
	INavigateResult,
	ISelectedAttributesByColumn,
} from '@essex/sds-core'
import type { Remote } from 'comlink'
import { expose, proxy } from 'comlink'
import { uniqueId } from 'lodash'

/* eslint-disable */
import type { AggregateStatisticsGenerator } from './AggregateStatisticsGenerator'
import AggregateStatisticsGeneratorWorker from './AggregateStatisticsGenerator?worker'
import type {
	AggregateType,
	ICancelablePromise,
	ISdsManagerSynthesisCallbacks,
	ISynthesisInfo,
	ISynthesisParameters,
	IWasmSynthesizerWorkerInfo,
	Proxy,
	WorkerProgressCallback,
} from './types'
import { IWasmSynthesizerWorkerStatus } from './types'
import type { IWorkerProxy } from './utils'
import { createWorkerProxy } from './utils'
import type { WasmSynthesizer } from './WasmSynthesizer'
import WasmSynthesizerWorker from './WasmSynthesizer?worker'
/* eslint-enable */

export class SdsManager {
	private _name: string
	private _aggregateStatisticsWorkerProxy: IWorkerProxy<
		typeof AggregateStatisticsGenerator
	> | null
	private _synthesizerWorkersInfoMap: Map<string, IWasmSynthesizerWorkerInfo>
	private _synthesisCallbacks: Proxy<ISdsManagerSynthesisCallbacks> | null

	constructor(name: string) {
		this._name = name
		this._aggregateStatisticsWorkerProxy = null
		this._synthesizerWorkersInfoMap = new Map()
		this._synthesisCallbacks = null
	}

	public async registerSynthesisCallback(
		synthesisCallbacks: Proxy<ISdsManagerSynthesisCallbacks> | null,
	): Promise<void> {
		this._synthesisCallbacks = synthesisCallbacks
	}

	public async initAggregateStatisticsWorker(): Promise<
		Remote<AggregateStatisticsGenerator>
	> {
		// force the termination of any pending execution that has not finished
		this.forceAggregateStatisticsWorkerToTerminate()

		this._aggregateStatisticsWorkerProxy = createWorkerProxy<
			typeof AggregateStatisticsGenerator
		>(new AggregateStatisticsGeneratorWorker())

		const aggregateStatisticsGenerator =
			await new this._aggregateStatisticsWorkerProxy.ProxyConstructor(
				`${this._name}:AggregateStatisticsGenerator`,
			)

		// eslint-disable-next-line @essex/adjacent-await
		await aggregateStatisticsGenerator.init()

		return aggregateStatisticsGenerator
	}

	public forceAggregateStatisticsWorkerToTerminate(): void {
		this._aggregateStatisticsWorkerProxy?.terminate()
		this._aggregateStatisticsWorkerProxy = null
	}

	public async terminate(): Promise<void> {
		this._aggregateStatisticsWorkerProxy?.terminate()
		await this.terminateAllSynthesizers()
	}

	public async generateAggregateStatistics(
		csvData: string,
		csvDataParameters: ICsvDataParameters,
		reportingLength: number,
		resolution: number,
		progressCallback?: Proxy<WorkerProgressCallback>,
	): Promise<
		Remote<ICancelablePromise<IAggregateStatistics | null>> | undefined
	> {
		const aggregateStatisticsGenerator =
			await this.initAggregateStatisticsWorker()

		return proxy({
			id: uniqueId(),
			promise: aggregateStatisticsGenerator.generateAggregateStatistics(
				csvData,
				csvDataParameters,
				reportingLength,
				resolution,
				progressCallback,
			),
			cancel: () => {
				this.forceAggregateStatisticsWorkerToTerminate()
			},
		}) as unknown as Remote<ICancelablePromise<IAggregateStatistics>>
	}

	public async terminateAllSynthesizers(): Promise<void> {
		await Promise.all(
			[...this._synthesizerWorkersInfoMap.keys()].map(k =>
				this.terminateSynthesizer(k),
			),
		)
	}

	public async terminateSynthesizer(key: string): Promise<void> {
		// this directly terminates the worker without signaling the wasm code
		// - this is done to avoid the use of SAB necessary to signal that
		//   the wasm code need to stop executing nicely
		// this way, if the worker is running a synthesis, it will
		// be forced to terminate
		const s = this.getSynthesizerWorkInfo(key)
		const oldStatus = s.synthesisInfo.status

		s.synthesisInfo.status = IWasmSynthesizerWorkerStatus.TERMINATING
		this._synthesisCallbacks?.terminating?.(s.synthesisInfo)

		// properly terminate and cleanup if not running a synthesis
		if (oldStatus !== IWasmSynthesizerWorkerStatus.RUNNING) {
			await s.synthesizer.terminate()
		}
		s.synthesizerWorkerProxy.terminate()
		this._synthesizerWorkersInfoMap.delete(key)

		s.synthesisInfo.status = IWasmSynthesizerWorkerStatus.TERMINATED
		this._synthesisCallbacks?.terminated?.(s.synthesisInfo)
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
		const s: IWasmSynthesizerWorkerInfo = {
			synthesisInfo: {
				key,
				parameters,
				status: IWasmSynthesizerWorkerStatus.RUNNING,
				startedAt: new Date(),
				progress: 0,
			},
			synthesizerWorkerProxy,
			synthesizer: await new synthesizerWorkerProxy.ProxyConstructor(
				`${this._name}:WasmSynthesizer:${key}`,
			),
		}

		await s.synthesizer.init()
		this._synthesizerWorkersInfoMap.set(key, s)
		this.dispatchSynthesis(s, csvData, parameters)
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

	public async attributesIntersectionsByColumn(
		key: string,
		columns: HeaderNames,
	): Promise<IAttributesIntersectionByColumn> {
		return await this.getSynthesizerWorkInfo(
			key,
		).synthesizer.attributesIntersectionsByColumn(columns)
	}

	public async getAggregateResult(
		key: string,
		aggregateType: AggregateType,
		aggregatesDelimiter: string,
		combinationDelimiter: string,
		caseInsensitiveCombinationsOrder = false,
	): Promise<IAggregateResult> {
		return await this.getSynthesizerWorkInfo(
			key,
		).synthesizer.getAggregateResult(
			aggregateType,
			aggregatesDelimiter,
			combinationDelimiter,
			caseInsensitiveCombinationsOrder,
		)
	}

	public async getGenerateResult(
		key: string,
		joinMultiValueColumns: boolean,
		longForm = false,
	): Promise<IGenerateResult> {
		return await this.getSynthesizerWorkInfo(key).synthesizer.getGenerateResult(
			joinMultiValueColumns,
			longForm,
		)
	}

	public async getEvaluateResult(key: string): Promise<IEvaluateResult> {
		return await this.getSynthesizerWorkInfo(
			key,
		).synthesizer.getEvaluateResult()
	}

	public async getNavigateResult(key: string): Promise<INavigateResult> {
		return await this.getSynthesizerWorkInfo(
			key,
		).synthesizer.getNavigateResult()
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
	): Promise<void> {
		await this._synthesisCallbacks?.started?.(s.synthesisInfo)
		s.synthesizer
			.generateAndEvaluate(
				csvData,
				parameters,
				proxy((p: number) => {
					s.synthesisInfo.progress = p
					this._synthesisCallbacks?.progressUpdated?.(s.synthesisInfo)
				}),
			)
			.then(async () => {
				s.synthesisInfo.status = IWasmSynthesizerWorkerStatus.FINISHED
				s.synthesisInfo.finishedAt = new Date()
				await this._synthesisCallbacks?.finished?.(s.synthesisInfo)
			})
			.catch(async err => {
				s.synthesisInfo.status = IWasmSynthesizerWorkerStatus.ERROR
				s.synthesisInfo.finishedAt = new Date()
				s.synthesisInfo.errorMessage = err.toString()
				await this._synthesisCallbacks?.finished?.(s.synthesisInfo)
			})
	}
}

expose(SdsManager)
