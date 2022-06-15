/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import type { ISelectedAttributesByColumn } from '@essex/sds-core'
import { useCallback } from 'react'

export function useOnClearSelectedAttributes(
	setNewSelectedAttributesByColumn: (
		value: ISelectedAttributesByColumn,
	) => void,
): () => void {
	return useCallback(() => {
		setNewSelectedAttributesByColumn({})
	}, [setNewSelectedAttributesByColumn])
}
