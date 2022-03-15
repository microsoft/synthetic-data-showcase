/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { useCallback } from 'react'
import type { SetterOrUpdater } from 'recoil'

import type { ICsvContent } from '~models'

export function useOnUseColumnCheckToggle(
	setter: SetterOrUpdater<ICsvContent>,
): (index: number) => void {
	return useCallback(
		index => {
			setter(previous => ({
				...previous,
				headers: [
					...previous.headers.slice(0, index),
					{
						...previous.headers[index],
						use: !previous.headers[index].use,
					},
					...previous.headers.slice(index + 1),
				],
			}))
		},
		[setter],
	)
}
