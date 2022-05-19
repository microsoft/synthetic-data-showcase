/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { Callout, Checkbox, DirectionalHint, Label } from '@fluentui/react'
import { useBoolean, useId } from '@fluentui/react-hooks'
import { FlexContainer } from '@sds/components'
import type { ChangeEvent, FC } from 'react'
import { memo, useCallback, useMemo, useState } from 'react'
import styled from 'styled-components'

import { useSensitiveContent } from '~states'

export const MultiValueColumns: FC = memo(function MultiValueColumns() {
	const [isCalloutVisible, { toggle: toggleIsCalloutVisible }] =
		useBoolean(false)
	const actionId = useId('multi-value-columns')
	const [defaultDelimiter, setDefaultDelimiter] = useState(';')
	const [sensitiveContent, setSensitiveContent] = useSensitiveContent()

	const updateDefaultDelimiter = useCallback(
		(event: ChangeEvent<HTMLInputElement>) => {
			setDefaultDelimiter(event.target.value ?? ';')
		},
		[setDefaultDelimiter],
	)

	const selectedStringColumns = useMemo(() => {
		return sensitiveContent.headers
			.filter(header => {
				return (
					header.name !== sensitiveContent.subjectId &&
					header.use &&
					sensitiveContent.metadata?.columns[header.name].type === 'string'
				)
			})
			.map(h => h.name)
	}, [sensitiveContent])

	const toggleCallout = useCallback(() => {
		if (!selectedStringColumns.length) return
		toggleIsCalloutVisible()
	}, [selectedStringColumns, toggleIsCalloutVisible])

	const actionClass = useMemo(() => {
		return selectedStringColumns.length ? '' : 'disabled'
	}, [selectedStringColumns])

	const handleDelimiterUpdate = useCallback(
		(index: number, delimter: string | null) => {
			setSensitiveContent(previous => ({
				...previous,
				headers: [
					...previous.headers.slice(0, index),
					{
						...previous.headers[index],
						spreadWithDelimiter: delimter,
					},
					...previous.headers.slice(index + 1),
				],
			}))
		},
		[setSensitiveContent],
	)

	const setAllOptions = useCallback(
		(set: boolean) => {
			const newHeaders = sensitiveContent.headers.map(header => {
				if (selectedStringColumns?.includes(header.name)) {
					return {
						...header,
						spreadWithDelimiter: set
							? header.spreadWithDelimiter ?? defaultDelimiter
							: null,
					}
				} else {
					return header
				}
			})
			setSensitiveContent(previous => ({
				...previous,
				headers: newHeaders,
			}))
		},
		[
			sensitiveContent,
			setSensitiveContent,
			defaultDelimiter,
			selectedStringColumns,
		],
	)

	const list = useMemo(() => {
		return sensitiveContent.headers.map((header, index) => {
			if (!header.use || !selectedStringColumns?.includes(header.name))
				return null
			return (
				<StyledListItem
					className={(index + 1) % 2 !== 0 ? 'odd' : ''}
					key={header.name}
					justify="space-between"
					align="center"
				>
					<StyledCheckbox
						label={header.name}
						checked={header.spreadWithDelimiter !== null}
						onChange={(ev, checked) =>
							handleDelimiterUpdate(index, checked ? defaultDelimiter : null)
						}
					/>
					<StyledListItemInputArea
						className={header.spreadWithDelimiter !== null ? 'enabled' : ''}
					>
						<StyledInputField
							value={header.spreadWithDelimiter ?? ''}
							onChange={(ev: ChangeEvent<HTMLInputElement>) =>
								handleDelimiterUpdate(index, ev.target.value)
							}
						/>
					</StyledListItemInputArea>
				</StyledListItem>
			)
		})
	}, [
		sensitiveContent,
		selectedStringColumns,
		handleDelimiterUpdate,
		defaultDelimiter,
	])
	return (
		<>
			<Action className={actionClass} id={actionId} onClick={toggleCallout}>
				Multi-value Columns
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
						<GroupActions vertical>
							<FlexContainer justify="space-around" align="center">
								<GroupAction onClick={() => setAllOptions(true)}>
									All
								</GroupAction>
								<Divider>|</Divider>
								<GroupAction onClick={() => setAllOptions(false)}>
									None
								</GroupAction>
							</FlexContainer>
							<DefaultDelimiterArea align="center" justify="space-between">
								<Label htmlFor="default-delimiter">Default Delimiter: </Label>
								<StyledInputWrapper>
									<StyledInputField
										type="text"
										id="default-delimiter"
										onChange={updateDefaultDelimiter}
										value={defaultDelimiter}
									/>
								</StyledInputWrapper>
							</DefaultDelimiterArea>
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
MultiValueColumns.displayName = 'MultiValueColumns'

const Action = styled.span`
	font-size: ${p => p.theme.fonts.mediumPlus.fontSize};
	/* font-weight: bold; */
	letter-spacing: 1.25px;
	padding: ${p => p.theme.spacing.m};
	color: ${p => p.theme.palette.themePrimary};
	&:hover {
		cursor: pointer;
	}
	&.disabled {
		color: ${p => p.theme.palette.neutralTertiary};
		&:hover {
			cursor: auto;
		}
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

const StyledListItem = styled(FlexContainer)`
	& .checkbox-209 {
		background: ${p => p.theme.palette.white};
	}
	&.odd {
		background: ${p => p.theme.palette.themeLighter};
	}
`

const StyledListItemInputArea = styled.div`
	width: 50px;
	visibility: hidden;
	&.enabled {
		visibility: visible;
	}
`

const StyledCheckbox = styled(Checkbox)`
	padding: ${p => p.theme.spacing.s2};
`

const DefaultDelimiterArea = styled(FlexContainer)`
	margin-top: ${p => p.theme.spacing.m};

	& label {
		font-weight: normal;
		letter-spacing: 1.25px;
		font-size: ${p => p.theme.fonts.medium.fontSize};
		/* color: ${p => p.theme.palette.neutralTertiary}; */
	}
`

const StyledInputWrapper = styled.div`
	margin-left: ${p => p.theme.spacing.m};
`

const StyledInputField = styled.input`
	width: 100%;
	height: 18px;
	border: 1px solid ${p => p.theme.palette.themeLight};
	border-radius: ${p => p.theme.effects.roundedCorner2};
	&:focus {
		outline: 1px solid ${p => p.theme.palette.themePrimary};
	}
`
