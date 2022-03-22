/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { useCallback } from 'react'

import {
	useResetAllContextsParameters,
	useResetSelectedContextParameters,
	useResetSensitiveContent,
	useWasmWorkerValue,
} from '~states'

export type DataClearer = () => Promise<void>
export type DataClearerByKey = (contextKey: string) => Promise<void>

export function useClearSensitiveData(): DataClearer {
	const worker = useWasmWorkerValue()
	const resetSensitiveContent = useResetSensitiveContent()
	const resetAllContextParameters = useResetAllContextsParameters()
	const resetSelectedContextParameters = useResetSelectedContextParameters()

	return useCallback(async () => {
		await worker?.clearContexts()
		resetSensitiveContent()
		resetAllContextParameters()
		resetSelectedContextParameters()
	}, [
		worker,
		resetSensitiveContent,
		resetAllContextParameters,
		resetSelectedContextParameters,
	])
}