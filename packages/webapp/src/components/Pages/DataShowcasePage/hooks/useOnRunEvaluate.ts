/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { useCallback } from 'react'
import type { SetterOrUpdater } from 'recoil'
import type { IEvaluateResult } from 'sds-wasm'

import {
	useClearEvaluate,
	useIsProcessingSetter,
	useProcessingProgressSetter,
	useWasmWorkerValue,
} from '~states'

export function useOnRunEvaluate(
	setEvaluateResult: SetterOrUpdater<IEvaluateResult | null>,
	reportingLength: number,
): () => Promise<void> {
	const setIsProcessing = useIsProcessingSetter()
	const setProcessingProgress = useProcessingProgressSetter()
	const clearEvaluate = useClearEvaluate()
	const worker = useWasmWorkerValue()

	return useCallback(async () => {
		setIsProcessing(true)
		await clearEvaluate()
		setProcessingProgress(0.0)

		const response = await worker?.evaluate(
			reportingLength,
			p => {
				setProcessingProgress(p)
			},
		)

		setIsProcessing(false)
		if (response) {
			setEvaluateResult(response)
		}
	}, [
		worker,
		setIsProcessing,
		reportingLength,
		clearEvaluate,
		setEvaluateResult,
		setProcessingProgress,
	])
}
