/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { IMetrics } from '~models'

export interface EvaluationMetrics {
	meanSensitiveCombinationCountByLen: IMetrics
	rareSensitiveCombinationsPercentageByLen: IMetrics
	numberOfDistinctSensitiveCombinationsByLen: IMetrics
	meanSyntheticCombinationCountByLen: IMetrics
	rareSyntheticCombinationsPercentageByLen: IMetrics
	numberOfDistinctSyntheticCombinationsByLen: IMetrics
	leakageCountByLen: IMetrics
	fabricatedCountByLen: IMetrics
	preservationPercentageByLen: IMetrics
	preservationPercentageByCount: IMetrics
	meanCombinationLengthByCount: IMetrics
}
