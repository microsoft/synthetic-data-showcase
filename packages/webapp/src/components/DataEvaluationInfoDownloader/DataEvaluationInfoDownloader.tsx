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
import type { EvaluationStatsType } from '~models'

import {
	useOnGetAggregatesCsv,
	useOnGetAnalysisByCountCsv,
	useOnGetAnalysisByLenCsv,
	useOnGetDownloadInfo,
	useOnGetMetricsSummaryCsv,
} from './hooks'

export interface DataEvaluationInfoDownloaderProps {
	reportingLength: number
	stats: IMicrodataStatistics
	statsType: EvaluationStatsType
	stackStyles?: IStackStyles
	stackTokens?: IStackTokens
	stackItemStyles?: IStackStyles
}

export const DataEvaluationInfoDownloader: React.FC<DataEvaluationInfoDownloaderProps> =
	memo(function DataEvaluationInfoDownloader({
		reportingLength,
		stats,
		statsType,
		stackStyles,
		stackTokens,
		stackItemStyles,
	}: DataEvaluationInfoDownloaderProps) {
		const onGetAggregatesDownloadInfo = useOnGetDownloadInfo(
			useOnGetAggregatesCsv(statsType),
			`${statsType}_aggregates.csv`,
		)

		const onGetMetricsSummaryDownloadInfo = useOnGetDownloadInfo(
			useOnGetMetricsSummaryCsv(stats, statsType),
			`${statsType}_metrics_summary.csv`,
		)

		const onGetAnalysisByCountDownloadInfo = useOnGetDownloadInfo(
			useOnGetAnalysisByCountCsv(
				useMetricsByCountLabels(stats.meanProportionalErrorByBucket),
				stats,
			),
			`${statsType}_analysis_by_count.csv`,
		)

		const onGetAnalysisByLenDownloadInfo = useOnGetDownloadInfo(
			useOnGetAnalysisByLenCsv(useMetricsByLenLabels(reportingLength), stats),
			`${statsType}_analysis_by_length.csv`,
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
						label="Aggregates CSV"
						onGetDownloadInfo={onGetAggregatesDownloadInfo}
					/>
				</Stack.Item>
				<Stack.Item styles={stackItemStyles}>
					<DownloadButton
						label="Metrics summary CSV"
						onGetDownloadInfo={onGetMetricsSummaryDownloadInfo}
					/>
				</Stack.Item>
				<Stack.Item styles={stackItemStyles}>
					<DownloadButton
						label="Analysis by count CSV"
						onGetDownloadInfo={onGetAnalysisByCountDownloadInfo}
					/>
				</Stack.Item>
				<Stack.Item styles={stackItemStyles}>
					<DownloadButton
						label="Analysis by length CSV"
						onGetDownloadInfo={onGetAnalysisByLenDownloadInfo}
					/>
				</Stack.Item>
			</Stack>
		)
	})
