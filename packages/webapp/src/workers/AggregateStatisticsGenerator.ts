/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import type { Remote } from 'comlink'
import { expose } from 'comlink'
import type { IAggregateStatistics, ICsvDataParameters } from 'sds-wasm'

import { BaseSdsWasmWorker } from './BaseSdsWasmWorker'
import type { Proxy, WorkerProgressCallback } from './types'
import type { AtomicBoolean } from './utils'
import { AtomicBooleanView } from './utils'

export class AggregateStatisticsGenerator extends BaseSdsWasmWorker {
	public async generateAggregateStatistics(
		csvData: string,
		csvDataParameters: ICsvDataParameters,
		reportingLength: number,
		resolution: number,
		progressCallback: Proxy<WorkerProgressCallback>,
		continueExecuting: AtomicBoolean,
	): Promise<IAggregateStatistics> {
		const context = this.getContext()
		const continueExecutingView = new AtomicBooleanView(continueExecuting)
		const progressCallbackRemote =
			progressCallback as unknown as Remote<WorkerProgressCallback>

		context.setSensitiveData(csvData, csvDataParameters)

		return context.sensitiveAggregateStatistics(
			reportingLength,
			resolution,
			p => {
				progressCallbackRemote(p)
				return continueExecutingView.get()
			},
		)
	}
}

expose(AggregateStatisticsGenerator)
