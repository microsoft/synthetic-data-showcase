/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { IconButton, useTheme } from '@fluentui/react'
import { FlexContainer } from '@sds/components'
import { memo, useState } from 'react'

import type { CollapsablePanelProps } from './CollapsablePanel.types'

export const CollapsablePanel: React.FC<CollapsablePanelProps> = memo(
	function CollapsablePanel({ header, children, defaultCollapsed }) {
		const theme = useTheme()
		const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed ?? false)

		return (
			<FlexContainer vertical gap={theme.spacing.s1}>
				<FlexContainer
					justify="space-between"
					align="center"
					style={{
						borderBottom: `1px solid ${theme.palette.neutralLighter}`,
					}}
				>
					{header}
					<IconButton
						iconProps={{
							iconName: isCollapsed ? 'ChevronUp' : 'ChevronDown',
						}}
						title={isCollapsed ? 'Hide' : 'Show'}
						onClick={() => setIsCollapsed(prev => !prev)}
					/>
				</FlexContainer>
				{isCollapsed && children}
			</FlexContainer>
		)
	},
)
