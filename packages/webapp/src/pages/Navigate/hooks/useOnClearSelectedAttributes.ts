/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { useCallback } from 'react'
import type { ISelectedAttributesByColumn } from 'sds-wasm'

export function useOnClearSelectedAttributes(
	setNewSelectedAttributesByColumn: (
		value: ISelectedAttributesByColumn,
	) => void,
): () => void {
	return useCallback(() => {
		setNewSelectedAttributesByColumn({})
	}, [setNewSelectedAttributesByColumn])
}
