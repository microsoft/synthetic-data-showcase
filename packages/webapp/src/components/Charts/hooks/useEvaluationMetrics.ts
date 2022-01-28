/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { useMemo } from 'react'
import { IEvaluateResult } from 'sds-wasm'
import { EvaluationMetrics } from '~models'

export function useEvaluationMetrics(
	lenLabels: number[],
	countLabels: number[],
	res?: IEvaluateResult | null,
): EvaluationMetrics {
	return useMemo(() => {
		if (!res) {
			return {
				meanSensitiveCombinationCountByLen: {},
				rareSensitiveCombinationsPercentageByLen: {},
				numberOfDistinctSensitiveCombinationsByLen: {},
				meanSyntheticCombinationCountByLen: {},
				rareSyntheticCombinationsPercentageByLen: {},
				numberOfDistinctSyntheticCombinationsByLen: {},
				leakageCountByLen: {},
				fabricatedCountByLen: {},
				preservationPercentageByLen: {},
				preservationPercentageByCount: {},
				meanCombinationLengthByCount: {},
			}
		}

		return {
			meanSensitiveCombinationCountByLen: lenLabels.reduce((acc, l) => {
				acc[l] =
					(res.sensitiveAggregateResult.combinationsSumByLen[l] ?? 0) /
					(res.sensitiveAggregateResult.combinationsCountByLen[l] ?? 1)
				return acc
			}, {}),
			rareSensitiveCombinationsPercentageByLen: lenLabels.reduce((acc, l) => {
				acc[l] =
					((res.sensitiveAggregateResult.rareCombinationsCountByLen[l] ?? 0) *
						100) /
					(res.sensitiveAggregateResult.combinationsCountByLen[l] ?? 1)
				return acc
			}, {}),
			numberOfDistinctSensitiveCombinationsByLen: lenLabels.reduce((acc, l) => {
				acc[l] = res.sensitiveAggregateResult.combinationsCountByLen[l] ?? 0
				return acc
			}, {}),
			meanSyntheticCombinationCountByLen: lenLabels.reduce((acc, l) => {
				acc[l] =
					(res.syntheticAggregateResult.combinationsSumByLen[l] ?? 0) /
					(res.syntheticAggregateResult.combinationsCountByLen[l] ?? 1)
				return acc
			}, {}),
			rareSyntheticCombinationsPercentageByLen: lenLabels.reduce((acc, l) => {
				acc[l] =
					((res.syntheticAggregateResult.rareCombinationsCountByLen[l] ?? 0) *
						100) /
					(res.syntheticAggregateResult.combinationsCountByLen[l] ?? 1)
				return acc
			}, {}),
			numberOfDistinctSyntheticCombinationsByLen: lenLabels.reduce((acc, l) => {
				acc[l] = res.syntheticAggregateResult.combinationsCountByLen[l] ?? 0
				return acc
			}, {}),
			leakageCountByLen: lenLabels.reduce((acc, l) => {
				acc[l] = res.leakageCountByLen[l] ?? 0
				return acc
			}, {}),
			fabricatedCountByLen: lenLabels.reduce((acc, l) => {
				acc[l] = res.fabricatedCountByLen[l] ?? 0
				return acc
			}, {}),
			preservationPercentageByLen: lenLabels.reduce((acc, l) => {
				acc[l] =
					((res.syntheticAggregateResult.combinationsCountByLen[l] ?? 0) *
						100) /
					(res.sensitiveAggregateResult.combinationsCountByLen[l] ?? 1)
				return acc
			}, {}),
			preservationPercentageByCount: countLabels.reduce((acc, l) => {
				acc[l] =
					((res.preservationByCount.buckets[l].preservationSum ?? 0) * 100) /
					Number(res.preservationByCount.buckets[l].size ?? 1)
				return acc
			}, {}),
			meanCombinationLengthByCount: countLabels.reduce((acc, l) => {
				acc[l] =
					Number(res.preservationByCount.buckets[l].lengthSum ?? 0) /
					Number(res.preservationByCount.buckets[l].size ?? 1)
				return acc
			}, {}),
		}
	}, [res, lenLabels, countLabels])
}
