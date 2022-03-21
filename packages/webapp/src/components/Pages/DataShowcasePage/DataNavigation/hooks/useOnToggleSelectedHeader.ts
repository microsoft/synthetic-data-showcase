/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { useCallback } from 'react'

export function useOnToggleSelectedHeader(
	selectedHeaders: boolean[],
	setSelectedHeaders: (value: boolean[]) => void,
): (index: number) => Promise<void> {
	return useCallback(
		async index => {
			const newSelectedHeaders = [...selectedHeaders]
			newSelectedHeaders[index] = !newSelectedHeaders[index]
			await setSelectedHeaders(newSelectedHeaders)
		},
		[setSelectedHeaders, selectedHeaders],
	)
}
