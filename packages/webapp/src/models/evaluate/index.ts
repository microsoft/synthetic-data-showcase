/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { IAggregatedCountByLen, IAggregatedResult } from '~models/aggregate'

export interface IPreservationByCountBucket {
	size: number
	preservationSum: number
	lengthSum: number
}

export interface IPreservationByCountBuckets {
	[bucket_index: number]: IPreservationByCountBucket
}

export interface IEvaluatedResult {
	sensitiveAggregatedResult?: IAggregatedResult
	syntheticAggregatedResult?: IAggregatedResult
	leakageCountByLen?: IAggregatedCountByLen
	fabricatedCountByLen?: IAggregatedCountByLen
	preservationByCountBuckets?: IPreservationByCountBuckets
	combinationLoss?: number
	recordExpansion?: number
}

export const defaultEvaluatedResult: IEvaluatedResult = {
	sensitiveAggregatedResult: undefined,
	syntheticAggregatedResult: undefined,
	leakageCountByLen: undefined,
	fabricatedCountByLen: undefined,
	combinationLoss: undefined,
}
