/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import type { IStackStyles, IStackTokens} from '@fluentui/react';
import { Dropdown, 	getTheme,
Label ,
	Position,
	PrimaryButton,
	SpinButton,
	Stack,
} from '@fluentui/react'
import { memo, useState } from 'react'

import { DataEvaluationInfo } from '~components/DataEvaluationInfo'
import { InfoTooltip } from '~components/InfoTooltip'
import { TooltipWrapper } from '~components/TooltipWrapper'
import type { EvaluationStatsType } from '~models'
import { useEvaluateResult, useIsProcessing, useReportingLength } from '~states'
import { tooltips } from '~ui-tooltips'

import { useCanRun, useOnRunEvaluate, useSpinButtonOnChange } from './hooks'
import {
	useEvaluationStatsTypeOnChange,
	useEvaluationStatsTypeOptions,
} from './hooks/evaluation'

export const DataEvaluation: React.FC = memo(function DataEvaluation() {
	const [reportingLength, setReportingLength] = useReportingLength()
	const [isProcessing] = useIsProcessing()
	const [evaluateResult, setEvaluateResult] = useEvaluateResult()
	const [leftStatsType, setLeftStatsType] = useState<string | undefined>(
		undefined,
	)
	const [rightStatsType, setRightStatsType] = useState<string | undefined>(
		undefined,
	)
	const evaluationStatsTypeOptions = useEvaluationStatsTypeOptions()
	const leftEvaluationStatsTypeOnChange =
		useEvaluationStatsTypeOnChange(setLeftStatsType)
	const rightEvaluationStatsTypeOnChange =
		useEvaluationStatsTypeOnChange(setRightStatsType)

	const canRun = useCanRun()
	const onRunEvaluate = useOnRunEvaluate(setEvaluateResult, reportingLength)
	const handleReportingLengthChange = useSpinButtonOnChange(setReportingLength)

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
								disabled={isProcessing}
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
								selectedKey={leftStatsType}
								onChange={leftEvaluationStatsTypeOnChange}
								placeholder="Select data statistics"
								options={evaluationStatsTypeOptions}
								styles={dropdownStyles}
							/>
						</Stack.Item>
						<Stack.Item styles={dataStackItemStyles}>
							<Dropdown
								selectedKey={rightStatsType}
								onChange={rightEvaluationStatsTypeOnChange}
								placeholder="Select data statistics"
								options={evaluationStatsTypeOptions}
								styles={dropdownStyles}
							/>
						</Stack.Item>
					</Stack>

					<Stack horizontal styles={dataStackStyles} tokens={dataStackTokens}>
						<Stack.Item styles={dataStackItemStyles}>
							{leftStatsType ? (
								<DataEvaluationInfo
									reportingLength={evaluateResult?.reportingLength}
									stats={evaluateResult?.[leftStatsType] ?? {}}
									statsType={leftStatsType as EvaluationStatsType}
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
							{rightStatsType ? (
								<DataEvaluationInfo
									reportingLength={evaluateResult?.reportingLength}
									stats={evaluateResult?.[rightStatsType] ?? {}}
									statsType={rightStatsType as EvaluationStatsType}
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
