/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { useCallback, useMemo } from 'react'
import { HeaderNames } from 'sds-wasm'
import { defaultCsvContent } from '~models'
import {
	useEvaluateResultSetter,
	useSensitiveContentSetter,
	useSyntheticContentSetter,
	useSyntheticContentValue,
	useWasmWorkerValue,
} from '~states'

export function useClearSensitiveData(): () => Promise<void> {
	const worker = useWasmWorkerValue()
	const setSensitiveContent = useSensitiveContentSetter()
	const clearGenerate = useClearGenerate()

	return useCallback(async () => {
		await worker?.clearSensitiveData()
		setSensitiveContent(defaultCsvContent)
		await clearGenerate()
	}, [worker, setSensitiveContent, clearGenerate])
}

export function useClearGenerate(): () => Promise<void> {
	const worker = useWasmWorkerValue()
	const setSyntheticContent = useSyntheticContentSetter()
	const clearEvaluate = useClearEvaluate()

	return useCallback(async () => {
		await worker?.clearGenerate()
		setSyntheticContent(defaultCsvContent)
		await clearEvaluate()
	}, [worker, setSyntheticContent, clearEvaluate])
}

export function useClearEvaluate(): () => Promise<void> {
	const worker = useWasmWorkerValue()
	const setEvaluateResult = useEvaluateResultSetter()
	const clearNavigate = useClearNavigate()

	return useCallback(async () => {
		await worker?.clearEvaluate()
		setEvaluateResult(null)
		await clearNavigate()
	}, [worker, setEvaluateResult, clearNavigate])
}

export function useClearNavigate(): () => Promise<void> {
	const worker = useWasmWorkerValue()

	return useCallback(async () => {
		await worker?.clearNavigate()
	}, [worker])
}

export function useSyntheticHeaders(): HeaderNames {
	const syntheticContent = useSyntheticContentValue()

	return useMemo(
		() => syntheticContent.headers.map(h => h.name),
		[syntheticContent.headers],
	)
}
