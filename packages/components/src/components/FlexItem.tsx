/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import type { CSSProperties, FC } from 'react'
import React, { memo } from 'react'

import { useFlexItemStyles } from './FlexItem.hooks.js'
import type { FlexItemProps } from './FlexItem.types.js'

export const FlexItem: FC<FlexItemProps> = memo(function FlexItem(props) {
	const { children, className } = props
	const inlineStyles: CSSProperties = useFlexItemStyles(props)

	return (
		<div className={className} style={inlineStyles}>
			{children}
		</div>
	)
})
FlexItem.displayName = 'FlexItem'
