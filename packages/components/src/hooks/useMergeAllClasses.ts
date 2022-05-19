/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import { mergeClasses } from '@griffel/react'
import { useMemo } from 'react'

export function useMergeAllClasses<T extends string>(
	classNamesBySlots1?: Partial<Record<string, string>>,
	classNamesBySlots2?: Partial<Record<string, string>>,
): Partial<Record<T, string>> {
	const classNames = useMemo(() => {
		const keys = [
			...new Set([
				...Object.keys(classNamesBySlots1 ?? {}),
				...Object.keys(classNamesBySlots2 ?? {}),
			]),
		]
		return keys.reduce<Record<string, string>>((acc, cur) => {
			acc[cur] = mergeClasses(
				classNamesBySlots1?.[cur],
				classNamesBySlots2?.[cur],
			)

			return acc
		}, {} as Record<string, string>)
	}, [classNamesBySlots1, classNamesBySlots2])

	return classNames
}
