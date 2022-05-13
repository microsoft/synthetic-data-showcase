/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import type { IStackStyles, IStackTokens } from '@fluentui/react'
import { Stack } from '@fluentui/react'
import { memo } from 'react'
import type { IMicrodataStatistics } from 'sds-wasm'

import {
	useMetricsByCountLabels,
	useMetricsByLenLabels,
} from '~components/Charts/hooks'
import { DownloadButton } from '~components/controls/DownloadButton'
import type { AggregateType } from '~workers/types'

import {
	useOnGetAggregatesCsv,
	useOnGetAnalysisByCountCsv,
	useOnGetAnalysisByLenCsv,
	useOnGetDownloadInfo,
	useOnGetMetricsSummaryCsv,
} from './hooks'

export interface DataEvaluationInfoDownloaderProps {
	contextKey: string
	reportingLength: number
	stats: IMicrodataStatistics
	aggregateType: AggregateType
	stackStyles?: IStackStyles
	stackTokens?: IStackTokens
	stackItemStyles?: IStackStyles
}

export const DataEvaluationInfoDownloader: React.FC<DataEvaluationInfoDownloaderProps> =
	memo(function DataEvaluationInfoDownloader({
		contextKey,
		reportingLength,
		stats,
		aggregateType,
		stackStyles,
		stackTokens,
		stackItemStyles,
	}: DataEvaluationInfoDownloaderProps) {
		const onGetAggregatesDownloadInfo = useOnGetDownloadInfo(
			useOnGetAggregatesCsv(contextKey, aggregateType),
			`${aggregateType}_aggregates.csv`,
		)

		const onGetMetricsSummaryDownloadInfo = useOnGetDownloadInfo(
			useOnGetMetricsSummaryCsv(stats, aggregateType),
			`${aggregateType}_metrics_summary.csv`,
		)

		const onGetAnalysisByCountDownloadInfo = useOnGetDownloadInfo(
			useOnGetAnalysisByCountCsv(
				useMetricsByCountLabels(stats.meanProportionalErrorByBucket),
				stats,
			),
			`${aggregateType}_analysis_by_count.csv`,
		)

		const onGetAnalysisByLenDownloadInfo = useOnGetDownloadInfo(
			useOnGetAnalysisByLenCsv(useMetricsByLenLabels(reportingLength), stats),
			`${aggregateType}_analysis_by_length.csv`,
		)

		return (
			<Stack
				horizontal
				horizontalAlign={'center'}
				styles={stackStyles}
				tokens={stackTokens}
			>
				<Stack.Item styles={stackItemStyles}>
					<DownloadButton
						label="Aggregates"
						onGetDownloadInfo={onGetAggregatesDownloadInfo}
					/>
				</Stack.Item>
				<Stack.Item styles={stackItemStyles}>
					<DownloadButton
						label="Metrics summary"
						onGetDownloadInfo={onGetMetricsSummaryDownloadInfo}
					/>
				</Stack.Item>
				<Stack.Item styles={stackItemStyles}>
					<DownloadButton
						label="Analysis by count"
						onGetDownloadInfo={onGetAnalysisByCountDownloadInfo}
					/>
				</Stack.Item>
				<Stack.Item styles={stackItemStyles}>
					<DownloadButton
						label="Analysis by length"
						onGetDownloadInfo={onGetAnalysisByLenDownloadInfo}
					/>
				</Stack.Item>
			</Stack>
		)
	})
