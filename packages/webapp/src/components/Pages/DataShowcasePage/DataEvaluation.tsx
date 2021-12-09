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
import { CsvRecord } from 'src/models/csv'
import {
	FabricatedCountChart,
	LeakageCountChart,
	MeanCombinationsByLengthChart,
	PreservationByCountChart,
	PreservationPercentageByLength,
	RareCombinationsByLengthChart,
} from '~components/Charts'
import { EvaluationSummary } from '~components/EvaluationSummary'
import { defaultEvaluatedResult, defaultNavigateResult } from '~models'
import {
	useIsProcessing,
	useRecordLimitValue,
	useReportingLength,
	useResolutionValue,
	useSensitiveContentValue,
} from '~states'
import {
	useEvaluatedResult,
	useNavigateResultSetter,
	useProcessingProgressSetter,
	useSyntheticContentValue,
	useWasmWorkerValue,
} from '~states/dataShowcaseContext'

export const DataEvaluation: React.FC = memo(function DataEvaluation() {
	const worker = useWasmWorkerValue()
	const recordLimit = useRecordLimitValue()
	const [reportingLength, setReportingLength] = useReportingLength()
	const [isProcessing, setIsProcessing] = useIsProcessing()
	const sensitiveContent = useSensitiveContentValue()
	const syntheticContent = useSyntheticContentValue()
	const [evaluatedResult, setEvaluatedResult] = useEvaluatedResult()
	const setNavigateResult = useNavigateResultSetter()
	const resolution = useResolutionValue()
	const setProcessingProgress = useProcessingProgressSetter()

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
		setEvaluatedResult(defaultEvaluatedResult)
		setNavigateResult(defaultNavigateResult)
		setProcessingProgress(0.0)

		const response = await worker?.evaluate(
			[
				sensitiveContent.headers.map(h => h.name),
				...(sensitiveContent.items as CsvRecord[]),
			],
			[
				syntheticContent.headers.map(h => h.name),
				...(syntheticContent.items as CsvRecord[]),
			],
			sensitiveContent.headers.filter(h => h.use).map(h => h.name),
			sensitiveContent.headers
				.filter(h => h.hasSensitiveZeros)
				.map(h => h.name),
			recordLimit,
			reportingLength,
			resolution,
			p => {
				setProcessingProgress(p)
			},
		)

		setIsProcessing(false)
		if (response) {
			setEvaluatedResult(response)
		}
	}, [
		worker,
		setIsProcessing,
		sensitiveContent,
		syntheticContent,
		recordLimit,
		reportingLength,
		resolution,
		setEvaluatedResult,
		setNavigateResult,
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

			{evaluatedResult.sensitiveAggregatedResult && (
				<>
					<Stack.Item>
						<h3>Summary</h3>
					</Stack.Item>
					{evaluatedResult.sensitiveAggregatedResult.privacyRisk &&
						evaluatedResult.recordExpansion !== undefined &&
						evaluatedResult.combinationLoss !== undefined && (
							<Stack.Item>
								<EvaluationSummary
									privacyRiskLabel="Sensitive privacy risk"
									utilityCostLabel="Synthetic utility cost"
									privacyRisk={
										evaluatedResult.sensitiveAggregatedResult.privacyRisk
									}
									recordExpansion={evaluatedResult.recordExpansion}
									combinationLoss={evaluatedResult.combinationLoss}
								/>
							</Stack.Item>
						)}
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
									evaluatedResult.sensitiveAggregatedResult
										.combinationsCountByLen ?? []
								}
								combinationsSumByLen={
									evaluatedResult.sensitiveAggregatedResult
										.combinationsSumByLen ?? []
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
									evaluatedResult.sensitiveAggregatedResult
										.combinationsCountByLen ?? []
								}
								rareCombinationsCountByLen={
									evaluatedResult.sensitiveAggregatedResult
										.rareCombinationsCountByLen ?? []
								}
								height={chartHeight}
								width={chartWidth}
							/>
						</Stack.Item>
					</Stack>
					{evaluatedResult.syntheticAggregatedResult && (
						<>
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
											evaluatedResult.syntheticAggregatedResult
												.combinationsCountByLen ?? []
										}
										combinationsSumByLen={
											evaluatedResult.syntheticAggregatedResult
												.combinationsSumByLen ?? []
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
											evaluatedResult.syntheticAggregatedResult
												.combinationsCountByLen ?? []
										}
										rareCombinationsCountByLen={
											evaluatedResult.syntheticAggregatedResult
												.rareCombinationsCountByLen ?? []
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
											evaluatedResult.syntheticAggregatedResult
												.combinationsCountByLen ?? []
										}
										leakageCountByLen={evaluatedResult.leakageCountByLen ?? {}}
										height={chartHeight}
										width={chartWidth}
									/>
								</Stack.Item>
								<Stack.Item styles={chartStackItemStyles}>
									<FabricatedCountChart
										combinationsLabel="Combinations by length"
										fabricatedLabel="Fabricated count by length"
										combinationsCountByLen={
											evaluatedResult.syntheticAggregatedResult
												.combinationsCountByLen ?? []
										}
										fabricatedCountByLen={
											evaluatedResult.fabricatedCountByLen ?? {}
										}
										height={chartHeight}
										width={chartWidth}
									/>
								</Stack.Item>
								<Stack.Item styles={chartStackItemStyles}>
									<PreservationPercentageByLength
										combinationsLabel="Sensitive combinations by length"
										preservationLabel="Preservation percentage by length"
										combinationsCountByLen={
											evaluatedResult.sensitiveAggregatedResult
												.combinationsCountByLen ?? []
										}
										sensitiveCombinationsCountByLen={
											evaluatedResult.sensitiveAggregatedResult
												.combinationsCountByLen ?? []
										}
										syntheticCombinationsCountByLen={
											evaluatedResult.syntheticAggregatedResult
												.combinationsCountByLen ?? []
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
											evaluatedResult.preservationByCountBuckets ?? {}
										}
										height={chartHeight}
										width={chartWidth}
									/>
								</Stack.Item>
							</Stack>
						</>
					)}
				</>
			)}
		</Stack>
	)
})
