/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { Separator, useTheme } from '@fluentui/react'
import { FlexContainer, FlexItem } from '@sds/components'
import { memo, useEffect, useRef, useState } from 'react'
import type {
	HeaderNames,
	IAttributesIntersection,
	ISelectedAttributesByColumn,
} from 'sds-wasm'
import styled from 'styled-components'

import {
	ColumnAttributeSelectorGrid,
	HeaderSelector,
	SelectedAttributes,
} from '~components/AttributeSelector'
import { SynthesisDropdown } from '~components/SynthesisDropdown'
import { useAllFinishedSynthesisInfo } from '~pages/Synthesize'
import { useSdsManagerInstance, useSelectedSynthesisInfo } from '~states'

import {
	useOnClearSelectedAttributes,
	useOnNewSelectedAttributesByColumn,
	useOnRunNavigate,
	useOnSetSelectedAttributes,
	useOnToggleSelectedHeader,
} from './hooks/index.js'

const viewHeight = 'calc(100vh - 204px)'

const chartHeight = `calc((${viewHeight} / 2) - 25px)`

export type SetSelectedAttributesCallback = (
	headerIndex: number,
	item: IAttributesIntersection | undefined,
) => Promise<void>

export type ClearSelectedAttributesCallback = () => Promise<void>

export const DataNavigation: React.FC = memo(function DataNavigation() {
	const [isLoading, setIsLoading] = useState(true)
	const [selectedAttributesByColumn, setSelectedAttributesByColumn] =
		useState<ISelectedAttributesByColumn>({})
	const [manager] = useSdsManagerInstance()
	const isMounted = useRef(true)
	const allFinishedSynthesisInfo = useAllFinishedSynthesisInfo()
	const [selectedSynthesis, setSelectedSynthesis] = useSelectedSynthesisInfo()
	const [headers, setHeaders] = useState<HeaderNames>([])
	const [selectedHeaders, setSelectedHeaders] = useState<boolean[]>([])
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
	const onToggleSelectedHeader = useOnToggleSelectedHeader(
		selectedHeaders,
		setSelectedHeaders,
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
		<MainContainer vertical gap={theme.spacing.s1}>
			<FlexContainer vertical gap={theme.spacing.s1}>
				<SynthesisDropdown
					selectedSynthesis={selectedSynthesis}
					allSynthesisInfo={allFinishedSynthesisInfo}
					onChange={setSelectedSynthesis}
					disabled={allFinishedSynthesisInfo.length === 0 || isLoading}
				/>
				<SelectedAttributes
					headers={headers}
					selectedAttributesByColumn={selectedAttributesByColumn}
					onSetSelectedAttributes={onSetSelectedAttributes}
					onClearSelectedAttributes={onClearSelectedAttributes}
				/>
			</FlexContainer>

			{selectedSynthesis && (
				<Container key={isLoading.toString()}>
					<Container>
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
		</MainContainer>
	)
})

const Container = styled(FlexContainer)`
	overflow-y: auto;
`

const MainContainer = styled(Container)`
	margin-top: ${p => p.theme.spacing.s1};
	padding-left: ${p => p.theme.spacing.m};
	padding-right: ${p => p.theme.spacing.m};
`
