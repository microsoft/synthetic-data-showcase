/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { useCallback } from 'react'

import type { IContextParameters } from '~models'
import {
	useAllContextsParametersSetter,
	useIsProcessingSetter,
	useProcessingProgressSetter,
	useSelectedContextParametersSetter,
	useWasmWorkerValue,
} from '~states'

export function useOnRunEvaluate(
	reportingLength: number,
	selectedContextParameters: IContextParameters | undefined,
): () => Promise<void> {
	const setIsProcessing = useIsProcessingSetter()
	const setProcessingProgress = useProcessingProgressSetter()
	const worker = useWasmWorkerValue()
	const setAllContextsParameters = useAllContextsParametersSetter()
	const setSelectedContext = useSelectedContextParametersSetter()

	return useCallback(async () => {
		setIsProcessing(true)

		if (selectedContextParameters) {
			setProcessingProgress(0.0)

			const response = await worker?.evaluate(
				selectedContextParameters.key,
				reportingLength,
				p => {
					setProcessingProgress(p)
				},
			)
			if (response) {
				setAllContextsParameters(response)
				setSelectedContext(response.find(c => c.key === selectedContextParameters.key))
			}
		}

		setIsProcessing(false)
	}, [
		setIsProcessing,
		selectedContextParameters,
		setProcessingProgress,
		worker,
		reportingLength,
		setAllContextsParameters,
		setSelectedContext
	])
}
