/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { useCallback } from 'react'

/**
 * onChange handler that only fires if the input is a valid number
 * @param setter
 * @returns
 */
export function useSpinButtonOnChange(
	setter: (val: number) => void,
): (event: React.SyntheticEvent<HTMLElement>, newValue?: string) => void {
	return useCallback(
		(event, newValue?) => {
			const val = +(newValue || 0)
			if (!isNaN(val)) {
				setter(val)
			}
		},
		[setter],
	)
}
