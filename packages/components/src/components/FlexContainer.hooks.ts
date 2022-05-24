/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import type { CSSProperties } from 'react'
import { useMemo } from 'react'

import type { FlexContainerProps } from './FlexContainer.types.js'

export function useFlexContainerStyles({
	vertical = false,
	wrap = false,
	justify = 'flex-start',
	align = 'stretch',
	gap = '',
	style = {},
}: FlexContainerProps): CSSProperties {
	return useMemo(
		() => ({
			display: 'flex',
			flexDirection: vertical ? 'column' : 'row',
			justifyContent: justify,
			alignItems: align,
			flexWrap: wrap ? 'wrap' : 'nowrap',
			...(gap !== '' ? { gap } : {}),
			...style,
		}),
		[vertical, justify, align, wrap, gap, style],
	)
}
