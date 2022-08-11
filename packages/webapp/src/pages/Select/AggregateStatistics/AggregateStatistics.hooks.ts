/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import type {
	IAggregateStatistics,
	IRecordsCountByStringKey,
} from '@essex/sds-core'
import type { Remote } from 'comlink'
import { useCallback, useMemo } from 'react'

import type { ICsvContent } from '~models'
import { useSdsManagerInstance, useSensitiveContent } from '~states'
import { usableHeaders, usableMultiValueColumns } from '~utils'
import type { ICancelablePromise } from '~workers/types'

export function useGetAggregateStatistics(): (
	sensitiveContent: ICsvContent,
	recordLimit: number,
	reportingLength: number,
	resolution: number,
) => Promise<
	Remote<ICancelablePromise<IAggregateStatistics | null>> | undefined
> {
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
				const instance = await managerInstance.instance

				return instance.generateAggregateStatistics(
					sensitiveContent.table.toCSV({
						delimiter: sensitiveContent.delimiter,
					}),
					{
						delimiter: sensitiveContent.delimiter,
						subjectId: sensitiveContent.subjectId,
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
		},
		[managerInstance],
	)
}

function calcPercentages(
	total: number | undefined,
	counts: IRecordsCountByStringKey | undefined,
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

export function useColumnsWithRareCombinationsPercentage(
	statistics: IAggregateStatistics | null,
): IRecordsCountByStringKey {
	return useMemo(() => {
		return calcPercentages(
			statistics?.numberOfRecordsWithRareCombinations,
			statistics?.numberOfRecordsWithRareCombinationsPerColumn,
		)
	}, [statistics])
}

export function useAttributesWithRareCombinationsPercentage(
	statistics: IAggregateStatistics | null,
): IRecordsCountByStringKey {
	return useMemo(() => {
		return calcPercentages(
			statistics?.numberOfRecordsWithRareCombinations,
			statistics?.numberOfRecordsWithRareCombinationsPerAttribute,
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
