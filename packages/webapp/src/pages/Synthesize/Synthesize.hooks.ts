/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { introspect } from '@data-wrangling-components/core'
import { useCallback, useMemo } from 'react'

import type { ICsvContent } from '~models'
import { useAllSynthesisInfo, useSdsManagerInstance } from '~states'
import { fromCsvData, tableHeaders } from '~utils'
import type { ISynthesisInfo } from '~workers/types'
import { IWasmSynthesizerWorkerStatus } from '~workers/types'

export function useAllFinishedSynthesisInfo(): ISynthesisInfo[] {
	const [allSynthesisInfo] = useAllSynthesisInfo()

	return useMemo(
		() =>
			allSynthesisInfo.filter(
				s => s.status === IWasmSynthesizerWorkerStatus.FINISHED,
			),
		[allSynthesisInfo],
	)
}

export function useGetSyntheticCsvContent(): (
	selectedSynthesis: ISynthesisInfo,
	joinMultiValueColumns: boolean,
) => Promise<ICsvContent> {
	const [manager] = useSdsManagerInstance()

	return useCallback(
		async (
			selectedSynthesis: ISynthesisInfo,
			joinMultiValueColumns: boolean,
		) => {
			const generateResult = await manager?.instance.getGenerateResult(
				selectedSynthesis.key,
				joinMultiValueColumns,
			)
			const delimiter = selectedSynthesis.parameters.csvDataParameters.delimiter
			const table = fromCsvData(generateResult?.syntheticData, delimiter)

			return {
				headers: tableHeaders(table),
				delimiter,
				table,
				metadata: introspect(table, true),
			}
		},
		[manager],
	)
}
