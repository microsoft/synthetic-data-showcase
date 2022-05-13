/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import type { Remote } from 'comlink'
import { expose, proxy } from 'comlink'
import type { IAggregateStatistics, ICsvDataParameters } from 'sds-wasm'

import type { AggregateStatisticsGenerator } from './AggregateStatisticsGenerator'
import AggregateStatisticsGeneratorWorker from './AggregateStatisticsGenerator?worker'
import type { ICancelablePromise, Proxy, WorkerProgressCallback } from './types'
import type { IWorkerProxy } from './utils'
import { AtomicView, createWorkerProxy } from './utils'

export class SdsManager {
	private _aggregateStatisticsWorkerProxy: IWorkerProxy<
		typeof AggregateStatisticsGenerator
	> | null
	private _aggregateStatisticsGenerator: Remote<AggregateStatisticsGenerator> | null
	private _name: string

	constructor(name: string) {
		this._aggregateStatisticsWorkerProxy = null
		this._aggregateStatisticsGenerator = null
		this._name = name
	}

	public async init(wasmPath: string, logLevel: string): Promise<void> {
		this._aggregateStatisticsWorkerProxy = createWorkerProxy<
			typeof AggregateStatisticsGenerator
		>(new AggregateStatisticsGeneratorWorker())
		this._aggregateStatisticsGenerator =
			await new this._aggregateStatisticsWorkerProxy.ProxyConstructor(
				`${this._name}:AggregateStatisticsGenerator`,
			)
		// eslint-disable-next-line @essex/adjacent-await
		await this._aggregateStatisticsGenerator.init(wasmPath, logLevel)
	}

	public async terminate(): Promise<void> {
		await this._aggregateStatisticsGenerator?.terminate()
		this._aggregateStatisticsWorkerProxy?.terminate()
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

	private getAggregateStatisticsGenerator(): Remote<AggregateStatisticsGenerator> {
		if (this._aggregateStatisticsGenerator === null) {
			throw new Error(
				`"${this._name}" worker has not been properly initialized, did you call init?`,
			)
		}
		return this._aggregateStatisticsGenerator
	}
}

expose(SdsManager)
