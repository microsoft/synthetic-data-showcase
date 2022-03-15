/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { useCallback, useMemo } from 'react'
import type { HeaderNames } from 'sds-wasm'

import {
	useResetEvaluateResult,
	useResetSensitiveContent,
	useResetSyntheticContent,
	useSyntheticContentValue,
	useWasmWorkerValue,
} from '~states'
import { headers } from '~utils/arquero'

export type DataClearer = () => Promise<void>

export function useClearSensitiveData(): DataClearer {
	const worker = useWasmWorkerValue()
	const resetSensitiveContent = useResetSensitiveContent()
	const clearGenerate = useClearGenerate()

	return useCallback(async () => {
		await worker?.clearSensitiveData()
		resetSensitiveContent()
		await clearGenerate()
	}, [worker, resetSensitiveContent, clearGenerate])
}

export function useClearGenerate(): DataClearer {
	const worker = useWasmWorkerValue()
	const resetSyntheticContent = useResetSyntheticContent()
	const clearEvaluate = useClearEvaluate()

	return useCallback(async () => {
		await worker?.clearGenerate()
		resetSyntheticContent()
		await clearEvaluate()
	}, [worker, resetSyntheticContent, clearEvaluate])
}

export function useClearEvaluate(): DataClearer {
	const worker = useWasmWorkerValue()
	const resetEvaluateResult = useResetEvaluateResult()
	const clearNavigate = useClearNavigate()

	return useCallback(async () => {
		await worker?.clearEvaluate()
		resetEvaluateResult()
		await clearNavigate()
	}, [worker, resetEvaluateResult, clearNavigate])
}

export function useClearNavigate(): DataClearer {
	const worker = useWasmWorkerValue()

	return useCallback(async () => {
		await worker?.clearNavigate()
	}, [worker])
}

export function useSyntheticHeaders(): HeaderNames {
	const syntheticContent = useSyntheticContentValue()

	return useMemo(() => headers(syntheticContent), [syntheticContent])
}
