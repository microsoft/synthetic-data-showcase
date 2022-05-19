/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import type { MutableRefObject } from 'react'
import { useCallback } from 'react'
import type { ISelectedAttributesByColumn } from 'sds-wasm'

import type { ISdsManagerInstance } from '~models'

export function useOnNewSelectedAttributesByColumn(
	contextKey: string | undefined,
	setIsLoading: (value: boolean) => void,
	isMounted: MutableRefObject<boolean>,
	setSelectedAttributesByColumn: (value: ISelectedAttributesByColumn) => void,
	manager: ISdsManagerInstance | null,
): (
	newSelectedAttributesByColumn: ISelectedAttributesByColumn,
) => Promise<void> {
	return useCallback(
		async (newSelectedAttributesByColumn: ISelectedAttributesByColumn) => {
			if (manager && contextKey) {
				try {
					await manager.instance.selectAttributes(
						contextKey,
						newSelectedAttributesByColumn,
					)

					if (isMounted.current) {
						setSelectedAttributesByColumn(newSelectedAttributesByColumn)
					}
				} catch {
					setIsLoading(false)
				}
			}
		},
		[
			manager,
			setIsLoading,
			isMounted,
			setSelectedAttributesByColumn,
			contextKey,
		],
	)
}
