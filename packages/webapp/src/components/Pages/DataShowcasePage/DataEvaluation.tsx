/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import type { IStackStyles, IStackTokens } from '@fluentui/react'
import {
	getTheme,
	Position,
	PrimaryButton,
	SpinButton,
	Stack,
} from '@fluentui/react'
import { memo } from 'react'

import { SensitiveDataCharts, SyntheticDataCharts } from '~components/Charts'
import { DownloadButton } from '~components/controls/DownloadButton'
import { EvaluationSummary } from '~components/EvaluationSummary'
import { InfoTooltip } from '~components/InfoTooltip'
import { TooltipWrapper } from '~components/TooltipWrapper'
import { useEvaluateResult, useIsProcessing, useReportingLength } from '~states'
import { tooltips } from '~ui-tooltips'

import { useCanRun, useOnRunEvaluate, useSpinButtonOnChange } from './hooks'
import { useOnGetAggregatesDownloadInfo } from './hooks/evaluation'

export const DataEvaluation: React.FC = memo(function DataEvaluation() {
	const [reportingLength, setReportingLength] = useReportingLength()
	const [isProcessing] = useIsProcessing()
	const [evaluateResult, setEvaluateResult] = useEvaluateResult()
	const canRun = useCanRun()
	const onRunEvaluate = useOnRunEvaluate(setEvaluateResult, reportingLength)
	const onGetAggregatesDownloadInfo = useOnGetAggregatesDownloadInfo()
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
					{evaluateResult && (
						<Stack.Item align="end">
							<DownloadButton
								title="Download sensitive aggregates CSV"
								label="Sensitive aggregates"
								onGetDownloadInfo={onGetAggregatesDownloadInfo}
							/>
						</Stack.Item>
					)}
				</Stack>
			</Stack.Item>

			{evaluateResult && (
				<>
					<EvaluationSummary
						privacyRiskLabel="Sensitive privacy risk"
						utilityCostLabel="Synthetic utility cost"
						privacyRisk={evaluateResult.sensitiveAggregateResult.privacyRisk}
						recordExpansion={evaluateResult.recordExpansion}
						combinationLoss={evaluateResult.preservationByCount.combinationLoss}
						chartStackTokens={chartStackTokens}
					/>
					<SensitiveDataCharts
						evaluateResult={evaluateResult}
						chartHeight={chartHeight}
						chartWidth={chartWidth}
						chartStackStyles={chartStackStyles}
						chartStackTokens={chartStackTokens}
						chartStackItemStyles={chartStackItemStyles}
					/>
					<SyntheticDataCharts
						evaluateResult={evaluateResult}
						chartHeight={chartHeight}
						chartWidth={chartWidth}
						chartStackStyles={chartStackStyles}
						chartStackTokens={chartStackTokens}
						chartStackItemStyles={chartStackItemStyles}
					/>
				</>
			)}
		</Stack>
	)
})
