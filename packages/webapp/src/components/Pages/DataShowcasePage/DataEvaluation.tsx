/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import {
	getTheme,
	IStackStyles,
	IStackTokens,
	PrimaryButton,
	Stack,
	TextField,
} from '@fluentui/react'
import { memo, useCallback } from 'react'
import {
	FabricatedCountChart,
	LeakageCountChart,
	MeanCombinationsByLengthChart,
	PreservationByCountChart,
	PreservationPercentageByLength,
	RareCombinationsByLengthChart,
} from '~components/Charts'
import { EvaluationSummary } from '~components/EvaluationSummary'
import {
	useClearEvaluate,
	useEvaluateResult,
	useIsProcessing,
	useProcessingProgressSetter,
	useReportingLength,
	useWasmWorkerValue,
} from '~states'

export const DataEvaluation: React.FC = memo(function DataEvaluation() {
	const [reportingLength, setReportingLength] = useReportingLength()
	const [isProcessing, setIsProcessing] = useIsProcessing()
	const [evaluateResult, setEvaluateResult] = useEvaluateResult()
	const worker = useWasmWorkerValue()
	const setProcessingProgress = useProcessingProgressSetter()
	const clearEvaluate = useClearEvaluate()

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

	const onRunEvaluate = useCallback(async () => {
		setIsProcessing(true)
		await clearEvaluate()
		setProcessingProgress(0.0)

		const response = await worker?.evaluate(
			reportingLength,
			0,
			';',
			false,
			p => {
				setProcessingProgress(p)
			},
		)

		setIsProcessing(false)
		if (response) {
			setEvaluateResult(response)
		}
	}, [
		worker,
		setIsProcessing,
		reportingLength,
		clearEvaluate,
		setEvaluateResult,
		setProcessingProgress,
	])

	return (
		<Stack styles={mainStackStyles} tokens={mainStackTokens}>
			<Stack.Item>
				<h3>Evaluation parameters</h3>
			</Stack.Item>
			<Stack.Item>
				<Stack tokens={subStackTokens} horizontal>
					<Stack.Item>
						<TextField
							label="Analysis length"
							type="number"
							value={reportingLength.toString()}
							disabled={isProcessing}
							required
							onChange={(_, newValue) => setReportingLength(+(newValue ?? 0))}
						/>
					</Stack.Item>
					<Stack.Item align="end">
						<PrimaryButton
							type="submit"
							onClick={onRunEvaluate}
							disabled={isProcessing}
						>
							Run
						</PrimaryButton>
					</Stack.Item>
				</Stack>
			</Stack.Item>

			{evaluateResult && (
				<>
					<Stack.Item>
						<h3>Summary</h3>
					</Stack.Item>
					<Stack.Item>
						<EvaluationSummary
							privacyRiskLabel="Sensitive privacy risk"
							utilityCostLabel="Synthetic utility cost"
							privacyRisk={evaluateResult.sensitiveAggregateResult.privacyRisk}
							recordExpansion={evaluateResult.recordExpansion}
							combinationLoss={
								evaluateResult.preservationByCount.combinationLoss
							}
						/>
					</Stack.Item>
					<Stack.Item>
						<h3>Sensitive data charts</h3>
					</Stack.Item>
					<Stack
						horizontal
						wrap
						styles={chartStackStyles}
						tokens={chartStackTokens}
					>
						<Stack.Item styles={chartStackItemStyles}>
							<MeanCombinationsByLengthChart
								meanLabel="Mean sensitive count by length"
								combinationsCountByLen={
									evaluateResult.sensitiveAggregateResult.combinationsCountByLen
								}
								combinationsSumByLen={
									evaluateResult.sensitiveAggregateResult.combinationsSumByLen
								}
								height={chartHeight}
								width={chartWidth}
							/>
						</Stack.Item>
						<Stack.Item styles={chartStackItemStyles}>
							<RareCombinationsByLengthChart
								combinationsLabel="Combinations by length"
								rareCombinationsLabel="Rare combinations percentages by length"
								combinationsCountByLen={
									evaluateResult.sensitiveAggregateResult.combinationsCountByLen
								}
								rareCombinationsCountByLen={
									evaluateResult.sensitiveAggregateResult
										.rareCombinationsCountByLen
								}
								height={chartHeight}
								width={chartWidth}
							/>
						</Stack.Item>
					</Stack>
					<Stack.Item>
						<h3>Synthetic data charts</h3>
					</Stack.Item>
					<Stack
						horizontal
						wrap
						styles={chartStackStyles}
						tokens={chartStackTokens}
					>
						<Stack.Item styles={chartStackItemStyles}>
							<MeanCombinationsByLengthChart
								meanLabel="Mean synthetic count by length"
								combinationsCountByLen={
									evaluateResult.syntheticAggregateResult.combinationsCountByLen
								}
								combinationsSumByLen={
									evaluateResult.syntheticAggregateResult.combinationsSumByLen
								}
								height={chartHeight}
								width={chartWidth}
							/>
						</Stack.Item>
						<Stack.Item styles={chartStackItemStyles}>
							<RareCombinationsByLengthChart
								combinationsLabel="Combinations by length"
								rareCombinationsLabel="Rare combinations percentages by length"
								combinationsCountByLen={
									evaluateResult.syntheticAggregateResult.combinationsCountByLen
								}
								rareCombinationsCountByLen={
									evaluateResult.syntheticAggregateResult
										.rareCombinationsCountByLen
								}
								height={chartHeight}
								width={chartWidth}
							/>
						</Stack.Item>
						<Stack.Item styles={chartStackItemStyles}>
							<LeakageCountChart
								combinationsLabel="Combinations by length"
								leakageLabel="Leakage count by length"
								combinationsCountByLen={
									evaluateResult.syntheticAggregateResult.combinationsCountByLen
								}
								leakageCountByLen={evaluateResult.leakageCountByLen ?? {}}
								height={chartHeight}
								width={chartWidth}
							/>
						</Stack.Item>
						<Stack.Item styles={chartStackItemStyles}>
							<FabricatedCountChart
								combinationsLabel="Combinations by length"
								fabricatedLabel="Fabricated count by length"
								combinationsCountByLen={
									evaluateResult.syntheticAggregateResult.combinationsCountByLen
								}
								fabricatedCountByLen={evaluateResult.fabricatedCountByLen}
								height={chartHeight}
								width={chartWidth}
							/>
						</Stack.Item>
						<Stack.Item styles={chartStackItemStyles}>
							<PreservationPercentageByLength
								combinationsLabel="Sensitive combinations by length"
								preservationLabel="Preservation percentage by length"
								combinationsCountByLen={
									evaluateResult.sensitiveAggregateResult.combinationsCountByLen
								}
								sensitiveCombinationsCountByLen={
									evaluateResult.sensitiveAggregateResult.combinationsCountByLen
								}
								syntheticCombinationsCountByLen={
									evaluateResult.syntheticAggregateResult.combinationsCountByLen
								}
								height={chartHeight}
								width={chartWidth}
							/>
						</Stack.Item>
						<Stack.Item styles={chartStackItemStyles}>
							<PreservationByCountChart
								meanLengthLabel="Mean length of combinations"
								preservationLabel="Count preservation percentage"
								preservationByCountBuckets={
									evaluateResult.preservationByCount.buckets
								}
								height={chartHeight}
								width={chartWidth}
							/>
						</Stack.Item>
					</Stack>
				</>
			)}
		</Stack>
	)
})
