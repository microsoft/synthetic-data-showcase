/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import type { IIconProps } from '@fluentui/react'
import { IconButton, Separator, useTheme } from '@fluentui/react'
import { FlexContainer, FlexItem } from '@sds/components'
import { memo, useCallback, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import type {
	IAttributesIntersection,
	ISelectedAttributesByColumn,
} from 'sds-wasm'
import styled from 'styled-components'

import {
	ColumnAttributeSelectorGrid,
	HeaderSelector,
	SelectedAttributes,
} from '~components/AttributeSelector'
import { InfoTooltip } from '~components/InfoTooltip'
import { SynthesisDropdown } from '~components/SynthesisDropdown'
import { Pages } from '~pages'
import { useAllFinishedSynthesisInfo } from '~pages/Synthesize'
import { useSdsManagerInstance, useSelectedSynthesisInfo } from '~states'
import { tooltips } from '~ui-tooltips'

import {
	useInitiallySelectedHeaders,
	useOnClearSelectedAttributes,
	useOnNewSelectedAttributesByColumn,
	useOnRunNavigate,
	useOnSetSelectedAttributes,
	useOnToggleSelectedHeader,
} from './hooks/index.js'

const backIcon: IIconProps = { iconName: 'Back' }

const viewHeight = 'calc(100vh - 265px)'

const chartHeight = `calc((${viewHeight} / 2) - 25px)`

export type SetSelectedAttributesCallback = (
	headerIndex: number,
	item: IAttributesIntersection | undefined,
) => Promise<void>

export type ClearSelectedAttributesCallback = () => Promise<void>

export const DataNavigation: React.FC = memo(function DataNavigation() {
	const navigate = useNavigate()
	const [isLoading, setIsLoading] = useState(true)
	const [selectedAttributesByColumn, setSelectedAttributesByColumn] =
		useState<ISelectedAttributesByColumn>({})
	const [manager] = useSdsManagerInstance()
	const isMounted = useRef(true)
	const allFinishedSynthesisInfo = useAllFinishedSynthesisInfo()
	const [selectedSynthesis, setSelectedSynthesis] = useSelectedSynthesisInfo()
	const headers =
		selectedSynthesis?.parameters.csvDataParameters.useColumns ?? []
	const initiallySelectedHeaders = useInitiallySelectedHeaders(headers)
	const [selectedHeaders, setSelectedHeaders] = useState<boolean[]>(
		initiallySelectedHeaders,
	)
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
	const onGoBack = useCallback(() => {
		navigate(Pages.Synthesize.path)
	}, [navigate])
	const onToggleSelectedHeader = useOnToggleSelectedHeader(
		selectedHeaders,
		setSelectedHeaders,
	)

	const onRunNavigate = useOnRunNavigate(
		selectedSynthesis?.key,
		setIsLoading,
		isMounted,
		setSelectedHeaders,
		initiallySelectedHeaders,
		manager,
	)
	const theme = useTheme()

	useEffect(() => {
		onClearSelectedAttributes()
	}, [selectedSynthesis, onClearSelectedAttributes])

	useEffect(() => {
		onRunNavigate()
	}, [onRunNavigate])

	useEffect(() => {
		return () => {
			isMounted.current = false
		}
	}, [])

	return (
		<Container vertical>
			<FlexItem style={{ padding: `0 ${theme.spacing.m}` }}>
				<FlexContainer align="center" gap={theme.spacing.s1}>
					<IconButton iconProps={backIcon} onClick={onGoBack} />
					<h3>Compare sensitive and synthetic results</h3>
					<InfoTooltip>{tooltips.navigate}</InfoTooltip>
				</FlexContainer>

				<SynthesisDropdown
					selectedSynthesis={selectedSynthesis}
					allSynthesisInfo={allFinishedSynthesisInfo}
					onChange={setSelectedSynthesis}
					disabled={allFinishedSynthesisInfo.length === 0 || isLoading}
				/>
				<br />
				<SelectedAttributes
					headers={headers}
					selectedAttributesByColumn={selectedAttributesByColumn}
					onSetSelectedAttributes={onSetSelectedAttributes}
					onClearSelectedAttributes={onClearSelectedAttributes}
				/>
			</FlexItem>

			{selectedSynthesis && (
				<Container>
					<Container style={{ padding: theme.spacing.m }}>
						<HeaderSelector
							headers={headers}
							selectedHeaders={selectedHeaders}
							onToggle={onToggleSelectedHeader}
						/>
					</Container>
					<FlexItem grow={0} shrink={0}>
						<Separator
							vertical={true}
							styles={{ root: { height: viewHeight } }}
						/>
					</FlexItem>

					<FlexItem grow={1} shrink={0}>
						<ColumnAttributeSelectorGrid
							contextKey={selectedSynthesis?.key}
							viewHeight={viewHeight}
							headers={headers}
							selectedHeaders={selectedHeaders}
							chartHeight={chartHeight}
							chartWidth={400}
							chartBarHeight={40}
							chartMinHeight={150}
							selectedAttributesByColumn={selectedAttributesByColumn}
							onSetSelectedAttributes={onSetSelectedAttributes}
						/>
					</FlexItem>
				</Container>
			)}
		</Container>
	)
})

const Container = styled(FlexContainer)`
	height: 100%;
	overflow-y: auto;
`
