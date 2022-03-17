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
import { AggregateType } from '~models'
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
		AggregateType.Sensitive,
	)
	const getReportableSummaryCsv = useOnGetMetricsSummaryCsv(
		evaluateResult?.aggregateCountsStats,
		AggregateType.Reportable,
	)
	const getSyntheticSummaryCsv = useOnGetMetricsSummaryCsv(
		evaluateResult?.syntheticDataStats,
		AggregateType.Synthetic,
	)
	const getSensitiveAnalysisByCount = useOnGetAnalysisByCountCsv(
		countLabels,
		evaluateResult?.sensitiveDataStats,
	)
	const getReportableAnalysisByCount = useOnGetAnalysisByCountCsv(
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
	const getReportableAnalysisByLen = useOnGetAnalysisByLenCsv(
		lenLabels,
		evaluateResult?.aggregateCountsStats,
	)
	const getSyntheticAnalysisByLen = useOnGetAnalysisByLenCsv(
		lenLabels,
		evaluateResult?.syntheticDataStats,
	)
	const getSensitiveAggregatesCsv = useOnGetAggregatesCsv(
		AggregateType.Sensitive,
	)
	const getReportableAggregatesCsv = useOnGetAggregatesCsv(
		AggregateType.Reportable,
	)
	const getSyntheticAggregatesCsv = useOnGetAggregatesCsv(
		AggregateType.Synthetic,
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
				`${AggregateType.Sensitive}_metrics_summary.csv`,
				`${AggregateType.Sensitive}_metrics_summary.csv`,
			),
			new FileWithPath(
				new Blob([getReportableSummaryCsv()], {
					type: 'text/csv',
				}),
				`${AggregateType.Reportable}_metrics_summary.csv`,
				`${AggregateType.Reportable}_metrics_summary.csv`,
			),
			new FileWithPath(
				new Blob([getSyntheticSummaryCsv()], {
					type: 'text/csv',
				}),
				`${AggregateType.Synthetic}_metrics_summary.csv`,
				`${AggregateType.Synthetic}_metrics_summary.csv`,
			),
			new FileWithPath(
				new Blob([getSensitiveAnalysisByCount()], {
					type: 'text/csv',
				}),
				`${AggregateType.Sensitive}_analysis_by_count.csv`,
				`${AggregateType.Sensitive}_analysis_by_count.csv`,
			),
			new FileWithPath(
				new Blob([getReportableAnalysisByCount()], {
					type: 'text/csv',
				}),
				`${AggregateType.Reportable}_analysis_by_count.csv`,
				`${AggregateType.Reportable}_analysis_by_count.csv`,
			),
			new FileWithPath(
				new Blob([getSyntheticAnalysisByCount()], {
					type: 'text/csv',
				}),
				`${AggregateType.Synthetic}_analysis_by_count.csv`,
				`${AggregateType.Synthetic}_analysis_by_count.csv`,
			),
			new FileWithPath(
				new Blob([getSensitiveAnalysisByLen()], {
					type: 'text/csv',
				}),
				`${AggregateType.Sensitive}_analysis_by_length.csv`,
				`${AggregateType.Sensitive}_analysis_by_length.csv`,
			),
			new FileWithPath(
				new Blob([getReportableAnalysisByLen()], {
					type: 'text/csv',
				}),
				`${AggregateType.Reportable}_analysis_by_length.csv`,
				`${AggregateType.Reportable}_analysis_by_length.csv`,
			),
			new FileWithPath(
				new Blob([getSyntheticAnalysisByLen()], {
					type: 'text/csv',
				}),
				`${AggregateType.Synthetic}_analysis_by_length.csv`,
				`${AggregateType.Synthetic}_analysis_by_length.csv`,
			),
			new FileWithPath(
				new Blob([await getSensitiveAggregatesCsv()], {
					type: 'text/csv',
				}),
				`${AggregateType.Sensitive}_aggregates.csv`,
				`${AggregateType.Sensitive}_aggregates.csv`,
			),
			new FileWithPath(
				new Blob([await getReportableAggregatesCsv()], {
					type: 'text/csv',
				}),
				`${AggregateType.Reportable}_aggregates.csv`,
				`${AggregateType.Reportable}_aggregates.csv`,
			),
			new FileWithPath(
				new Blob([await getSyntheticAggregatesCsv()], {
					type: 'text/csv',
				}),
				`${AggregateType.Synthetic}_aggregates.csv`,
				`${AggregateType.Synthetic}_aggregates.csv`,
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
		getReportableSummaryCsv,
		getSyntheticSummaryCsv,
		getSensitiveAnalysisByCount,
		getReportableAnalysisByCount,
		getSyntheticAnalysisByCount,
		getSensitiveAnalysisByLen,
		getReportableAnalysisByLen,
		getSyntheticAnalysisByLen,
		getSensitiveAggregatesCsv,
		getReportableAggregatesCsv,
		getSyntheticAggregatesCsv,
	])
}
