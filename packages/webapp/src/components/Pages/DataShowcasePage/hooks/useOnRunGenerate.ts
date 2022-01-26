/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { introspect } from '@data-wrangling-components/core'
import { useCallback } from 'react'
import { SetterOrUpdater } from 'recoil'
import { ICsvContent } from '~models'
import {
	useClearGenerate,
	useIsProcessingSetter,
	useProcessingProgressSetter,
	useSensitiveContentValue,
	useWasmWorkerValue,
} from '~states'
import { fromCsvData, tableHeaders } from '~utils/arquero'

export function useOnRunGenerate(
	setSyntheticContent: SetterOrUpdater<ICsvContent>,
	resolution: number,
	recordLimit: number,
	cacheSize: number,
): () => Promise<void> {
	const setIsProcessing = useIsProcessingSetter()
	const worker = useWasmWorkerValue()
	const setProcessingProgress = useProcessingProgressSetter()
	const sensitiveContent = useSensitiveContentValue()
	const clearGenerate = useClearGenerate()

	return useCallback(async () => {
		setIsProcessing(true)
		await clearGenerate()
		setProcessingProgress(0.0)

		const response = await worker?.generate(
			sensitiveContent.table.toCSV({ delimiter: sensitiveContent.delimiter }),
			sensitiveContent.delimiter,
			sensitiveContent.headers.filter(h => h.use).map(h => h.name),
			sensitiveContent.headers
				.filter(h => h.hasSensitiveZeros)
				.map(h => h.name),
			recordLimit,
			resolution,
			cacheSize,
			p => {
				setProcessingProgress(p)
			},
		)

		const table = fromCsvData(response, sensitiveContent.delimiter)

		setIsProcessing(false)

		setSyntheticContent({
			headers: tableHeaders(table),
			delimiter: sensitiveContent.delimiter,
			table,
			metadata: introspect(table, true),
		})
	}, [
		worker,
		setIsProcessing,
		setSyntheticContent,
		clearGenerate,
		sensitiveContent,
		recordLimit,
		resolution,
		cacheSize,
		setProcessingProgress,
	])
}
