/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import type { CSSProperties } from 'react'
import { useMemo } from 'react'

import type { FlexItemProps } from './FlexItem.types.js'

export function useFlexItemStyles({
	order = 0,
	grow = 0,
	shrink = 1,
	basis,
	align,
	style = {},
}: FlexItemProps): CSSProperties {
	const flexBasis = useMemo(() => {
		return basis ?? (grow > 0 ? '0%' : 'auto')
	}, [basis, grow])

	return useMemo(
		() => ({
			order,
			flexGrow: grow,
			flexShrink: shrink,
			flexBasis,
			...(align != null ? { alignSelf: align } : {}),
			...style,
		}),
		[order, grow, shrink, flexBasis, align, style],
	)
}
