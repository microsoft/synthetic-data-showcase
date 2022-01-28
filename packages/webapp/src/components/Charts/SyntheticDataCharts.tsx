/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { IStackStyles, IStackTokens, Stack } from '@fluentui/react'
import { memo } from 'react'
import { IEvaluateResult } from 'sds-wasm'
import {
	useEvaluationMetrics,
	useMetricsByCountLabels,
	useMetricsByLenLabels,
	useOnGetCountPreservationDownloadInfo,
	useOnGetSyntheticAnalysisDownloadInfo,
} from './hooks'
import { MetricsChart } from '~components/Charts'
import { DownloadButton } from '~components/controls/DownloadButton'

export interface SyntheticDataChartsProps {
	evaluateResult: IEvaluateResult
	chartHeight: number
	chartWidth: number
	chartStackStyles?: IStackStyles
	chartStackTokens?: IStackTokens
	chartStackItemStyles?: IStackStyles
}

export const SyntheticDataCharts: React.FC<SyntheticDataChartsProps> = memo(
	function SyntheticDataCharts({
		evaluateResult,
		chartHeight,
		chartWidth,
		chartStackStyles,
		chartStackTokens,
		chartStackItemStyles,
	}: SyntheticDataChartsProps) {
		const lenLabels = useMetricsByLenLabels(evaluateResult)
		const countLabels = useMetricsByCountLabels(evaluateResult)
		const evaluationMetrics = useEvaluationMetrics(
			lenLabels,
			countLabels,
			evaluateResult,
		)
		const onGetSyntheticAnalysisDownloadInfo =
			useOnGetSyntheticAnalysisDownloadInfo(lenLabels, evaluationMetrics)
		const onGetCountPreservationDownloadInfo =
			useOnGetCountPreservationDownloadInfo(countLabels, evaluationMetrics)

		return (
			<>
				<Stack horizontal tokens={chartStackTokens}>
					<h3>Synthetic data charts</h3>
					<Stack.Item align="center">
						<DownloadButton
							title="Download synthetic analysis by length CSV"
							label="Analysis by length"
							onGetDownloadInfo={onGetSyntheticAnalysisDownloadInfo}
						/>
					</Stack.Item>
					<Stack.Item align="center">
						<DownloadButton
							title="Download count preservation CSV"
							label="Count preservation"
							onGetDownloadInfo={onGetCountPreservationDownloadInfo}
						/>
					</Stack.Item>
				</Stack>
				<Stack
					horizontal
					wrap
					styles={chartStackStyles}
					tokens={chartStackTokens}
				>
					<Stack.Item styles={chartStackItemStyles}>
						<MetricsChart
							labels={lenLabels}
							leftChart={{
								label: 'Mean synthetic count by length',
								metrics: evaluationMetrics.meanSyntheticCombinationCountByLen,
								type: 'bar',
							}}
							height={chartHeight}
							width={chartWidth}
						/>
					</Stack.Item>
					<Stack.Item styles={chartStackItemStyles}>
						<MetricsChart
							labels={lenLabels}
							leftChart={{
								label: 'Rare combinations percentages by length',
								metrics:
									evaluationMetrics.rareSyntheticCombinationsPercentageByLen,
								type: 'line',
								max: 100,
								drawYAxisOnChartArea: false,
							}}
							rightChart={{
								label: 'Distinct combinations by length',
								metrics:
									evaluationMetrics.numberOfDistinctSyntheticCombinationsByLen,
								type: 'bar',
							}}
							height={chartHeight}
							width={chartWidth}
						/>
					</Stack.Item>
					<Stack.Item styles={chartStackItemStyles}>
						<MetricsChart
							labels={lenLabels}
							leftChart={{
								label: 'Leakage count by length',
								metrics: evaluationMetrics.leakageCountByLen,
								type: 'line',
								max: 100,
								drawYAxisOnChartArea: false,
							}}
							rightChart={{
								label: 'Distinct combinations by length',
								metrics:
									evaluationMetrics.numberOfDistinctSyntheticCombinationsByLen,
								type: 'bar',
							}}
							height={chartHeight}
							width={chartWidth}
						/>
					</Stack.Item>
					<Stack.Item styles={chartStackItemStyles}>
						<MetricsChart
							labels={lenLabels}
							leftChart={{
								label: 'Fabricated count by length',
								metrics: evaluationMetrics.fabricatedCountByLen,
								type: 'line',
								max: 100,
								drawYAxisOnChartArea: false,
							}}
							rightChart={{
								label: 'Distinct combinations by length',
								metrics:
									evaluationMetrics.numberOfDistinctSyntheticCombinationsByLen,
								type: 'bar',
							}}
							height={chartHeight}
							width={chartWidth}
						/>
					</Stack.Item>
					<Stack.Item styles={chartStackItemStyles}>
						<MetricsChart
							labels={lenLabels}
							leftChart={{
								label: 'Preservation percentage by length',
								metrics: evaluationMetrics.preservationPercentageByLen,
								type: 'line',
								max: 100,
								drawYAxisOnChartArea: false,
							}}
							rightChart={{
								label: 'Sensitive distinct combinations by length',
								metrics:
									evaluationMetrics.numberOfDistinctSensitiveCombinationsByLen,
								type: 'bar',
							}}
							height={chartHeight}
							width={chartWidth}
						/>
					</Stack.Item>
					<Stack.Item styles={chartStackItemStyles}>
						<MetricsChart
							labels={countLabels}
							leftChart={{
								label: 'Count preservation percentage',
								metrics: evaluationMetrics.preservationPercentageByCount,
								type: 'line',
								max: 100,
								drawYAxisOnChartArea: false,
							}}
							rightChart={{
								label: 'Mean length of combinations',
								metrics: evaluationMetrics.meanCombinationLengthByCount,
								type: 'bar',
							}}
							height={chartHeight}
							width={chartWidth}
						/>
					</Stack.Item>
				</Stack>
			</>
		)
	},
)
