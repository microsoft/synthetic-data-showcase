/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import {
	Stack,
	IStackStyles,
	useTheme,
	IStackTokens,
	Spinner,
	IIconProps,
	IconButton,
	Separator,
} from '@fluentui/react'
import { memo, useCallback, useEffect, useRef, useState } from 'react'
import { AttributeIntersectionValueChartLegend } from '~components/AttributeIntersectionValueChartLegend'
import {
	ColumnAttributeSelector,
	HeaderSelector,
	SelectedAttributes,
} from '~components/AttributeSelector'
import { useHorizontalScrolling } from '~components/Charts/hooks'
import { defaultNavigateResult, PipelineStep } from '~models'
import {
	useNavigateResultSetter,
	useSyntheticContentValue,
	useWasmWorkerValue,
} from '~states'
import {
	useSelectedAttributeRowsSetter,
	useSelectedAttributesSetter,
	useSelectedPipelineStepSetter,
} from '~states/dataShowcaseContext'

const backIcon: IIconProps = { iconName: 'Back' }

const initiallySelectedHeaders = 6

export const DataNavigation: React.FC = memo(function DataNavigation() {
	const [isLoading, setIsLoading] = useState(true)
	const setNavigateResult = useNavigateResultSetter()
	const setSelectedAttributes = useSelectedAttributesSetter()
	const syntheticContent = useSyntheticContentValue()
	const worker = useWasmWorkerValue()
	const setSelectedAttributeRows = useSelectedAttributeRowsSetter()
	const setSelectedPipelineStep = useSelectedPipelineStepSetter()
	const isMounted = useRef(true)
	const headers = syntheticContent.headers.map(h => h.name)
	const [selectedHeaders, setSelectedHeaders] = useState<boolean[]>(
		headers.map((_, i) => i < initiallySelectedHeaders),
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

	const viewHeigh = 'calc(100vh - 225px)'

	const chartHeight = `calc((${viewHeigh} / 2) - 20px)`

	const onGoBack = useCallback(() => {
		setSelectedPipelineStep(PipelineStep.Evaluate)
	}, [setSelectedPipelineStep])

	const onToggleSelectedHeader = useCallback(
		index => {
			const newSelectedHeaders = [...selectedHeaders]
			newSelectedHeaders[index] = !newSelectedHeaders[index]
			setSelectedHeaders(newSelectedHeaders)
		},
		[setSelectedHeaders, selectedHeaders],
	)

	const doHorizontalScroll = useHorizontalScrolling()

	useEffect(() => {
		if (worker) {
			setIsLoading(true)
			setSelectedAttributeRows([])
			setSelectedAttributes({})
			setNavigateResult(defaultNavigateResult)
			setSelectedAttributeRows([])

			worker.navigate(syntheticContent.items).then(result => {
				if (isMounted.current) {
					if (result) {
						setNavigateResult(result)
						setSelectedAttributeRows(result.allRows)
					}
					setIsLoading(false)
				}
			})
		}
	}, [syntheticContent.items, setIsLoading, setSelectedAttributeRows, setSelectedAttributes, worker, setNavigateResult])

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
			</Stack>

			<SelectedAttributes headers={headers} />

			<Stack horizontal tokens={subStackTokens} horizontalAlign="center">
				<Stack.Item
					styles={{
						root: {
							overflow: 'auto',
							paddingRight: '20px',
							height: viewHeigh,
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

				<Separator vertical={true} styles={{ root: { height: viewHeigh } }} />

				<Stack.Item grow={1}>
					{isLoading ? (
						<Spinner />
					) : (
						<Stack>
							<AttributeIntersectionValueChartLegend />
							<Stack
								wrap
								tokens={{
									childrenGap: theme.spacing.m,
								}}
								styles={{
									root: {
										height: viewHeigh,
										overflowY: 'hidden',
										padding: theme.spacing.s1,
									},
								}}
								onWheel={doHorizontalScroll}
								verticalAlign="space-between"
							>
								{headers.map((h, i) => {
									return (
										selectedHeaders[i] && (
											<Stack.Item key={i}>
												<ColumnAttributeSelector
													headers={headers}
													headerName={h}
													columnIndex={i}
													height={chartHeight}
													width={400}
													chartHeight={40}
													minHeight={150}
												/>
											</Stack.Item>
										)
									)
								})}
							</Stack>
						</Stack>
					)}
				</Stack.Item>
			</Stack>
		</Stack>
	)
})
