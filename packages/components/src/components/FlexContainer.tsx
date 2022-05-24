/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import type { CSSProperties, FC } from 'react'
import React, { memo, useMemo } from 'react'

import { useFlexContainerStyles } from './FlexContainer.hooks.js'
import type { FlexContainerProps } from './FlexContainer.types.js'

export const FlexContainer: FC<FlexContainerProps> = memo(
	function FlexContainer(props) {
		const { className, as, children } = props
		const inlineStyles: CSSProperties = useFlexContainerStyles(props)
		const Element = useMemo(() => as ?? 'div', [as])

		return (
			<Element className={className} style={inlineStyles}>
				{children}
			</Element>
		)
	},
)
FlexContainer.displayName = 'FlexContainer'
