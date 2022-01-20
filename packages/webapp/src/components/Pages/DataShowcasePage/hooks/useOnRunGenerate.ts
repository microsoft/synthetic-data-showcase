/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { introspect } from '@data-wrangling-components/core'
import { ChangeEvent, useCallback } from 'react'
import { SetterOrUpdater } from 'recoil'
import { ICsvContent } from '~models'
import {
	DataClearer,
	useProcessingProgressSetter,
	useSensitiveContentValue,
	useWasmWorkerValue,
} from '~states'
import { fromRows, rows, tableHeaders } from '~utils/arquero'

export function useOnRunGenerate(
	setIsProcessing: SetterOrUpdater<boolean>,
	setSyntheticContent: SetterOrUpdater<ICsvContent>,
	clearGenerate: DataClearer,
	resolution: number,
	recordLimit: number,
	cacheSize: number,
): () => Promise<void> {
	const worker = useWasmWorkerValue()
	const setProcessingProgress = useProcessingProgressSetter()
	const sensitiveContent = useSensitiveContentValue()

	return useCallback(async () => {
		setIsProcessing(true)
		await clearGenerate()
		setProcessingProgress(0.0)

		const response = await worker?.generate(
			rows(sensitiveContent.table, true),
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

		const table = fromRows(response, sensitiveContent.delimiter)

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
