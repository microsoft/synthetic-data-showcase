/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import type { CSSProperties, FC } from 'react'
import React, { memo } from 'react'

import { useFlexContainerStyles } from './FlexContainer.hooks.js'
import type { FlexContainerProps } from './FlexContainer.types.js'

export const FlexContainer: FC<FlexContainerProps> = memo(
	function FlexContainer(props) {
		const { className, children } = props
		const inlineStyles: CSSProperties = useFlexContainerStyles(props)

		return (
			<div className={className} style={inlineStyles}>
				{children}
			</div>
		)
	},
)
FlexContainer.displayName = 'FlexContainer'
