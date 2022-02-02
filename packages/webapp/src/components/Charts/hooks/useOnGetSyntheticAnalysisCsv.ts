/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { useCallback } from 'react'
import { EvaluationMetrics } from '~models'

export function useOnGetSyntheticAnalysisCsv(
	lenLabels: number[],
	evaluationMetrics: EvaluationMetrics,
	delimiter = ',',
): () => string {
	return useCallback(() => {
		let data = `Length${delimiter}Mean synthetic count${delimiter}Rare synthetic combinations percentage${delimiter}Distinct synthetic combinations${delimiter}Leakage count${delimiter}Fabricated count${delimiter}Preservation percentage\n`

		lenLabels.forEach(l => {
			data += `${l}${delimiter}${evaluationMetrics.meanSyntheticCombinationCountByLen[l]}${delimiter}${evaluationMetrics.rareSyntheticCombinationsPercentageByLen[l]}${delimiter}${evaluationMetrics.numberOfDistinctSyntheticCombinationsByLen[l]}${delimiter}${evaluationMetrics.leakageCountByLen[l]}${delimiter}${evaluationMetrics.fabricatedCountByLen[l]}${delimiter}${evaluationMetrics.preservationPercentageByLen[l]}\n`
		})

		return data
	}, [lenLabels, evaluationMetrics, delimiter])
}
