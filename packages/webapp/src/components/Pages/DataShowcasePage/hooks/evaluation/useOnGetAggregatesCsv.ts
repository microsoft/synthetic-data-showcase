/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { useCallback } from 'react'
import { useWasmWorkerValue } from '~states'

export function useOnGetAggregatesCsv(
	aggregatesDelimiter = ',',
	combinationDelimiter = ';',
): () => Promise<string | undefined> {
	const worker = useWasmWorkerValue()

	return useCallback(async () => {
		const result = await worker?.getSensitiveAggregateResult(
			aggregatesDelimiter,
			combinationDelimiter,
			true,
		)
		return result?.aggregatesData
	}, [worker, aggregatesDelimiter, combinationDelimiter])
}
