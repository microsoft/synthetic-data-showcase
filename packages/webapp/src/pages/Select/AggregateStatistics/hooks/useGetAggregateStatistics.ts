/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import type { Remote } from 'comlink'
import { useCallback } from 'react'
import type { IAggregateStatistics } from 'sds-wasm'

import type { ICsvContent } from '~models'
import { useSdsManagerInstance } from '~states'
import { usableHeaders } from '~utils'
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
