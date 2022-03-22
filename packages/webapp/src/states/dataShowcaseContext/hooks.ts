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

export function useClearSensitiveData(): DataClearer {
	const resetSensitiveContent = useResetSensitiveContent()

	return useCallback(async () => {
		resetSensitiveContent()
	}, [resetSensitiveContent])
}

export function useClearContexts(): DataClearer {
	const worker = useWasmWorkerValue()
	const resetAllContextParameters = useResetAllContextsParameters()
	const resetSelectedContextParameters = useResetSelectedContextParameters()

	return useCallback(async () => {
		await worker?.clearContexts()
		resetAllContextParameters()
		resetSelectedContextParameters()
	}, [worker, resetAllContextParameters, resetSelectedContextParameters])
}
