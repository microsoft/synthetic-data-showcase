/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import type { CSSProperties, FC } from 'react'
import React, { memo, useMemo } from 'react'

import { useFlexItemStyles } from './FlexItem.hooks.js'
import type { FlexItemProps } from './FlexItem.types.js'

export const FlexItem: FC<FlexItemProps> = memo(function FlexItem(props) {
	const { as, children, className } = props
	const inlineStyles: CSSProperties = useFlexItemStyles(props)
	const Element = useMemo(() => as ?? 'div', [as])

	return (
		<Element className={className} style={inlineStyles}>
			{children}
		</Element>
	)
})
FlexItem.displayName = 'FlexItem'
