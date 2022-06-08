/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { Icon, useTheme } from '@fluentui/react'
import { FlexContainer, FlexItem } from '@sds/components'
import type { FC } from 'react'
import { memo, useCallback, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'

import { SynthesisDropdown } from '~components/SynthesisDropdown/SynthesisDropdown'
import {
	useHeaders,
	useSdsManagerInstance,
	useSelectedAttributesByColumn,
	useSelectedHeaders,
	useSelectedSynthesisInfo,
} from '~states'

import { SelectedAttributes } from '../../../components/AttributeSelector/SelectedAttributes.js'
import { useAllFinishedSynthesisInfo } from '../../Synthesize/Synthesize.hooks.js'
import {
	useOnClearSelectedAttributes,
	useOnNewSelectedAttributesByColumn,
	useOnRunNavigate,
	useOnSetSelectedAttributes,
} from '../hooks/index.js'
import { SelectColumns } from './SelectColumns/SelectColumns.js'

export type CommandsProps = {
	onFullScreenToggle?: (fullscreen: boolean) => void
}

export const Commands: FC<CommandsProps> = memo(function Commands({
	onFullScreenToggle,
}) {
	const [isLoading, setIsLoading] = useState(true)
	const [isFullScreen, setIsFullScreen] = useState(false)
	const [selectedAttributesByColumn, setSelectedAttributesByColumn] =
		useSelectedAttributesByColumn()
	const [manager] = useSdsManagerInstance()
	const isMounted = useRef(true)
	const allFinishedSynthesisInfo = useAllFinishedSynthesisInfo()
	const [selectedSynthesis, setSelectedSynthesis] = useSelectedSynthesisInfo()
	const [headers, setHeaders] = useHeaders()
	const [, setSelectedHeaders] = useSelectedHeaders()
	const setNewSelectedAttributesByColumn = useOnNewSelectedAttributesByColumn(
		selectedSynthesis?.key,
		setIsLoading,
		isMounted,
		setSelectedAttributesByColumn,
		manager,
	)
	const onSetSelectedAttributes = useOnSetSelectedAttributes(
		setNewSelectedAttributesByColumn,
		selectedAttributesByColumn,
	)
	const onClearSelectedAttributes = useOnClearSelectedAttributes(
		setNewSelectedAttributesByColumn,
	)
	const onRunNavigate = useOnRunNavigate(
		selectedSynthesis?.key,
		setIsLoading,
		isMounted,
		setHeaders,
		setSelectedHeaders,
		manager,
	)
	const theme = useTheme()

	useEffect(() => {
		onClearSelectedAttributes()
		onRunNavigate()
	}, [selectedSynthesis, onClearSelectedAttributes, onRunNavigate])

	useEffect(() => {
		return () => {
			isMounted.current = false
		}
	}, [])

	const toggleFullScreen = useCallback(() => {
		onFullScreenToggle && onFullScreenToggle(!isFullScreen)
		setIsFullScreen(!isFullScreen)
	}, [setIsFullScreen, isFullScreen, onFullScreenToggle])

	return (
		<Container vertical>
			<FlexContainer
				align="center"
				style={{ padding: theme.spacing.m, paddingBottom: 0, width: '100%' }}
			>
				<FlexItem grow={1} shrink={0}>
					<SynthesisDropdown
						selectedSynthesis={selectedSynthesis}
						allSynthesisInfo={allFinishedSynthesisInfo}
						onChange={setSelectedSynthesis}
						disabled={allFinishedSynthesisInfo.length === 0 || isLoading}
					/>
				</FlexItem>
				<StyledIcon
					onClick={toggleFullScreen}
					iconName={isFullScreen ? 'ChromeClose' : 'FullScreen'}
				/>
			</FlexContainer>
			<FlexContainer align="center">
				<SelectColumns />
				<SelectedAttributes
					headers={headers}
					selectedAttributesByColumn={selectedAttributesByColumn}
					onSetSelectedAttributes={onSetSelectedAttributes}
					onClearSelectedAttributes={onClearSelectedAttributes}
				/>
			</FlexContainer>
		</Container>
	)
})
Commands.displayName = 'NavigateCommands'

const Container = styled(FlexContainer)`
	border-bottom: 1px solid ${p => p.theme.palette.neutralLight};
	box-shadow: ${p => p.theme.effects.elevation4};
`

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
