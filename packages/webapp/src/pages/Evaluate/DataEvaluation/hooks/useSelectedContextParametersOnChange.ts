/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import type { MutableRefObject } from 'react'
import { useCallback } from 'react'
import type { IEvaluateResult } from 'sds-wasm'

import type { IContextParameters } from '../../../../models'
import { useWasmWorkerValue } from '../../../../states'

export function useSelectedContextParametersOnChange(
	selectedContextParameters: IContextParameters | undefined,
	setEvaluateResult: (evaluateResult: IEvaluateResult | undefined) => void,
	isMounted: MutableRefObject<boolean>,
): () => Promise<void> {
	const worker = useWasmWorkerValue()

	return useCallback(async () => {
		if (selectedContextParameters?.isEvaluated && worker) {
			const result = await worker.getEvaluateResult(
				selectedContextParameters.key,
			)

			if (isMounted.current) {
				setEvaluateResult(result)
			}
		} else {
			setEvaluateResult(undefined)
		}
	}, [worker, selectedContextParameters, setEvaluateResult, isMounted])
}
