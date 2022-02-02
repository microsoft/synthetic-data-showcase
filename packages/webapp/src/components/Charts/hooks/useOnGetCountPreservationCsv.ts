/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { useCallback } from 'react'
import { EvaluationMetrics } from '~models'

export function useOnGetCountPreservationCsv(
	countLabels: number[],
	evaluationMetrics: EvaluationMetrics,
	delimiter = ',',
): () => string {
	return useCallback(() => {
		let data = `Bin${delimiter}Count preservation percentage${delimiter}Mean length of combinations\n`

		countLabels.forEach(c => {
			data += `${c}${delimiter}${evaluationMetrics.preservationPercentageByCount[c]}${delimiter}${evaluationMetrics.meanCombinationLengthByCount[c]}\n`
		})

		return data
	}, [countLabels, evaluationMetrics, delimiter])
}
