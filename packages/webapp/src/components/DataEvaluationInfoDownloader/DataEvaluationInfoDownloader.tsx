/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import type { IMicrodataStatistics } from '@essex/sds-core'
import { useTheme } from '@fluentui/react'
import { FlexContainer } from '@sds/components'
import { memo } from 'react'

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
} from './hooks.js'

export interface DataEvaluationInfoDownloaderProps {
	contextKey: string
	reportingLength: number
	stats: IMicrodataStatistics
	aggregateType: AggregateType
}

export const DataEvaluationInfoDownloader: React.FC<DataEvaluationInfoDownloaderProps> =
	memo(function DataEvaluationInfoDownloader({
		contextKey,
		reportingLength,
		stats,
		aggregateType,
	}: DataEvaluationInfoDownloaderProps) {
		const theme = useTheme()

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
			<FlexContainer gap={theme.spacing.s1} justify="space-evenly" wrap>
				<DownloadButton
					label="Aggregates"
					onGetDownloadInfo={onGetAggregatesDownloadInfo}
				/>
				<DownloadButton
					label="Metrics summary"
					onGetDownloadInfo={onGetMetricsSummaryDownloadInfo}
				/>
				<DownloadButton
					label="Analysis by count"
					onGetDownloadInfo={onGetAnalysisByCountDownloadInfo}
				/>
				<DownloadButton
					label="Analysis by length"
					onGetDownloadInfo={onGetAnalysisByLenDownloadInfo}
				/>
			</FlexContainer>
		)
	})
