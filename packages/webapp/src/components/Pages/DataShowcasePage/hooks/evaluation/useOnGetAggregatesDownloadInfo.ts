/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { useCallback } from 'react'

import type { DownloadInfo } from '~components/controls/DownloadButton'

import { useOnGetAggregatesCsv } from './useOnGetAggregatesCsv'

export function useOnGetAggregatesDownloadInfo(
	aggregatesDelimiter = ',',
	combinationDelimiter = ';',
	type = 'text/csv',
	alias = 'sensitive_aggregates.csv',
): () => Promise<DownloadInfo | undefined> {
	const getAggregatesCsv = useOnGetAggregatesCsv(
		aggregatesDelimiter,
		combinationDelimiter,
	)

	return useCallback(async () => {
		const aggregatesData = await getAggregatesCsv()
		if (aggregatesData) {
			return {
				url: URL.createObjectURL(
					new Blob([aggregatesData], {
						type,
					}),
				),
				alias,
			}
		}
		return undefined
	}, [getAggregatesCsv, type, alias])
}
