/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { useCallback } from 'react'

import type { DownloadInfo } from '~components/controls/DownloadButton'
import type { EvaluationMetrics } from '~models'

import { useOnGetSensitiveAnalysisCsv } from '.'

export function useOnGetSensitiveAnalysisDownloadInfo(
	lenLabels: number[],
	evaluationMetrics: EvaluationMetrics,
	delimiter = ',',
	type = 'text/csv',
	alias = 'sensitive_analysis_by_length.csv',
): () => Promise<DownloadInfo | undefined> {
	const getSensitiveAnalysisCsv = useOnGetSensitiveAnalysisCsv(
		lenLabels,
		evaluationMetrics,
		delimiter,
	)

	return useCallback(async () => {
		const data = getSensitiveAnalysisCsv()

		return {
			url: URL.createObjectURL(
				new Blob([data], {
					type,
				}),
			),
			alias,
		}
	}, [getSensitiveAnalysisCsv, type, alias])
}
