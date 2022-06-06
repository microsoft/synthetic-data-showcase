/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { expose } from 'comlink'
import type { IAggregateStatistics, ICsvDataParameters } from 'sds-wasm'

/* eslint-disable */
import { BaseSdsWasmWorker } from './BaseSdsWasmWorker'
import type { Proxy, WorkerProgressCallback } from './types'
import type { AtomicBuffer } from './utils'
import { AtomicView } from './utils'
/* eslint-enable */

export class AggregateStatisticsGenerator extends BaseSdsWasmWorker {
	public async generateAggregateStatistics(
		csvData: string,
		csvDataParameters: ICsvDataParameters,
		reportingLength: number,
		resolution: number,
		continueExecuting: AtomicBuffer,
		progressCallback?: Proxy<WorkerProgressCallback>,
	): Promise<IAggregateStatistics | null> {
		const context = this.getContext()

		if (csvDataParameters.useColumns.length !== 0) {
			const continueExecutingView = new AtomicView(continueExecuting)

			context.setSensitiveData(csvData, csvDataParameters)
			return context.sensitiveAggregateStatistics(
				reportingLength,
				resolution,
				p => {
					progressCallback?.(p)
					return continueExecutingView.getBoolean()
				},
			)
		} else {
			context.clear()
			return null
		}
	}
}

expose(AggregateStatisticsGenerator)
