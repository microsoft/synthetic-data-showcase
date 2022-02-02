/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { useCallback } from 'react'
import { useOnGetSyntheticAnalysisCsv } from '.'
import { DownloadInfo } from '~components/controls/DownloadButton'
import { EvaluationMetrics } from '~models'

export function useOnGetSyntheticAnalysisDownloadInfo(
	lenLabels: number[],
	evaluationMetrics: EvaluationMetrics,
	delimiter = ',',
	type = 'text/csv',
	alias = 'synthetic_analysis_by_length.csv',
): () => Promise<DownloadInfo | undefined> {
	const getSyntheticAnalysisCsv = useOnGetSyntheticAnalysisCsv(
		lenLabels,
		evaluationMetrics,
		delimiter,
	)

	return useCallback(async () => {
		const data = getSyntheticAnalysisCsv()

		return {
			url: URL.createObjectURL(
				new Blob([data], {
					type,
				}),
			),
			alias,
		}
	}, [getSyntheticAnalysisCsv, type, alias])
}
