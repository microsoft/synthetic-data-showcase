/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import type { IIconProps } from '@fluentui/react'
import { CommandButton, Icon } from '@fluentui/react'
import { memo } from 'react'
import type { HeaderNames, ISelectedAttributesByColumn } from 'sds-wasm'
import styled from 'styled-components'

import type {
	ClearSelectedAttributesCallback,
	SetSelectedAttributesCallback,
} from '~pages/Navigate/DataNavigation'

import { useSelectedAttributesByColumnEntries } from './hooks.js'

const deleteIcon: IIconProps = { iconName: 'Delete' }

export interface SelectedAttributesProps {
	headers: HeaderNames
	selectedAttributesByColumn: ISelectedAttributesByColumn
	onSetSelectedAttributes: SetSelectedAttributesCallback
	onClearSelectedAttributes: ClearSelectedAttributesCallback
}

export const SelectedAttributes: React.FC<SelectedAttributesProps> = memo(
	function SelectedAttributes({
		headers,
		selectedAttributesByColumn,
		onSetSelectedAttributes,
		onClearSelectedAttributes,
	}: SelectedAttributesProps) {
		const selectedEntries = useSelectedAttributesByColumnEntries(
			selectedAttributesByColumn,
		)

		return (
			<>
				{selectedEntries.flatMap(entry => {
					return Array.from(entry[1].keys())
						.sort()
						.map(value => {
							return (
								<>
									<Divider>|</Divider>
									<StyledCommandButton
										key={`${entry[0]}:${value}`}
										iconProps={deleteIcon}
										text={`${headers[entry[0]]}:${value}`}
										onClick={async () =>
											await onSetSelectedAttributes(+entry[0], undefined)
										}
									/>
								</>
							)
						})
				})}
				{selectedEntries.length > 0 && (
					<StyledIcon
						iconName="ChromeClose"
						onClick={onClearSelectedAttributes}
					></StyledIcon>
				)}
			</>
		)
	},
)

const StyledCommandButton = styled(CommandButton)``

const StyledIcon = styled(Icon)`
	color: ${p => p.theme.palette.themePrimary};
	font-size: ${p => p.theme.fonts.mediumPlus.fontSize};
	padding: ${p => `${p.theme.spacing.s1}`};
	margin: ${p => `0 ${p.theme.spacing.m}`};
	background: ${p => p.theme.palette.neutralLight};
	border-radius: ${p => p.theme.effects.roundedCorner4};
	&:hover {
		cursor: pointer;
	}
`

const Divider = styled.span`
	font-size: ${p => p.theme.fonts.smallPlus.fontSize};
	color: ${p => p.theme.palette.neutralTertiary};
`
