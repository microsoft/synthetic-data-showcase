/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { useTheme } from '@fluentui/react'
import { memo } from 'react'
import type { IMicrodataStatistics } from 'sds-wasm'

import { MetricsChart } from '~components/Charts'
import {
	useMetricsByCountLabels,
	useMetricsByLenLabels,
} from '~components/Charts/hooks'
import { DataEvaluationInfoDownloader } from '~components/DataEvaluationInfoDownloader'
import { Flex } from '~components/Flexbox'
import { MetricsSummaryTable } from '~components/MetricsSummaryTable'
import type { IMicrodataMaxStatistics } from '~models'
import type { AggregateType } from '~workers/types'

export interface DataEvaluationInfoProps {
	contextKey: string
	reportingLength: number
	stats: IMicrodataStatistics
	microdataMaxStats: IMicrodataMaxStatistics
	aggregateType: AggregateType
	chartHeight: number
	chartWidth: number
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
	}: DataEvaluationInfoProps) {
		const lenLabels = useMetricsByLenLabels(reportingLength)
		const countLabels = useMetricsByCountLabels(
			stats.meanProportionalErrorByBucket,
		)
		const theme = useTheme()

		return (
			<Flex vertical gap={theme.spacing.s1}>
				<DataEvaluationInfoDownloader
					contextKey={contextKey}
					stats={stats}
					aggregateType={aggregateType}
					reportingLength={reportingLength}
				/>
				<MetricsSummaryTable stats={stats} aggregateType={aggregateType} />
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
				<MetricsChart
					labels={countLabels}
					leftChart={{
						label: 'Mean length of combinations',
						metrics: stats.meanCombinationLengthByBucket,
						type: 'bar',
						max: microdataMaxStats.meanCombinationLengthByBucket,
					}}
					height={chartHeight}
					width={chartWidth}
				/>
				<MetricsChart
					labels={lenLabels}
					leftChart={{
						label: 'Mean combinations count by length',
						metrics: stats.combinationsCountMeanByLen,
						type: 'bar',
						max: microdataMaxStats.combinationsCountMeanByLen,
					}}
					height={chartHeight}
					width={chartWidth}
				/>
				<MetricsChart
					labels={lenLabels}
					leftChart={{
						label: 'Distinct combinations count by length',
						metrics: stats.totalNumberOfCombinationsByLen,
						type: 'bar',
						max: microdataMaxStats.totalNumberOfCombinationsByLen,
					}}
					height={chartHeight}
					width={chartWidth}
				/>
				<MetricsChart
					labels={lenLabels}
					leftChart={{
						label: 'Rare combinations count by length',
						metrics: stats.numberOfRareCombinationsByLen,
						type: 'bar',
						max: microdataMaxStats.numberOfRareCombinationsByLen,
					}}
					height={chartHeight}
					width={chartWidth}
				/>
				<MetricsChart
					labels={lenLabels}
					leftChart={{
						label: 'Rare combinations percentage by length',
						metrics: stats.percentageOfRareCombinationsByLen,
						type: 'bar',
						max: microdataMaxStats.percentageOfRareCombinationsByLen,
					}}
					height={chartHeight}
					width={chartWidth}
				/>
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
			</Flex>
		)
	},
)
