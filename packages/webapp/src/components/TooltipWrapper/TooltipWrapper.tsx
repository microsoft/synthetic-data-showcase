/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { Label, Stack } from '@fluentui/react'
import { memo } from 'react'
import { InfoTooltip } from '~components/InfoTooltip'

export interface TooltipWrapperProps {
	label?: string
	tooltip?: JSX.Element
	children?: JSX.Element
}

export const TooltipWrapper: React.FC<TooltipWrapperProps> = memo(
	function SpinButtonWithTooltip({
		label,
		tooltip,
		children,
	}: TooltipWrapperProps) {
		return (
			<Stack>
				<Stack horizontal>
					{label && <Label>{label}</Label>}
					{tooltip && <InfoTooltip>{tooltip}</InfoTooltip>}
				</Stack>
				{children}
			</Stack>
		)
	},
)
