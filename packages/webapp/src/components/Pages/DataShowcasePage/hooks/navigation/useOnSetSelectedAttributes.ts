/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { useCallback } from 'react'
import type {
	IAttributesIntersection,
	ISelectedAttributesByColumn,
} from 'sds-wasm'

export function useOnSetSelectedAttributes(
	setNewSelectedAttributesByColumn: (
		value: ISelectedAttributesByColumn,
	) => void,
	selectedAttributesByColumn: ISelectedAttributesByColumn,
): (
	headerIndex: number,
	item: IAttributesIntersection | undefined,
) => Promise<void> {
	return useCallback(
		async (headerIndex: number, item: IAttributesIntersection | undefined) => {
			setNewSelectedAttributesByColumn({
				...selectedAttributesByColumn,
				[headerIndex]:
					item !== undefined
						? new Set<string>([item.value])
						: new Set<string>(),
			})
		},
		[setNewSelectedAttributesByColumn, selectedAttributesByColumn],
	)
}
