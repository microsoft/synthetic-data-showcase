/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import type { MutableRefObject } from 'react'
import { useCallback } from 'react'

import type { SdsWasmWorker } from '~workers/sds-wasm'

export function useOnRunNavigate(
	setIsLoading: (value: boolean) => void,
	isMounted: MutableRefObject<boolean>,
	setSelectedHeaders: (value: boolean[]) => void,
	initiallySelectedHeaders: boolean[],
	worker: SdsWasmWorker | null,
): () => void {
	return useCallback(() => {
		if (worker) {
			setIsLoading(true)
			worker.navigate().then(result => {
				if (isMounted.current && result) {
					setSelectedHeaders(initiallySelectedHeaders)
					setIsLoading(false)
				}
			})
		}
	}, [
		setIsLoading,
		worker,
		isMounted,
		setSelectedHeaders,
		initiallySelectedHeaders,
	])
}
