/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import {
	FileCollection,
	FileWithPath,
} from '@data-wrangling-components/utilities'
import type { IEvaluateResult } from '@essex/sds-core'
import { useCallback } from 'react'

import {
	getMetricsByCountLabels,
	getMetricsByLenLabels,
} from '~components/Charts/hooks'
import {
	getAggregatesCsv,
	getAnalysisByCountCsv,
	getAnalysisByLenCsv,
	getMetricsSummaryCsv,
} from '~components/DataEvaluationInfoDownloader'
import { getHumanReadableSummaryText } from '~components/HumanReadableSummary'
import { getMicrodataMetricsItems } from '~components/MetricsSummaryTable'
import type { ISdsManagerInstance } from '~models'
import {
	useAllFinishedSynthesisInfo,
	useGetSyntheticCsvContent,
} from '~pages/Synthesize'
import { useSdsManagerInstance, useSensitiveContentValue } from '~states'
import type { ISynthesisInfo } from '~workers/types'
import { AggregateType } from '~workers/types'

import type { DownloadInfo } from '../../components/controls/DownloadButton/DownloadInfo.js'

const ANONYMIZED_PATH = 'anonymized'
const ANONYMIZED_INTERFACE_PATH = 'anonymized/interface'

const SENSITIVE_DATASET_FILES_PATH = 'private/sensitive_dataset_files'
const SENSITIVE_DATASET_ANALYSIS_PATH = 'private/sensitive_dataset_analysis'
const AGGREGATE_DATASET_ANALYSIS_PATH = 'private/aggregate_dataset_analysis'
const SYNTHETIC_DATASET_ANALYSIS_PATH = 'private/synthetic_dataset_analysis'

async function generateAggregatesCsv(
	manager: ISdsManagerInstance,
	key: string,
	path: string,
): Promise<FileWithPath[]> {
	const protectedAggregatesCsv = await getAggregatesCsv(
		manager,
		key,
		AggregateType.Aggregated,
	)

	// eslint-disable-next-line @essex/adjacent-await
	return [
		new FileWithPath(
			new Blob(
				[await getAggregatesCsv(manager, key, AggregateType.Sensitive)],
				{
					type: 'text/csv',
				},
			),
			`${path}/${SENSITIVE_DATASET_FILES_PATH}/${AggregateType.Sensitive}_aggregates.csv`,
			`${path}/${SENSITIVE_DATASET_FILES_PATH}/${AggregateType.Sensitive}_aggregates.csv`,
		),
		new FileWithPath(
			new Blob([protectedAggregatesCsv], {
				type: 'text/csv',
			}),
			`${path}/${ANONYMIZED_PATH}/protected_aggregates.csv`,
			`${path}/${ANONYMIZED_PATH}/protected_aggregates.csv`,
		),
		new FileWithPath(
			new Blob([protectedAggregatesCsv], {
				type: 'text/csv',
			}),
			`${path}/${ANONYMIZED_INTERFACE_PATH}/protected_aggregates.csv`,
			`${path}/${ANONYMIZED_INTERFACE_PATH}/protected_aggregates.csv`,
		),
		new FileWithPath(
			new Blob(
				[await getAggregatesCsv(manager, key, AggregateType.Synthetic)],
				{
					type: 'text/csv',
				},
			),
			`${path}/${ANONYMIZED_PATH}/${AggregateType.Synthetic}_aggregates.csv`,
			`${path}/${ANONYMIZED_PATH}/${AggregateType.Synthetic}_aggregates.csv`,
		),
	]
}

async function generateMetricsSummaryCsv(
	evaluateResult: IEvaluateResult,
	path: string,
): Promise<FileWithPath[]> {
	return [
		new FileWithPath(
			new Blob(
				[
					getMetricsSummaryCsv(
						getMicrodataMetricsItems(
							evaluateResult.sensitiveDataStats,
							AggregateType.Sensitive,
						),
					),
				],
				{
					type: 'text/csv',
				},
			),
			`${path}/${SENSITIVE_DATASET_ANALYSIS_PATH}/${AggregateType.Sensitive}_metrics_summary.csv`,
			`${path}/${SENSITIVE_DATASET_ANALYSIS_PATH}/${AggregateType.Sensitive}_metrics_summary.csv`,
		),
		new FileWithPath(
			new Blob(
				[
					getMetricsSummaryCsv(
						getMicrodataMetricsItems(
							evaluateResult.aggregateCountsStats,
							AggregateType.Aggregated,
						),
					),
				],
				{
					type: 'text/csv',
				},
			),
			`${path}/${AGGREGATE_DATASET_ANALYSIS_PATH}/${AggregateType.Aggregated}_metrics_summary.csv`,
			`${path}/${AGGREGATE_DATASET_ANALYSIS_PATH}/${AggregateType.Aggregated}_metrics_summary.csv`,
		),
		new FileWithPath(
			new Blob(
				[
					getMetricsSummaryCsv(
						getMicrodataMetricsItems(
							evaluateResult.syntheticDataStats,
							AggregateType.Synthetic,
						),
					),
				],
				{
					type: 'text/csv',
				},
			),
			`${path}/${SYNTHETIC_DATASET_ANALYSIS_PATH}/${AggregateType.Synthetic}_metrics_summary.csv`,
			`${path}/${SYNTHETIC_DATASET_ANALYSIS_PATH}/${AggregateType.Synthetic}_metrics_summary.csv`,
		),
	]
}

async function generateAnalysisByCountCsv(
	evaluateResult: IEvaluateResult,
	countLabels: number[],
	path: string,
): Promise<FileWithPath[]> {
	return [
		new FileWithPath(
			new Blob(
				[getAnalysisByCountCsv(countLabels, evaluateResult.sensitiveDataStats)],
				{
					type: 'text/csv',
				},
			),
			`${path}/${SENSITIVE_DATASET_ANALYSIS_PATH}/${AggregateType.Sensitive}_analysis_by_count.csv`,
			`${path}/${SENSITIVE_DATASET_ANALYSIS_PATH}/${AggregateType.Sensitive}_analysis_by_count.csv`,
		),
		new FileWithPath(
			new Blob(
				[
					getAnalysisByCountCsv(
						countLabels,
						evaluateResult.aggregateCountsStats,
					),
				],
				{
					type: 'text/csv',
				},
			),
			`${path}/${AGGREGATE_DATASET_ANALYSIS_PATH}/${AggregateType.Aggregated}_analysis_by_count.csv`,
			`${path}/${AGGREGATE_DATASET_ANALYSIS_PATH}/${AggregateType.Aggregated}_analysis_by_count.csv`,
		),
		new FileWithPath(
			new Blob(
				[getAnalysisByCountCsv(countLabels, evaluateResult.syntheticDataStats)],
				{
					type: 'text/csv',
				},
			),
			`${path}/${SYNTHETIC_DATASET_ANALYSIS_PATH}/${AggregateType.Synthetic}_analysis_by_count.csv`,
			`${path}/${SYNTHETIC_DATASET_ANALYSIS_PATH}/${AggregateType.Synthetic}_analysis_by_count.csv`,
		),
	]
}

async function generateAnalysisByLenCsv(
	evaluateResult: IEvaluateResult,
	lenLabels: number[],
	path: string,
): Promise<FileWithPath[]> {
	return [
		new FileWithPath(
			new Blob(
				[getAnalysisByLenCsv(lenLabels, evaluateResult.sensitiveDataStats)],
				{
					type: 'text/csv',
				},
			),
			`${path}/${SENSITIVE_DATASET_ANALYSIS_PATH}/${AggregateType.Sensitive}_analysis_by_length.csv`,
			`${path}/${SENSITIVE_DATASET_ANALYSIS_PATH}/${AggregateType.Sensitive}_analysis_by_length.csv`,
		),
		new FileWithPath(
			new Blob(
				[getAnalysisByLenCsv(lenLabels, evaluateResult.aggregateCountsStats)],
				{
					type: 'text/csv',
				},
			),
			`${path}/${AGGREGATE_DATASET_ANALYSIS_PATH}/${AggregateType.Aggregated}_analysis_by_length.csv`,
			`${path}/${AGGREGATE_DATASET_ANALYSIS_PATH}/${AggregateType.Aggregated}_analysis_by_length.csv`,
		),
		new FileWithPath(
			new Blob(
				[getAnalysisByLenCsv(lenLabels, evaluateResult.syntheticDataStats)],
				{
					type: 'text/csv',
				},
			),
			`${path}/${SYNTHETIC_DATASET_ANALYSIS_PATH}/${AggregateType.Synthetic}_analysis_by_length.csv`,
			`${path}/${SYNTHETIC_DATASET_ANALYSIS_PATH}/${AggregateType.Synthetic}_analysis_by_length.csv`,
		),
	]
}

async function generateSynthesisInfoJson(
	s: ISynthesisInfo,
	path: string,
): Promise<FileWithPath[]> {
	return [
		new FileWithPath(
			new Blob([JSON.stringify(s, null, 4)], {
				type: 'application/json',
			}),
			`${path}/synthesis_info.json`,
			`${path}/synthesis_info.json`,
		),
	]
}

async function generateSensitiveDataCsv(
	sensitiveData: string,
	path: string,
): Promise<FileWithPath[]> {
	return [
		new FileWithPath(
			new Blob([sensitiveData], {
				type: 'text/csv',
			}),
			`${path}/${SENSITIVE_DATASET_FILES_PATH}/sensitive_data.csv`,
			`${path}/${SENSITIVE_DATASET_FILES_PATH}/sensitive_data.csv`,
		),
	]
}

async function generateSyntheticDataCsv(
	syntheticDataWideFormat: string,
	syntheticDataCondensedFormat: string,
	path: string,
): Promise<FileWithPath[]> {
	return [
		new FileWithPath(
			new Blob([syntheticDataWideFormat], {
				type: 'text/csv',
			}),
			`${path}/${ANONYMIZED_PATH}/synthetic_data_wide_format.csv`,
			`${path}/${ANONYMIZED_PATH}/synthetic_data_wide_format.csv`,
		),
		new FileWithPath(
			new Blob([syntheticDataCondensedFormat], {
				type: 'text/csv',
			}),
			`${path}/${ANONYMIZED_PATH}/synthetic_data_condensed_format.csv`,
			`${path}/${ANONYMIZED_PATH}/synthetic_data_condensed_format.csv`,
		),
		// TODO: also write synthetic_data_long_format both to the anonymized and anonymized/interface
	]
}

export async function generateEvaluationSummaryTxt(
	evaluateResult: IEvaluateResult,
	synthesisInfo: ISynthesisInfo,
	path: string,
): Promise<FileWithPath[]> {
	const evaluationSummary = getHumanReadableSummaryText(
		evaluateResult,
		synthesisInfo,
	)

	return [
		new FileWithPath(
			new Blob([evaluationSummary], {
				type: 'text/plain',
			}),
			`${path}/evaluation_summary.txt`,
			`${path}/evaluation_summary.txt`,
		),
	]
}

/* eslint-disable @essex/adjacent-await */
export function useOnGetAllAssetsDownloadInfo(
	delimiter = ',',
	alias = 'all_assets',
): () => Promise<DownloadInfo | undefined> {
	const [manager] = useSdsManagerInstance()
	const allSynthesisInfo = useAllFinishedSynthesisInfo()
	const sensitiveContent = useSensitiveContentValue()
	const getSyntheticCsvContent = useGetSyntheticCsvContent()

	return useCallback(async () => {
		const collection = new FileCollection()
		let synthesisIndex = 1

		for (const s of allSynthesisInfo) {
			const path = `Synthesis - ${synthesisIndex}`
			const syntheticContentWideFormat = await getSyntheticCsvContent(s, false)
			const syntheticContentCondensedFormat = await getSyntheticCsvContent(
				s,
				true,
			)
			const evaluateResult = await manager?.instance.getEvaluateResult(s.key)
			const countLabels = getMetricsByCountLabels(
				evaluateResult?.sensitiveDataStats.meanProportionalErrorByBucket,
			)
			const lenLabels = getMetricsByLenLabels(evaluateResult?.reportingLength)

			await collection.add([
				...(await generateSynthesisInfoJson(s, path)),
				...(await generateSensitiveDataCsv(
					sensitiveContent.table.toCSV({ delimiter }),
					path,
				)),
				...(await generateSyntheticDataCsv(
					syntheticContentWideFormat.table.toCSV({ delimiter }),
					syntheticContentCondensedFormat.table.toCSV({ delimiter }),
					path,
				)),
			])

			if (evaluateResult && manager) {
				await collection.add([
					...(await generateEvaluationSummaryTxt(evaluateResult, s, path)),
					...(await generateAggregatesCsv(manager, s.key, path)),
					...(await generateMetricsSummaryCsv(evaluateResult, path)),
					...(await generateAnalysisByCountCsv(
						evaluateResult,
						countLabels,
						path,
					)),
					...(await generateAnalysisByLenCsv(evaluateResult, lenLabels, path)),
				])
			}

			synthesisIndex++
		}

		await collection.toZip(alias)

		return undefined
	}, [
		delimiter,
		alias,
		manager,
		allSynthesisInfo,
		sensitiveContent,
		getSyntheticCsvContent,
	])
}
/* eslint-enable @essex/adjacent-await */
