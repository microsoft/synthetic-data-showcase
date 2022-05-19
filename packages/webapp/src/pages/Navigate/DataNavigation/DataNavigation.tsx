/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import type { IIconProps, IStackStyles, IStackTokens } from '@fluentui/react'
import {
	IconButton,
	Separator,
	Spinner,
	Stack,
	useTheme,
} from '@fluentui/react'
import { memo, useCallback, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import type {
	IAttributesIntersection,
	ISelectedAttributesByColumn,
} from 'sds-wasm'

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

	const mainStackStyles: IStackStyles = {
		root: {
			display: 'flex',
			marginTop: theme.spacing.s2,
			marginLeft: theme.spacing.l1,
			marginRight: theme.spacing.l1,
		},
	}

	const mainStackTokens: IStackTokens = {
		childrenGap: theme.spacing.m,
	}

	const subStackTokens: IStackTokens = {
		childrenGap: theme.spacing.s1,
	}

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
		<Stack styles={mainStackStyles} tokens={mainStackTokens}>
			<Stack horizontal verticalAlign="center" tokens={subStackTokens}>
				<IconButton iconProps={backIcon} onClick={onGoBack} />
				<h3>Compare sensitive and synthetic results</h3>
				<InfoTooltip>{tooltips.navigate}</InfoTooltip>
			</Stack>

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

			{selectedSynthesis && (
				<Stack horizontal tokens={subStackTokens} horizontalAlign="center">
					{isLoading ? (
						<Spinner />
					) : (
						<>
							<Stack.Item
								styles={{
									root: {
										overflow: 'auto',
										paddingRight: '20px',
										height: viewHeight,
										minWidth: '80px',
									},
								}}
							>
								<HeaderSelector
									headers={headers}
									selectedHeaders={selectedHeaders}
									onToggle={onToggleSelectedHeader}
								/>
							</Stack.Item>

							<Separator
								vertical={true}
								styles={{ root: { height: viewHeight } }}
							/>

							<Stack.Item grow={1}>
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
							</Stack.Item>
						</>
					)}
				</Stack>
			)}
		</Stack>
	)
})
