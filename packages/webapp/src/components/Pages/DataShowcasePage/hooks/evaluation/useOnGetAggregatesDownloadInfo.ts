/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { useCallback } from 'react'
import { DownloadInfo } from '~components/controls/DownloadButton'
import { useWasmWorkerValue } from '~states'

export function useOnGetAggregatesDownloadInfo(
	aggregatesDelimiter = ',',
	combinationDelimiter = ';',
	type = 'text/csv',
	alias = 'sensitive_aggregates.csv',
): () => Promise<DownloadInfo | undefined> {
	const worker = useWasmWorkerValue()

	return useCallback(async () => {
		const result = await worker?.getSensitiveAggregateResult(
			aggregatesDelimiter,
			combinationDelimiter,
			true,
		)
		if (result?.aggregatesData) {
			return {
				url: URL.createObjectURL(
					new Blob([result.aggregatesData], {
						type,
					}),
				),
				alias,
			}
		}
		return undefined
	}, [worker, aggregatesDelimiter, combinationDelimiter, type, alias])
}
