/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { MutableRefObject, useCallback } from 'react'
import { ISelectedAttributesByColumn } from 'sds-wasm'
import { SdsWasmWorker } from '~workers/sds-wasm'

export function useOnNewSelectedAttributesByColumn(
	setIsLoading: (value: boolean) => void,
	isMounted: MutableRefObject<boolean>,
	setSelectedAttributesByColumn: (value: ISelectedAttributesByColumn) => void,
	worker: SdsWasmWorker | null,
): (
	newSelectedAttributesByColumn: ISelectedAttributesByColumn,
) => Promise<void> {
	return useCallback(
		async (newSelectedAttributesByColumn: ISelectedAttributesByColumn) => {
			if (worker) {
				setIsLoading(true)
				const result = await worker.selectAttributes(
					newSelectedAttributesByColumn,
				)

				if (isMounted.current && result) {
					setSelectedAttributesByColumn(newSelectedAttributesByColumn)
					setIsLoading(false)
				}
			}
		},
		[worker, setIsLoading, isMounted, setSelectedAttributesByColumn],
	)
}
