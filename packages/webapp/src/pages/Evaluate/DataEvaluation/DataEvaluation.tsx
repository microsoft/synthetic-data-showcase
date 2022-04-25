/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import type { IStackStyles, IStackTokens } from '@fluentui/react'
import {
	Dropdown,
	getTheme,
	Label,
	Position,
	PrimaryButton,
	SpinButton,
	Stack,
} from '@fluentui/react'
import { memo, useEffect, useMemo, useRef, useState } from 'react'
import type { IEvaluateResult } from 'sds-wasm'

import { ContextsDropdown } from '~components/ContextsDropdown'
import { DataEvaluationInfo } from '~components/DataEvaluationInfo'
import { InfoTooltip } from '~components/InfoTooltip'
import { TooltipWrapper } from '~components/TooltipWrapper'
import type { IContextParameters } from '~models'
import { AggregateType, SynthesisMode } from '~models'
import {
	useCanRun,
	useDropdownOnChange,
	useSpinButtonOnChange,
} from '~pages/hooks'
import {
	useAllContextsParametersValue,
	useIsProcessing,
	useReportingLength,
	useSelectedContextParameters,
} from '~states'
import { tooltips } from '~ui-tooltips'

import {
	useAggregateTypeOptions,
	useMicrodataMaxStatistics,
	useOnRunEvaluate,
	useSelectedContextParametersOnChange,
} from './hooks'

const aggregateTypeToStatKey = {
	[AggregateType.Sensitive]: 'sensitiveDataStats',
	[AggregateType.Reportable]: 'aggregateCountsStats',
	[AggregateType.Synthetic]: 'syntheticDataStats',
}

export const DataEvaluation: React.FC = memo(function DataEvaluation() {
	const isMounted = useRef(true)
	const [reportingLength, setReportingLength] = useReportingLength()
	const [isProcessing] = useIsProcessing()
	const [leftEvaluateResult, setLeftEvaluateResult] = useState<
		IEvaluateResult | undefined
	>()
	const [rightEvaluateResult, setRightEvaluateResult] = useState<
		IEvaluateResult | undefined
	>()
	const [leftAggregateType, setLeftAggregateType] = useState<AggregateType>(
		AggregateType.Sensitive,
	)
	const [rightAggregateType, setRightAggregateType] = useState<AggregateType>(
		AggregateType.Synthetic,
	)
	const aggregateTypeOptions = useAggregateTypeOptions()
	const leftAggregateTypeOnChange = useDropdownOnChange(setLeftAggregateType)
	const rightAggregateTypeOnChange = useDropdownOnChange(setRightAggregateType)
	const leftStats = leftEvaluateResult
		? leftEvaluateResult[aggregateTypeToStatKey[leftAggregateType]]
		: undefined
	const rightStats = rightEvaluateResult
		? rightEvaluateResult[aggregateTypeToStatKey[rightAggregateType]]
		: undefined
	const microdataMaxStats = useMicrodataMaxStatistics([leftStats, rightStats])
	const canRun = useCanRun()
	const handleReportingLengthChange = useSpinButtonOnChange(setReportingLength)
	const allContextsParameters = useAllContextsParametersValue()
	const allEvaluatedContextsParameters = useMemo(
		() => allContextsParameters.filter(c => c.isEvaluated),
		[allContextsParameters],
	)
	const [selectedContextParameters, setSelectedContextParameters] =
		useSelectedContextParameters()
	const [leftSelectedContextParameters, setLeftSelectedContextParameters] =
		useState<IContextParameters | undefined>(selectedContextParameters)
	const [rightSelectedContextParameters, setRightSelectedContextParameters] =
		useState<IContextParameters | undefined>(selectedContextParameters)
	const onRunEvaluate = useOnRunEvaluate(
		reportingLength,
		selectedContextParameters,
	)
	const leftSelectedContextParametersOnChange =
		useSelectedContextParametersOnChange(
			leftSelectedContextParameters,
			setLeftEvaluateResult,
			isMounted,
		)
	const rightSelectedContextParametersOnChange =
		useSelectedContextParametersOnChange(
			rightSelectedContextParameters,
			setRightEvaluateResult,
			isMounted,
		)

	const theme = getTheme()

	const mainStackStyles: IStackStyles = {
		root: {
			display: 'flex',
			marginTop: theme.spacing.s2,
			marginLeft: theme.spacing.l1,
			marginRight: theme.spacing.l1,
		},
	}

	const mainStackTokens: IStackTokens = {
		childrenGap: theme.spacing.s1,
	}

	const subStackTokens: IStackTokens = {
		childrenGap: theme.spacing.s1,
	}

	const dataStackStyles: IStackStyles = {
		root: {
			display: 'flex',
		},
	}

	const dataStackTokens: IStackTokens = {
		childrenGap: theme.spacing.s1,
	}

	const dataStackItemStyles = {
		root: {
			textAlign: 'center',
			overflowX: 'auto',
			flex: '1',
		},
	}

	const chartStackStyles: IStackStyles = {
		root: {
			display: 'flex',
			marginRight: theme.spacing.l2,
			marginLeft: theme.spacing.l2,
		},
	}

	const chartStackTokens: IStackTokens = {
		childrenGap: theme.spacing.s1,
	}

	const chartStackItemStyles: IStackStyles = {
		root: {
			alignContent: 'center',
			justifyContent: 'space-between',
		},
	}

	const dropdownStyles = { root: { paddingBottom: theme.spacing.s1 } }

	const chartHeight = 400

	const chartWidth = 550

	useEffect(() => {
		setLeftSelectedContextParameters(selectedContextParameters)
		setRightSelectedContextParameters(selectedContextParameters)
	}, [selectedContextParameters])

	useEffect(() => {
		leftSelectedContextParametersOnChange()
	}, [allContextsParameters, leftSelectedContextParameters, leftSelectedContextParametersOnChange])

	useEffect(() => {
		rightSelectedContextParametersOnChange()
	}, [allContextsParameters, rightSelectedContextParameters, rightSelectedContextParametersOnChange])

	useEffect(() => {
		return () => {
			isMounted.current = false
		}
	}, [])

	return (
		<Stack styles={mainStackStyles} tokens={mainStackTokens}>
			<Stack.Item>
				<ContextsDropdown
					selectedContextParameters={selectedContextParameters}
					allContextsParameters={allContextsParameters}
					onContextSelected={params => {
						setReportingLength(params.reportingLength)
						setSelectedContextParameters(params)
					}}
					disabled={allContextsParameters.length === 0 || isProcessing}
				/>
			</Stack.Item>
			<Stack.Item>
				<Stack tokens={subStackTokens} horizontal>
					<Stack.Item>
						<TooltipWrapper
							tooltip={tooltips.analysisLength}
							label="Analysis length"
						>
							<SpinButton
								labelPosition={Position.top}
								min={1}
								step={1}
								value={reportingLength.toString()}
								disabled={
									isProcessing ||
									(selectedContextParameters?.synthesisMode !==
										SynthesisMode.Unseeded &&
										selectedContextParameters?.synthesisMode !==
											SynthesisMode.RowSeeded)
								}
								onChange={handleReportingLengthChange}
							/>
						</TooltipWrapper>
					</Stack.Item>
					<Stack.Item align="end">
						<PrimaryButton
							type="submit"
							onClick={onRunEvaluate}
							disabled={!canRun || !selectedContextParameters}
						>
							Run
						</PrimaryButton>
					</Stack.Item>
					<Stack.Item align="end">
						<InfoTooltip>{tooltips.evaluate}</InfoTooltip>
					</Stack.Item>
				</Stack>
			</Stack.Item>

			<Stack.Item>
				<h3>Compare results</h3>
			</Stack.Item>
			<Stack horizontal styles={dataStackStyles} tokens={dataStackTokens}>
				<Stack.Item styles={dataStackItemStyles}>
					<Stack styles={dataStackStyles} tokens={dataStackTokens}>
						<ContextsDropdown
							selectedContextParameters={leftSelectedContextParameters}
							allContextsParameters={allEvaluatedContextsParameters}
							onContextSelected={setLeftSelectedContextParameters}
							disabled={
								allEvaluatedContextsParameters.length === 0 || isProcessing
							}
						/>
						<Dropdown
							selectedKey={leftAggregateType}
							onChange={leftAggregateTypeOnChange}
							placeholder="Select data statistics"
							options={aggregateTypeOptions}
							styles={dropdownStyles}
							disabled={
								allEvaluatedContextsParameters.length === 0 ||
								isProcessing ||
								leftSelectedContextParameters === undefined
							}
						/>
					</Stack>
				</Stack.Item>
				<Stack.Item styles={dataStackItemStyles}>
					<Stack styles={dataStackStyles} tokens={dataStackTokens}>
						<ContextsDropdown
							selectedContextParameters={rightSelectedContextParameters}
							allContextsParameters={allEvaluatedContextsParameters}
							onContextSelected={setRightSelectedContextParameters}
							disabled={
								allEvaluatedContextsParameters.length === 0 || isProcessing
							}
						/>
						<Dropdown
							selectedKey={rightAggregateType}
							onChange={rightAggregateTypeOnChange}
							placeholder="Select data statistics"
							options={aggregateTypeOptions}
							styles={dropdownStyles}
							disabled={
								allEvaluatedContextsParameters.length === 0 ||
								isProcessing ||
								rightSelectedContextParameters === undefined
							}
						/>
					</Stack>
				</Stack.Item>
			</Stack>

			<Stack horizontal styles={dataStackStyles} tokens={dataStackTokens}>
				<Stack.Item styles={dataStackItemStyles}>
					{leftSelectedContextParameters && leftEvaluateResult ? (
						<DataEvaluationInfo
							contextKey={leftSelectedContextParameters.key}
							reportingLength={leftEvaluateResult.reportingLength}
							stats={leftStats}
							microdataMaxStats={microdataMaxStats}
							aggregateType={leftAggregateType}
							chartHeight={chartHeight}
							chartWidth={chartWidth}
							stackStyles={chartStackStyles}
							stackTokens={chartStackTokens}
							stackItemStyles={chartStackItemStyles}
						/>
					) : (
						<Label>Nothing selected</Label>
					)}
				</Stack.Item>
				<Stack.Item styles={dataStackItemStyles}>
					{rightSelectedContextParameters && rightEvaluateResult ? (
						<DataEvaluationInfo
							contextKey={rightSelectedContextParameters.key}
							reportingLength={rightEvaluateResult.reportingLength}
							stats={rightStats}
							microdataMaxStats={microdataMaxStats}
							aggregateType={rightAggregateType}
							chartHeight={chartHeight}
							chartWidth={chartWidth}
							stackStyles={chartStackStyles}
							stackTokens={chartStackTokens}
							stackItemStyles={chartStackItemStyles}
						/>
					) : (
						<Label>Nothing selected</Label>
					)}
				</Stack.Item>
			</Stack>
		</Stack>
	)
})
