/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import type { MutableRefObject } from 'react'
import { useCallback } from 'react'
import type { IEvaluateResult } from 'sds-wasm'

import type { IContextParameters, ICsvContent } from '~models'
import { useWasmWorkerValue } from '~states'

import type { GetSyntheticCsvContentCallback } from './useGetSyntheticCsvContent'

export function useSelectedContextParametersOnChange(
	selectedContextParameters: IContextParameters | undefined,
	getSyntheticCsvContent: GetSyntheticCsvContentCallback,
	setSyntheticContent: (content: ICsvContent) => void,
	setEvaluateResult: (evaluateResult: IEvaluateResult | undefined) => void,
	setIsLoading: (value: boolean) => void,
	isMounted: MutableRefObject<boolean>,
): () => Promise<void> {
	const worker = useWasmWorkerValue()

	return useCallback(async () => {
		setIsLoading(true)

		if (selectedContextParameters) {
			const syntheticResult = await getSyntheticCsvContent(
				selectedContextParameters,
			)

			if (isMounted.current) {
				setSyntheticContent(syntheticResult)
			}

			if (selectedContextParameters?.isEvaluated && worker) {
				const evaluateResult = await worker.getEvaluateResult(
					selectedContextParameters.key,
				)

				if (isMounted.current) {
					setEvaluateResult(evaluateResult)
				}
			} else {
				setEvaluateResult(undefined)
			}
		}

		if (isMounted.current) {
			setIsLoading(false)
		}
	}, [
		worker,
		selectedContextParameters,
		getSyntheticCsvContent,
		setSyntheticContent,
		setEvaluateResult,
		setIsLoading,
		isMounted,
	])
}
