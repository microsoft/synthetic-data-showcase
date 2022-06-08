/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import type { IIconProps } from '@fluentui/react'
import { CommandButton, Icon } from '@fluentui/react'
import { FlexContainer } from '@sds/components'
import _ from 'lodash'
import { memo, useMemo } from 'react'
import type {
	HeaderNames,
	IAttributesIntersection,
	ISelectedAttributesByColumn,
} from 'sds-wasm'
import styled from 'styled-components'

import { useSelectedAttributesByColumnEntries } from './hooks.js'

const deleteIcon: IIconProps = { iconName: 'Delete' }

export type SetSelectedAttributesCallback = (
	headerIndex: number,
	item: IAttributesIntersection | undefined,
) => Promise<void>

export type ClearSelectedAttributesCallback = () => void

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
		const isNotEmpty = useMemo(
			() =>
				_.some(
					selectedEntries,
					entry => Array.from(entry[1].keys()).length > 0,
				),
			[selectedEntries],
		)

		return (
			<>
				{selectedEntries.flatMap(entry => {
					return Array.from(entry[1].keys())
						.sort()
						.map(value => {
							return (
								<FlexContainer key={`${entry[0]}:${value}`} align="center">
									<Divider>|</Divider>
									<StyledCommandButton
										iconProps={deleteIcon}
										text={`${headers[entry[0]]}:${value}`}
										onClick={async () =>
											await onSetSelectedAttributes(+entry[0], undefined)
										}
									/>
								</FlexContainer>
							)
						})
				})}
				{isNotEmpty && (
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
