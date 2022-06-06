/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { useCallback, useMemo } from 'react'
import type { SetterOrUpdater } from 'recoil'

import type { ICsvContent } from '~models'

export function useColumnsWithZeros(
	content: ICsvContent,
): string[] | undefined {
	return useMemo(
		() =>
			content.columnsWithZeros
				?.map(i => content.headers[i])
				.filter(h => h.use)
				.map(h => h.name),
		[content],
	)
}

export function useOnSensitiveZeroCheckToggle(
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
						hasSensitiveZeros: !previous.headers[index].hasSensitiveZeros,
					},
					...previous.headers.slice(index + 1),
				],
			}))
		},
		[setter],
	)
}
