/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { useCallback } from 'react'
import { useOnGetCountPreservationCsv } from './useOnGetCountPreservationCsv'
import { DownloadInfo } from '~components/controls/DownloadButton'
import { EvaluationMetrics } from '~models'

export function useOnGetCountPreservationDownloadInfo(
	countLabels: number[],
	evaluationMetrics: EvaluationMetrics,
	delimiter = ',',
	type = 'text/csv',
	alias = 'count_preservation.csv',
): () => Promise<DownloadInfo | undefined> {
	const getPreservationCountCsv = useOnGetCountPreservationCsv(
		countLabels,
		evaluationMetrics,
		delimiter,
	)

	return useCallback(async () => {
		const data = getPreservationCountCsv()

		return {
			url: URL.createObjectURL(
				new Blob([data], {
					type,
				}),
			),
			alias,
		}
	}, [getPreservationCountCsv, type, alias])
}
