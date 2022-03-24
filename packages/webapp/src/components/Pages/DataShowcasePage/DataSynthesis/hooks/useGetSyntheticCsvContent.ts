/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import { introspect } from '@data-wrangling-components/core'
import { useCallback } from 'react'

import type { IContextParameters,ICsvContent } from '~models'
import { defaultCsvContent } from '~models'
import { useWasmWorkerValue } from '~states'
import { fromCsvData, tableHeaders } from '~utils'

export type GetSyntheticCsvContentCallback = (contextParameters: IContextParameters) => Promise<ICsvContent>

export function useGetSyntheticCsvContent(): GetSyntheticCsvContentCallback {
	const worker = useWasmWorkerValue()

	return useCallback(
		async (contextParameters: IContextParameters) => {
			if (worker && contextParameters.key) {
				const generateResult = await worker.getGenerateResult(
					contextParameters.key,
				)
				const table = fromCsvData(
					generateResult?.syntheticData,
					contextParameters.delimiter,
				)
				return {
					headers: tableHeaders(table),
					delimiter: contextParameters.delimiter,
					table,
					contextParameters,
					metadata: introspect(table, true),
				}
			}
			return defaultCsvContent
		},
		[worker],
	)
}
