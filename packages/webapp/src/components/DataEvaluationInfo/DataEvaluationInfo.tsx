/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import type { IStackStyles, IStackTokens } from '@fluentui/react'
import { Stack } from '@fluentui/react'
import { memo } from 'react'
import type { IMicrodataStatistics } from 'sds-wasm'

import { MetricsChart } from '~components/Charts'
import {
	useMetricsByCountLabels,
	useMetricsByLenLabels,
} from '~components/Charts/hooks'
import { DataEvaluationInfoDownloader } from '~components/DataEvaluationInfoDownloader'
import { MetricsSummaryTable } from '~components/MetricsSummaryTable'
import type { AggregateType, IMicrodataMaxStatistics } from '~models'

export interface DataEvaluationInfoProps {
	contextKey: string,
	reportingLength: number
	stats: IMicrodataStatistics
	microdataMaxStats: IMicrodataMaxStatistics
	aggregateType: AggregateType
	chartHeight: number
	chartWidth: number
	stackStyles?: IStackStyles
	stackTokens?: IStackTokens
	stackItemStyles?: IStackStyles
}

export const DataEvaluationInfo: React.FC<DataEvaluationInfoProps> = memo(
	function DataEvaluationInfo({
		contextKey,
		reportingLength,
		stats,
		microdataMaxStats,
		aggregateType,
		chartHeight,
		chartWidth,
		stackStyles,
		stackTokens,
		stackItemStyles,
	}: DataEvaluationInfoProps) {
		const lenLabels = useMetricsByLenLabels(reportingLength)
		const countLabels = useMetricsByCountLabels(
			stats.meanProportionalErrorByBucket,
		)

		return (
			<Stack styles={stackStyles} tokens={stackTokens}>
				<Stack.Item styles={stackItemStyles}>
					<DataEvaluationInfoDownloader
						contextKey={contextKey}
						stats={stats}
						aggregateType={aggregateType}
						reportingLength={reportingLength}
						stackStyles={stackStyles}
						stackTokens={stackTokens}
						stackItemStyles={stackItemStyles}
					/>
				</Stack.Item>
				<Stack.Item styles={stackItemStyles}>
					<MetricsSummaryTable stats={stats} aggregateType={aggregateType} />
				</Stack.Item>
				<Stack.Item styles={stackItemStyles}>
					<MetricsChart
						labels={countLabels}
						leftChart={{
							label: 'Mean proportional error',
							metrics: stats.meanProportionalErrorByBucket,
							type: 'bar',
							max: microdataMaxStats.meanProportionalErrorByBucket,
						}}
						height={chartHeight}
						width={chartWidth}
					/>
				</Stack.Item>
				<Stack.Item styles={stackItemStyles}>
					<MetricsChart
						labels={countLabels}
						leftChart={{
							label: 'Mean length of combinations',
							metrics: stats.meanCombinationsLengthByBucket,
							type: 'bar',
							max: microdataMaxStats.meanCombinationsLengthByBucket,
						}}
						height={chartHeight}
						width={chartWidth}
					/>
				</Stack.Item>
				<Stack.Item styles={stackItemStyles}>
					<MetricsChart
						labels={lenLabels}
						leftChart={{
							label: 'Mean combinations count by length',
							metrics: stats.meanCombinationsCountByLen,
							type: 'bar',
							max: microdataMaxStats.meanCombinationsCountByLen,
						}}
						height={chartHeight}
						width={chartWidth}
					/>
				</Stack.Item>
				<Stack.Item styles={stackItemStyles}>
					<MetricsChart
						labels={lenLabels}
						leftChart={{
							label: 'Distinct combinations count by length',
							metrics: stats.distinctCombinationsCountByLen,
							type: 'bar',
							max: microdataMaxStats.distinctCombinationsCountByLen,
						}}
						height={chartHeight}
						width={chartWidth}
					/>
				</Stack.Item>
				<Stack.Item styles={stackItemStyles}>
					<MetricsChart
						labels={lenLabels}
						leftChart={{
							label: 'Rare combinations count by length',
							metrics: stats.rareCombinationsCountByLen,
							type: 'bar',
							max: microdataMaxStats.rareCombinationsCountByLen,
						}}
						height={chartHeight}
						width={chartWidth}
					/>
				</Stack.Item>
				<Stack.Item styles={stackItemStyles}>
					<MetricsChart
						labels={lenLabels}
						leftChart={{
							label: 'Rare combinations percentage by length',
							metrics: stats.rareCombinationsPercentageByLen,
							type: 'bar',
							max: microdataMaxStats.rareCombinationsPercentageByLen,
						}}
						height={chartHeight}
						width={chartWidth}
					/>
				</Stack.Item>
				<Stack.Item styles={stackItemStyles}>
					<MetricsChart
						labels={lenLabels}
						leftChart={{
							label: 'Leakage count by length',
							metrics: stats.leakageCountByLen,
							type: 'bar',
							max: microdataMaxStats.leakageCountByLen,
						}}
						height={chartHeight}
						width={chartWidth}
					/>
				</Stack.Item>
				<Stack.Item styles={stackItemStyles}>
					<MetricsChart
						labels={lenLabels}
						leftChart={{
							label: 'Leakage percentage by length',
							metrics: stats.leakagePercentageByLen,
							type: 'bar',
							max: microdataMaxStats.leakagePercentageByLen,
						}}
						height={chartHeight}
						width={chartWidth}
					/>
				</Stack.Item>
			</Stack>
		)
	},
)
