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
import { memo, useEffect, useRef, useState } from 'react'
import type {
	IAttributesIntersection,
	ISelectedAttributesByColumn,
} from 'sds-wasm'

import {
	ColumnAttributeSelectorGrid,
	HeaderSelector,
	SelectedAttributes,
} from '../../../components/AttributeSelector'
import { ContextsDropdown } from '../../../components/ContextsDropdown'
import { InfoTooltip } from '../../../components/InfoTooltip'
import { PipelineStep } from '../../../models'
import {
	useAllContextsParametersValue,
	useSelectedContextParameters,
	useSelectedPipelineStepSetter,
	useWasmWorkerValue,
} from '../../../states'
import { tooltips } from '../../../ui-tooltips'
import {
	useInitiallySelectedHeaders,
	useOnClearSelectedAttributes,
	useOnGoBack,
	useOnNewSelectedAttributesByColumn,
	useOnRunNavigate,
	useOnSetSelectedAttributes,
	useOnToggleSelectedHeader,
} from './hooks'

const backIcon: IIconProps = { iconName: 'Back' }

const viewHeight = 'calc(100vh - 265px)'

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
	const worker = useWasmWorkerValue()
	const setSelectedPipelineStep = useSelectedPipelineStepSetter()
	const isMounted = useRef(true)
	const allContextsParameters = useAllContextsParametersValue()
	const [selectedContextParameters, setSelectedContextParameters] =
		useSelectedContextParameters()
	const headers = selectedContextParameters?.useColumns ?? []
	const initiallySelectedHeaders = useInitiallySelectedHeaders(headers)
	const [selectedHeaders, setSelectedHeaders] = useState<boolean[]>(
		initiallySelectedHeaders,
	)
	const setNewSelectedAttributesByColumn = useOnNewSelectedAttributesByColumn(
		selectedContextParameters?.key,
		setIsLoading,
		isMounted,
		setSelectedAttributesByColumn,
		worker,
	)
	const onSetSelectedAttributes = useOnSetSelectedAttributes(
		setNewSelectedAttributesByColumn,
		selectedAttributesByColumn,
	)
	const onClearSelectedAttributes = useOnClearSelectedAttributes(
		setNewSelectedAttributesByColumn,
	)
	const onGoBack = useOnGoBack(setSelectedPipelineStep, PipelineStep.Evaluate)
	const onToggleSelectedHeader = useOnToggleSelectedHeader(
		selectedHeaders,
		setSelectedHeaders,
	)

	const onRunNavigate = useOnRunNavigate(
		selectedContextParameters?.key,
		setIsLoading,
		isMounted,
		setSelectedHeaders,
		initiallySelectedHeaders,
		worker,
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
	}, [selectedContextParameters, onClearSelectedAttributes])

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

			<ContextsDropdown
				selectedContextParameters={selectedContextParameters}
				allContextsParameters={allContextsParameters}
				onContextSelected={setSelectedContextParameters}
				disabled={allContextsParameters.length === 0 || isLoading}
			/>

			<SelectedAttributes
				headers={headers}
				selectedAttributesByColumn={selectedAttributesByColumn}
				onSetSelectedAttributes={onSetSelectedAttributes}
				onClearSelectedAttributes={onClearSelectedAttributes}
			/>

			{selectedContextParameters && (
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
									contextKey={selectedContextParameters?.key}
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
