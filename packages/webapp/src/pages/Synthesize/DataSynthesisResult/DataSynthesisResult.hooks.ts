/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import { introspect } from '@data-wrangling-components/core'
import type { MutableRefObject } from 'react'
import { useCallback } from 'react'
import type { IEvaluateResult } from 'sds-wasm'

import type { ICsvContent } from '~models'
import { useSdsManagerInstance } from '~states'
import { fromCsvData, tableHeaders } from '~utils'
import type { ISynthesisInfo } from '~workers/types'

export function useGetSyntheticCsvContent(): (
	selectedSynthesis: ISynthesisInfo,
) => Promise<ICsvContent> {
	const [manager] = useSdsManagerInstance()

	return useCallback(
		async (selectedSynthesis: ISynthesisInfo) => {
			const generateResult = await manager?.instance.getGenerateResult(
				selectedSynthesis.key,
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

export function useGetAndSetSyntheticCsvContent(
	setSyntheticCsvContent: (content: ICsvContent) => void,
	isMounted: MutableRefObject<boolean>,
): (selectedSynthesis: ISynthesisInfo) => Promise<void> {
	const getSyntheticCsvData = useGetSyntheticCsvContent()

	return useCallback(
		async (selectedSynthesis: ISynthesisInfo) => {
			const syntheticCsvData = await getSyntheticCsvData(selectedSynthesis)

			if (isMounted.current) {
				setSyntheticCsvContent(syntheticCsvData)
			}
		},
		[getSyntheticCsvData, setSyntheticCsvContent, isMounted],
	)
}

export function useGetAndSetEvaluateResult(
	setEvaluateResult: (evaluateResult: IEvaluateResult | null) => void,
	isMounted: MutableRefObject<boolean>,
): (selectedSynthesis: ISynthesisInfo) => Promise<void> {
	const [manager] = useSdsManagerInstance()

	return useCallback(
		async (selectedSynthesis: ISynthesisInfo) => {
			const evaluateResult =
				(await manager?.instance.getEvaluateResult(selectedSynthesis.key)) ??
				null

			if (isMounted.current) {
				setEvaluateResult(evaluateResult)
			}
		},
		[manager, setEvaluateResult, isMounted],
	)
}
