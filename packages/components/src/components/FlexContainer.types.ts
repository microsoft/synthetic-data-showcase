/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import type { CSSProperties, ElementType } from 'react'

export type FlexContainerProps = {
	as?: ElementType
	vertical?: boolean
	wrap?: boolean
	justify?:
		| 'flex-start'
		| 'flex-end'
		| 'center'
		| 'space-between'
		| 'space-around'
		| 'space-evenly'
	align?: 'stretch' | 'flex-start' | 'flex-end' | 'center' | 'baseline'
	gap?: string
	className?: string
	style?: CSSProperties
}
