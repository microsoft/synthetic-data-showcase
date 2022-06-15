/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import type {
	IAttributesIntersection,
	ISelectedAttributesByColumn,
} from '@essex/sds-core'
import { useCallback } from 'react'

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
			await setNewSelectedAttributesByColumn({
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
