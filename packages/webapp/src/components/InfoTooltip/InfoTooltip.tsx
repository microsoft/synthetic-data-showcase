/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import type { IIconProps, ITooltipHostProps } from '@fluentui/react'
import { IconButton, TooltipHost } from '@fluentui/react'
import { memo, useCallback } from 'react'

export interface InfoTooltipProps {
	children?: JSX.Element
}

const infoIcon: IIconProps = { iconName: 'Info' }

export const InfoTooltip: React.FC<InfoTooltipProps & ITooltipHostProps> = memo(
	function InfoTooltip({ children, ...props }) {
		const renderChildren = useCallback(() => {
			return children ?? null
		}, [children])

		if (!props.tooltipProps) {
			props.tooltipProps = {
				onRenderContent: renderChildren,
			}
		}

		return (
			<TooltipHost {...props}>
				<IconButton iconProps={infoIcon} />
			</TooltipHost>
		)
	},
)
