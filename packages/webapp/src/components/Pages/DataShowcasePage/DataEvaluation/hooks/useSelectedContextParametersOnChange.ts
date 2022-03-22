/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import { useCallback } from 'react'
import type { IEvaluateResult } from 'sds-wasm'

import type { IContextParameters } from '~models'
import { useWasmWorkerValue } from '~states'

export function useSelectedContextParametersOnChange(
	selectedContextParameters: IContextParameters | undefined,
	setEvaluateResult: (evaluateResult: IEvaluateResult | undefined) => void
): () => Promise<void> {
	const worker = useWasmWorkerValue()

	return useCallback(async () => {
		if (selectedContextParameters?.isEvaluated && worker) {
			setEvaluateResult(await worker.getEvaluateResult(selectedContextParameters.key))
		} else {
			setEvaluateResult(undefined)
		}
	}, [worker, selectedContextParameters, setEvaluateResult])
}