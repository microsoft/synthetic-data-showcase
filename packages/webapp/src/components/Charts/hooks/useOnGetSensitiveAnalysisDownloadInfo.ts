/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { useCallback } from 'react'
import { DownloadInfo } from '~components/controls/DownloadButton'
import { EvaluationMetrics } from '~models'

export function useOnGetSensitiveAnalysisDownloadInfo(
	lenLabels: number[],
	evaluationMetrics: EvaluationMetrics,
	delimiter = ',',
	type = 'text/csv',
	alias = 'sensitive_analysis_by_length.csv',
): () => Promise<DownloadInfo | undefined> {
	return useCallback(async () => {
		let data = `Length${delimiter}Mean sensitive count${delimiter}Rare sensitive combinations percentage${delimiter}Distinct sensitive combinations\n`

		lenLabels.forEach(l => {
			data += `${l}${delimiter}${evaluationMetrics.meanSensitiveCombinationCountByLen[l]}${delimiter}${evaluationMetrics.rareSensitiveCombinationsPercentageByLen[l]}${delimiter}${evaluationMetrics.numberOfDistinctSensitiveCombinationsByLen[l]}\n`
		})

		return {
			url: URL.createObjectURL(
				new Blob([data], {
					type,
				}),
			),
			alias,
		}
	}, [lenLabels, evaluationMetrics, delimiter, type, alias])
}
