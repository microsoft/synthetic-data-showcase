/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import type { IAggregateStatistics, ICsvDataParameters } from '@essex/sds-core'
import { expose } from 'comlink'

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
		progressCallback?: Proxy<WorkerProgressCallback>,
	): Promise<IAggregateStatistics | null> {
		const context = this.getContext()

		if (csvDataParameters.useColumns.length !== 0) {
			context.setSensitiveData(csvData, csvDataParameters)
			return context.sensitiveAggregateStatistics(
				reportingLength,
				resolution,
				p => {
					progressCallback?.(p)
					return true
				},
			)
		} else {
			context.clear()
			return null
		}
	}
}

expose(AggregateStatisticsGenerator)
