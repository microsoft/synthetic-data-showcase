/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import type { MutableRefObject } from 'react'
import { useCallback } from 'react'
import type { ISelectedAttributesByColumn } from 'sds-wasm'

import type { SdsWasmWorker } from '../../../../workers/sds-wasm'

export function useOnNewSelectedAttributesByColumn(
	contextKey: string | undefined,
	setIsLoading: (value: boolean) => void,
	isMounted: MutableRefObject<boolean>,
	setSelectedAttributesByColumn: (value: ISelectedAttributesByColumn) => void,
	worker: SdsWasmWorker | null,
): (
	newSelectedAttributesByColumn: ISelectedAttributesByColumn,
) => Promise<void> {
	return useCallback(
		async (newSelectedAttributesByColumn: ISelectedAttributesByColumn) => {
			if (worker && contextKey) {
				setIsLoading(true)
				const result = await worker.selectAttributes(
					contextKey,
					newSelectedAttributesByColumn,
				)

				if (isMounted.current && result) {
					setSelectedAttributesByColumn(newSelectedAttributesByColumn)
					setIsLoading(false)
				}
			}
		},
		[
			worker,
			setIsLoading,
			isMounted,
			setSelectedAttributesByColumn,
			contextKey,
		],
	)
}
