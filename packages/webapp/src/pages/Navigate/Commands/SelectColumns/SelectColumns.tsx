/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { Callout, Checkbox, DirectionalHint } from '@fluentui/react'
import { useBoolean, useId } from '@fluentui/react-hooks'
import { FlexContainer } from '@sds/components'
import type { FC } from 'react'
import { memo, useCallback, useMemo } from 'react'
import styled from 'styled-components'

import { useAvailableHeaders, useSelectedHeaders } from '~states'

import { useOnToggleSelectedHeader } from '../../hooks/index.js'

export const SelectColumns: FC = memo(function SelectColumns() {
	const [isCalloutVisible, { toggle: toggleIsCalloutVisible }] =
		useBoolean(false)
	const actionId = useId('select-columns-id')

	const headers = useAvailableHeaders()
	const [selectedHeaders, setSelectedHeaders] = useSelectedHeaders()
	const onToggleSelectedHeader = useOnToggleSelectedHeader(
		selectedHeaders,
		setSelectedHeaders,
	)

	const setAllOptions = useCallback(
		(set: boolean) => {
			const newHeaders = headers.map(() => set)

			setSelectedHeaders(newHeaders)
		},
		[headers, setSelectedHeaders],
	)

	const list = useMemo(() => {
		return headers.map((header, index) => {
			return (
				<StyledCheckbox
					key={header}
					label={header}
					checked={selectedHeaders[index] ?? false}
					onChange={() => onToggleSelectedHeader(index)}
				/>
			)
		})
	}, [headers, selectedHeaders, onToggleSelectedHeader])

	return (
		<>
			<Action id={actionId} onClick={toggleIsCalloutVisible}>
				Select Columns
			</Action>
			{isCalloutVisible && (
				<Callout
					role="dialog"
					gapSpace={0}
					isBeakVisible={false}
					directionalHint={DirectionalHint.bottomCenter}
					target={`#${actionId}`}
					onDismiss={toggleIsCalloutVisible}
					setInitialFocus
				>
					<Container vertical>
						<GroupActions justify="space-around" align="center">
							<GroupAction onClick={() => setAllOptions(true)}>All</GroupAction>
							<Divider>|</Divider>
							<GroupAction onClick={() => setAllOptions(false)}>
								None
							</GroupAction>
						</GroupActions>
						<ListContainer vertical>
							<div>{list}</div>
						</ListContainer>
					</Container>
				</Callout>
			)}
		</>
	)
})
SelectColumns.displayName = 'SelectNavigateColumns'

const Action = styled.span`
	font-size: ${p => p.theme.fonts.mediumPlus.fontSize};
	/* font-weight: bold; */
	letter-spacing: 1.2px;
	padding: ${p => p.theme.spacing.m};
	color: ${p => p.theme.palette.themePrimary};
	&:hover {
		cursor: pointer;
	}
`

const Container = styled(FlexContainer)`
	min-width: 250px;
	max-height: 400px;
	border: 1px solid ${p => p.theme.palette.neutralLight};
	/* background: ${p => p.theme.palette.neutralQuaternary}; */
	overflow-y: auto;
	&::-webkit-scrollbar {
		display: none;
	}
`

const GroupActions = styled(FlexContainer)`
	padding: ${p => p.theme.spacing.s1};
	border-bottom: 1px solid ${p => p.theme.palette.neutralLight};
	box-shadow: ${p => p.theme.effects.elevation4};
`

const GroupAction = styled.span`
	color: ${p => p.theme.palette.themePrimary};
	font-size: ${p => p.theme.fonts.medium.fontSize};
	font-weight: bold;
	&:hover {
		cursor: pointer;
	}
`

const Divider = styled.span`
	font-size: ${p => p.theme.fonts.smallPlus.fontSize};
	color: ${p => p.theme.palette.neutralTertiary};
`

const ListContainer = styled(FlexContainer)`
	overflow-y: auto;
	padding: ${p => p.theme.spacing.s1};
	direction: rtl;
	& > div {
		direction: ltr;
	}
	&::-webkit-scrollbar {
		width: 4px;
		background: ${p => p.theme.palette.neutralLight};
	}
	&::-webkit-scrollbar-thumb {
		background-color: ${p => p.theme.palette.themePrimary};
		border-radius: 20px;
	}
`

const StyledCheckbox = styled(Checkbox)`
	padding: ${p => p.theme.spacing.s2};
`
