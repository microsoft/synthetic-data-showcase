/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import {
	FileCollection,
	FileWithPath,
} from '@data-wrangling-components/utilities'
import { useCallback } from 'react'

import {
	useMetricsByCountLabels,
	useMetricsByLenLabels,
} from '~components/Charts/hooks'
import type { DownloadInfo } from '~components/controls/DownloadButton'
import {
	useOnGetAggregatesCsv,
	useOnGetAnalysisByCountCsv,
	useOnGetAnalysisByLenCsv,
	useOnGetMetricsSummaryCsv,
} from '~components/DataEvaluationInfoDownloader'
import { EvaluationStatsType } from '~models'
import {
	useEvaluateResultValue,
	useSensitiveContentValue,
	useSyntheticContentValue,
} from '~states'

export function useOnGetAllAssetsDownloadInfo(
	delimiter = ',',
	alias = 'all_assets.zip',
): () => Promise<DownloadInfo | undefined> {
	const sensitiveContent = useSensitiveContentValue()
	const syntheticContent = useSyntheticContentValue()
	const evaluateResult = useEvaluateResultValue()
	const lenLabels = useMetricsByLenLabels(evaluateResult?.reportingLength)
	const countLabels = useMetricsByCountLabels(
		evaluateResult?.sensitiveDataStats.meanProportionalErrorByBucket,
	)
	const getSensitiveSummaryCsv = useOnGetMetricsSummaryCsv(
		evaluateResult?.sensitiveDataStats,
		EvaluationStatsType.SensitiveData,
	)
	const getAggregateCountsSummaryCsv = useOnGetMetricsSummaryCsv(
		evaluateResult?.aggregateCountsStats,
		EvaluationStatsType.AggregateCounts,
	)
	const getSyntheticSummaryCsv = useOnGetMetricsSummaryCsv(
		evaluateResult?.syntheticDataStats,
		EvaluationStatsType.SyntheticData,
	)
	const getSensitiveAnalysisByCount = useOnGetAnalysisByCountCsv(
		countLabels,
		evaluateResult?.sensitiveDataStats,
	)
	const getAggregateCountsAnalysisByCount = useOnGetAnalysisByCountCsv(
		countLabels,
		evaluateResult?.aggregateCountsStats,
	)
	const getSyntheticAnalysisByCount = useOnGetAnalysisByCountCsv(
		countLabels,
		evaluateResult?.syntheticDataStats,
	)
	const getSensitiveAnalysisByLen = useOnGetAnalysisByLenCsv(
		lenLabels,
		evaluateResult?.sensitiveDataStats,
	)
	const getAggregateCountsAnalysisByLen = useOnGetAnalysisByLenCsv(
		lenLabels,
		evaluateResult?.aggregateCountsStats,
	)
	const getSyntheticAnalysisByLen = useOnGetAnalysisByLenCsv(
		lenLabels,
		evaluateResult?.syntheticDataStats,
	)
	const getSensitiveAggregatesCsv = useOnGetAggregatesCsv(
		EvaluationStatsType.SensitiveData,
	)
	const getAggregateCountsAggregatesCsv = useOnGetAggregatesCsv(
		EvaluationStatsType.AggregateCounts,
	)
	const getSyntheticAggregatesCsv = useOnGetAggregatesCsv(
		EvaluationStatsType.SyntheticData,
	)

	return useCallback(async () => {
		const collection = new FileCollection()

		await collection.add([
			new FileWithPath(
				new Blob([sensitiveContent.table.toCSV({ delimiter })], {
					type: 'text/csv',
				}),
				'sensitive_data.csv',
				'sensitive_data.csv',
			),
			new FileWithPath(
				new Blob([syntheticContent.table.toCSV({ delimiter })], {
					type: 'text/csv',
				}),
				'synthetic_data.csv',
				'synthetic_data.csv',
			),

			new FileWithPath(
				new Blob([getSensitiveSummaryCsv()], {
					type: 'text/csv',
				}),
				`${EvaluationStatsType.SensitiveData}_metrics_summary.csv`,
				`${EvaluationStatsType.SensitiveData}_metrics_summary.csv`,
			),
			new FileWithPath(
				new Blob([getAggregateCountsSummaryCsv()], {
					type: 'text/csv',
				}),
				`${EvaluationStatsType.AggregateCounts}_metrics_summary.csv`,
				`${EvaluationStatsType.AggregateCounts}_metrics_summary.csv`,
			),
			new FileWithPath(
				new Blob([getSyntheticSummaryCsv()], {
					type: 'text/csv',
				}),
				`${EvaluationStatsType.SyntheticData}_metrics_summary.csv`,
				`${EvaluationStatsType.SyntheticData}_metrics_summary.csv`,
			),

			new FileWithPath(
				new Blob([getSensitiveAnalysisByCount()], {
					type: 'text/csv',
				}),
				`${EvaluationStatsType.SensitiveData}_analysis_by_count.csv`,
				`${EvaluationStatsType.SensitiveData}_analysis_by_count.csv`,
			),
			new FileWithPath(
				new Blob([getAggregateCountsAnalysisByCount()], {
					type: 'text/csv',
				}),
				`${EvaluationStatsType.AggregateCounts}_analysis_by_count.csv`,
				`${EvaluationStatsType.AggregateCounts}_analysis_by_count.csv`,
			),
			new FileWithPath(
				new Blob([getSyntheticAnalysisByCount()], {
					type: 'text/csv',
				}),
				`${EvaluationStatsType.SyntheticData}_analysis_by_count.csv`,
				`${EvaluationStatsType.SyntheticData}_analysis_by_count.csv`,
			),

			new FileWithPath(
				new Blob([getSensitiveAnalysisByLen()], {
					type: 'text/csv',
				}),
				`${EvaluationStatsType.SensitiveData}_analysis_by_length.csv`,
				`${EvaluationStatsType.SensitiveData}_analysis_by_length.csv`,
			),
			new FileWithPath(
				new Blob([getAggregateCountsAnalysisByLen()], {
					type: 'text/csv',
				}),
				`${EvaluationStatsType.AggregateCounts}_analysis_by_length.csv`,
				`${EvaluationStatsType.AggregateCounts}_analysis_by_length.csv`,
			),
			new FileWithPath(
				new Blob([getSyntheticAnalysisByLen()], {
					type: 'text/csv',
				}),
				`${EvaluationStatsType.SyntheticData}_analysis_by_length.csv`,
				`${EvaluationStatsType.SyntheticData}_analysis_by_length.csv`,
			),

			new FileWithPath(
				new Blob([await getSensitiveAggregatesCsv()], {
					type: 'text/csv',
				}),
				`${EvaluationStatsType.SensitiveData}_aggregates.csv`,
				`${EvaluationStatsType.SensitiveData}_aggregates.csv`,
			),
			new FileWithPath(
				new Blob([await getAggregateCountsAggregatesCsv()], {
					type: 'text/csv',
				}),
				`${EvaluationStatsType.AggregateCounts}_aggregates.csv`,
				`${EvaluationStatsType.AggregateCounts}__aggregates.csv`,
			),
			new FileWithPath(
				new Blob([await getSyntheticAggregatesCsv()], {
					type: 'text/csv',
				}),
				`${EvaluationStatsType.SyntheticData}_aggregates.csv`,
				`${EvaluationStatsType.SyntheticData}_aggregates.csv`,
			),
		])
		// eslint-disable-next-line @essex/adjacent-await
		await collection.toZip(alias)

		return undefined
	}, [
		sensitiveContent,
		syntheticContent,
		delimiter,
		alias,
		getSensitiveSummaryCsv,
		getAggregateCountsSummaryCsv,
		getSyntheticSummaryCsv,
		getSensitiveAnalysisByCount,
		getAggregateCountsAnalysisByCount,
		getSyntheticAnalysisByCount,
		getSensitiveAnalysisByLen,
		getAggregateCountsAnalysisByLen,
		getSyntheticAnalysisByLen,
		getSensitiveAggregatesCsv,
		getAggregateCountsAggregatesCsv,
		getSyntheticAggregatesCsv,
	])
}
