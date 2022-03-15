/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { useCallback } from 'react'

import type { EvaluationMetrics } from '~models'

export function useOnGetSensitiveAnalysisCsv(
	lenLabels: number[],
	evaluationMetrics: EvaluationMetrics,
	delimiter = ',',
): () => string {
	return useCallback(() => {
		let data = `Length${delimiter}Mean sensitive count${delimiter}Rare sensitive combinations percentage${delimiter}Distinct sensitive combinations\n`

		lenLabels.forEach(l => {
			data += `${l}${delimiter}${evaluationMetrics.meanSensitiveCombinationCountByLen[l]}${delimiter}${evaluationMetrics.rareSensitiveCombinationsPercentageByLen[l]}${delimiter}${evaluationMetrics.numberOfDistinctSensitiveCombinationsByLen[l]}\n`
		})

		return data
	}, [lenLabels, evaluationMetrics, delimiter])
}
