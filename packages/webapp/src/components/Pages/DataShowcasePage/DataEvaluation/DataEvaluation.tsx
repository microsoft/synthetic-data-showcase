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
import { memo, useState } from 'react'

import { DataEvaluationInfo } from '~components/DataEvaluationInfo'
import { InfoTooltip } from '~components/InfoTooltip'
import { TooltipWrapper } from '~components/TooltipWrapper'
import { AggregateType, SynthesisMode } from '~models'
import { useEvaluateResult, useIsProcessing, useReportingLength, useSyntheticContentValue } from '~states'
import { tooltips } from '~ui-tooltips'

import { useCanRun, useDropdownOnChange, useSpinButtonOnChange } from '../hooks'
import {
	useAggregateTypeOptions,
	useOnRunEvaluate,
} from './hooks'

const aggregateTypeToStatKey = {
	[AggregateType.Sensitive]: 'sensitiveDataStats',
	[AggregateType.Reportable]: 'aggregateCountsStats',
	[AggregateType.Synthetic]: 'syntheticDataStats',
}

export const DataEvaluation: React.FC = memo(function DataEvaluation() {
	const [reportingLength, setReportingLength] = useReportingLength()
	const [isProcessing] = useIsProcessing()
	const [evaluateResult, setEvaluateResult] = useEvaluateResult()
	const [leftAggregateType, setLeftAggregateType] = useState<
		AggregateType | undefined
	>(undefined)
	const [rightAggregateType, setRightAggregateType] = useState<
		AggregateType | undefined
	>(undefined)
	const aggregateTypeOptions = useAggregateTypeOptions()
	const leftAggregateTypeOnChange = useDropdownOnChange(
		setLeftAggregateType,
	)
	const rightAggregateTypeOnChange = useDropdownOnChange(
		setRightAggregateType,
	)
	const canRun = useCanRun()
	const onRunEvaluate = useOnRunEvaluate(setEvaluateResult, reportingLength)
	const handleReportingLengthChange = useSpinButtonOnChange(setReportingLength)
	const syntheticContent = useSyntheticContentValue()

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

	return (
		<Stack styles={mainStackStyles} tokens={mainStackTokens}>
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
								disabled={isProcessing || (
									syntheticContent.synthesisParameters?.synthesisMode !== SynthesisMode.Unseeded && 
									syntheticContent.synthesisParameters?.synthesisMode !== SynthesisMode.RowSeeded)
								}
								onChange={handleReportingLengthChange}
							/>
						</TooltipWrapper>
					</Stack.Item>
					<Stack.Item align="end">
						<PrimaryButton
							type="submit"
							onClick={onRunEvaluate}
							disabled={!canRun}
						>
							Run
						</PrimaryButton>
					</Stack.Item>
					<Stack.Item align="end">
						<InfoTooltip>{tooltips.evaluate}</InfoTooltip>
					</Stack.Item>
				</Stack>
			</Stack.Item>

			{evaluateResult && (
				<>
					<Stack horizontal styles={dataStackStyles} tokens={dataStackTokens}>
						<Stack.Item styles={dataStackItemStyles}>
							<Dropdown
								selectedKey={leftAggregateType}
								onChange={leftAggregateTypeOnChange}
								placeholder="Select data statistics"
								options={aggregateTypeOptions}
								styles={dropdownStyles}
							/>
						</Stack.Item>
						<Stack.Item styles={dataStackItemStyles}>
							<Dropdown
								selectedKey={rightAggregateType}
								onChange={rightAggregateTypeOnChange}
								placeholder="Select data statistics"
								options={aggregateTypeOptions}
								styles={dropdownStyles}
							/>
						</Stack.Item>
					</Stack>

					<Stack horizontal styles={dataStackStyles} tokens={dataStackTokens}>
						<Stack.Item styles={dataStackItemStyles}>
							{leftAggregateType ? (
								<DataEvaluationInfo
									reportingLength={evaluateResult.reportingLength}
									stats={
										evaluateResult[aggregateTypeToStatKey[leftAggregateType]]
									}
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
							{rightAggregateType ? (
								<DataEvaluationInfo
									reportingLength={evaluateResult.reportingLength}
									stats={
										evaluateResult[aggregateTypeToStatKey[rightAggregateType]]
									}
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
				</>
			)}
		</Stack>
	)
})
