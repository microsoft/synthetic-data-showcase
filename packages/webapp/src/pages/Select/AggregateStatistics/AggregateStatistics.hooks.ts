/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import type { Remote } from 'comlink'
import { useCallback, useMemo } from 'react'
import type { IAggregateStatistics, IRecordsCountByColumn } from 'sds-wasm'

import type { ICsvContent } from '~models'
import { useSdsManagerInstance, useSensitiveContent } from '~states'
import { usableHeaders, usableMultiValueColumns } from '~utils'
import type { ICancelablePromise } from '~workers/types'

export function useGetAggregateStatistics(): (
	sensitiveContent: ICsvContent,
	recordLimit: number,
	reportingLength: number,
	resolution: number,
) => Promise<Remote<ICancelablePromise<IAggregateStatistics>> | undefined> {
	const [managerInstance] = useSdsManagerInstance()

	return useCallback(
		async (
			sensitiveContent: ICsvContent,
			recordLimit: number,
			reportingLength: number,
			resolution: number,
		) => {
			if (managerInstance) {
				const headers = usableHeaders(sensitiveContent).map(h => h.name)

				if (headers.length > 0) {
					const instance = await managerInstance.instance

					return await instance.generateAggregateStatistics(
						sensitiveContent.table.toCSV({
							delimiter: sensitiveContent.delimiter,
						}),
						{
							delimiter: sensitiveContent.delimiter,
							useColumns: headers,
							sensitiveZeros: sensitiveContent.headers
								.filter(h => h.hasSensitiveZeros)
								.map(h => h.name),
							recordLimit,
							multiValueColumns: usableMultiValueColumns(sensitiveContent),
						},
						reportingLength,
						resolution,
					)
				}
				return undefined
			}
		},
		[managerInstance],
	)
}

function calcPercentages(
	total: number | undefined,
	counts: IRecordsCountByColumn | undefined,
) {
	const ret = {}

	if (!counts || !total || total === 0) {
		return ret
	}

	for (const column of Object.keys(counts)) {
		ret[column] = (counts[column] * 100.0) / total
	}

	return ret
}

export function useColumnsWithUniqueCombinationsPercentage(
	statistics: IAggregateStatistics | null,
): IRecordsCountByColumn {
	return useMemo(() => {
		return calcPercentages(
			statistics?.numberOfRecordsWithUniqueCombinations,
			statistics?.numberOfRecordsWithUniqueCombinationsPerColumn,
		)
	}, [statistics])
}

export function useColumnsWithRareCombinationsPercentage(
	statistics: IAggregateStatistics | null,
): IRecordsCountByColumn {
	return useMemo(() => {
		return calcPercentages(
			statistics?.numberOfRecordsWithRareCombinations,
			statistics?.numberOfRecordsWithRareCombinationsPerColumn,
		)
	}, [statistics])
}

export function useOnRemoveColumn(): (column: string) => void {
	const [sensitiveContent, setSensitiveContent] = useSensitiveContent()

	return useCallback(
		column => {
			const index = sensitiveContent.headers.findIndex(h => h.name === column)

			if (index >= 0) {
				setSensitiveContent(previous => ({
					...previous,
					headers: [
						...previous.headers.slice(0, index),
						{
							...previous.headers[index],
							use: !previous.headers[index].use,
						},
						...previous.headers.slice(index + 1),
					],
				}))
			}
		},
		[sensitiveContent, setSensitiveContent],
	)
}
