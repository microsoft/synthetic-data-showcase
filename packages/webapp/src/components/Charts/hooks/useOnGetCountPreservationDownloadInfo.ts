/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { useCallback } from 'react'
import { DownloadInfo } from '~components/controls/DownloadButton'
import { EvaluationMetrics } from '~models'

export function useOnGetCountPreservationDownloadInfo(
	countLabels: number[],
	evaluationMetrics: EvaluationMetrics,
	delimiter = ',',
	type = 'text/csv',
	alias = 'count_preservation.csv',
): () => Promise<DownloadInfo | undefined> {
	return useCallback(async () => {
		let data = `Bin${delimiter}Count preservation percentage${delimiter}Mean length of combinations\n`

		countLabels.forEach(c => {
			data += `${c}${delimiter}${evaluationMetrics.preservationPercentageByCount[c]}${delimiter}${evaluationMetrics.meanCombinationLengthByCount[c]}\n`
		})

		return {
			url: URL.createObjectURL(
				new Blob([data], {
					type,
				}),
			),
			alias,
		}
	}, [countLabels, evaluationMetrics, delimiter, type, alias])
}
