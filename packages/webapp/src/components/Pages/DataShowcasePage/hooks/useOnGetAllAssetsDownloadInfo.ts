/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import {
	FileCollection,
	FileWithPath,
} from '@data-wrangling-components/utilities'
import { useCallback } from 'react'
import { useOnGetAggregatesCsv } from './evaluation'
import {
	useEvaluationMetrics,
	useMetricsByCountLabels,
	useMetricsByLenLabels,
	useOnGetCountPreservationCsv,
	useOnGetSensitiveAnalysisCsv,
	useOnGetSyntheticAnalysisCsv,
} from '~components/Charts/hooks'
import { useOnGetSummaryCsv } from '~components/EvaluationSummary/hooks'
import { DownloadInfo } from '~components/controls/DownloadButton'
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
	const getAggregatesCsv = useOnGetAggregatesCsv(delimiter)
	const evaluateResult = useEvaluateResultValue()
	const lenLabels = useMetricsByLenLabels(evaluateResult)
	const countLabels = useMetricsByCountLabels(evaluateResult)
	const evaluationMetrics = useEvaluationMetrics(
		lenLabels,
		countLabels,
		evaluateResult,
	)
	const getSummaryCsv = useOnGetSummaryCsv(
		evaluateResult?.sensitiveAggregateResult.privacyRisk,
		evaluateResult?.recordExpansion,
		evaluateResult?.preservationByCount.combinationLoss,
	)
	const getSensitiveAnalysisCsv = useOnGetSensitiveAnalysisCsv(
		lenLabels,
		evaluationMetrics,
		delimiter,
	)
	const getSyntheticAnalysisCsv = useOnGetSyntheticAnalysisCsv(
		lenLabels,
		evaluationMetrics,
		delimiter,
	)
	const getCountPreservationCsv = useOnGetCountPreservationCsv(
		countLabels,
		evaluationMetrics,
		delimiter,
	)

	return useCallback(async () => {
		const sensitiveCsv = sensitiveContent.table.toCSV({ delimiter })
		const syntheticCsv = syntheticContent.table.toCSV({ delimiter })
		const aggregatesCsv = (await getAggregatesCsv()) ?? ''
		const summaryCsv = getSummaryCsv()
		const sensitiveAnalysisCsv = getSensitiveAnalysisCsv()
		const syntheticAnalysisCsv = getSyntheticAnalysisCsv()
		const countPreservationCsv = getCountPreservationCsv()
		const collection = new FileCollection()

		await collection.add([
			new FileWithPath(
				new Blob([sensitiveCsv], {
					type: 'text/csv',
				}),
				'sensitive_data.csv',
				'sensitive_data.csv',
			),
			new FileWithPath(
				new Blob([syntheticCsv], {
					type: 'text/csv',
				}),
				'synthetic_data.csv',
				'synthetic_data.csv',
			),
			new FileWithPath(
				new Blob([aggregatesCsv], {
					type: 'text/csv',
				}),
				'sensitive_aggregates.csv',
				'sensitive_aggregates.csv',
			),
			new FileWithPath(
				new Blob([summaryCsv], {
					type: 'text/csv',
				}),
				'evaluation_summary.csv',
				'evaluation_summary.csv',
			),
			new FileWithPath(
				new Blob([sensitiveAnalysisCsv], {
					type: 'text/csv',
				}),
				'sensitive_analysis_by_length.csv',
				'sensitive_analysis_by_length.csv',
			),
			new FileWithPath(
				new Blob([syntheticAnalysisCsv], {
					type: 'text/csv',
				}),
				'synthetic_analysis_by_length.csv',
				'synthetic_analysis_by_length.csv',
			),
			new FileWithPath(
				new Blob([countPreservationCsv], {
					type: 'text/csv',
				}),
				'count_preservation.csv',
				'count_preservation.csv',
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
		getAggregatesCsv,
		getSummaryCsv,
		getSensitiveAnalysisCsv,
		getSyntheticAnalysisCsv,
		getCountPreservationCsv,
	])
}
