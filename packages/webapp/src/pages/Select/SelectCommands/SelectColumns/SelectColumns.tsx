/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { Callout, Checkbox, DirectionalHint } from '@fluentui/react'
import { useBoolean, useId } from '@fluentui/react-hooks'
import type { FC } from 'react'
import { memo, useCallback, useMemo } from 'react'
import styled from 'styled-components'

import { Flex } from '~components/Flexbox'
import { useOnUseColumnCheckToggle } from '~pages/Select/DataSelect/hooks'
import { useSensitiveContent } from '~states'

export const SelectColumns: FC = memo(function SelectColumns() {
	const [isCalloutVisible, { toggle: toggleIsCalloutVisible }] =
		useBoolean(false)
	const actionId = useId('select-columns-id')
	const [sensitiveContent, setSensitiveContent] = useSensitiveContent()
	const columnCheckToggle = useOnUseColumnCheckToggle(setSensitiveContent)

	const setAllOptions = useCallback(
		(set: boolean) => {
			const newHeaders = sensitiveContent.headers.map(header => {
				return { ...header, use: set }
			})

			setSensitiveContent(previous => ({
				...previous,
				headers: newHeaders,
			}))
		},
		[sensitiveContent, setSensitiveContent],
	)

	const list = useMemo(() => {
		return sensitiveContent.headers.map((header, index) => {
			return (
				<StyledCheckbox
					key={header.fieldName}
					label={header.name}
					checked={header.use}
					onChange={() => columnCheckToggle(index)}
				/>
			)
		})
	}, [sensitiveContent, columnCheckToggle])

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
SelectColumns.displayName = 'SelectColumns'

const Action = styled.span`
	font-size: ${p => p.theme.fonts.mediumPlus.fontSize};
	/* font-weight: bold; */
	letter-spacing: 1.25px;
	padding: ${p => p.theme.spacing.m};
	color: ${p => p.theme.palette.themePrimary};
	&:hover {
		cursor: pointer;
	}
`

const Container = styled(Flex)`
	min-width: 250px;
	max-height: 400px;
	border: 1px solid ${p => p.theme.palette.neutralLight};
	/* background: ${p => p.theme.palette.neutralQuaternary}; */
	overflow-y: auto;
	&::-webkit-scrollbar {
		display: none;
	}
`

const GroupActions = styled(Flex)`
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

const ListContainer = styled(Flex)`
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
