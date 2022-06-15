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
import type { DownloadInfo } from '~components/controls/DownloadButton'
import {
	getAggregatesCsv,
	getAnalysisByCountCsv,
	getAnalysisByLenCsv,
	getMetricsSummaryCsv,
} from '~components/DataEvaluationInfoDownloader'
import { getMicrodataMetricsItems } from '~components/MetricsSummaryTable'
import type { ISdsManagerInstance } from '~models'
import {
	useAllFinishedSynthesisInfo,
	useGetSyntheticCsvContent,
} from '~pages/Synthesize'
import { useSdsManagerInstance, useSensitiveContentValue } from '~states'
import { AggregateType } from '~workers/types'

async function generateAggregatesCsv(
	manager: ISdsManagerInstance,
	key: string,
): Promise<FileWithPath[]> {
	return [
		new FileWithPath(
			new Blob(
				[await getAggregatesCsv(manager, key, AggregateType.Sensitive)],
				{
					type: 'text/csv',
				},
			),
			`${key}/${AggregateType.Sensitive}_aggregates.csv`,
			`${key}/${AggregateType.Sensitive}_aggregates.csv`,
		),
		new FileWithPath(
			new Blob(
				[await getAggregatesCsv(manager, key, AggregateType.Aggregated)],
				{
					type: 'text/csv',
				},
			),
			`${key}/${AggregateType.Aggregated}_aggregates.csv`,
			`${key}/${AggregateType.Aggregated}_aggregates.csv`,
		),
		new FileWithPath(
			new Blob(
				[await getAggregatesCsv(manager, key, AggregateType.Synthetic)],
				{
					type: 'text/csv',
				},
			),
			`${key}/${AggregateType.Synthetic}_aggregates.csv`,
			`${key}/${AggregateType.Synthetic}_aggregates.csv`,
		),
	]
}

async function generateMetricsSummaryCsv(
	evaluateResult: IEvaluateResult,
	key: string,
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
			`${key}/${AggregateType.Sensitive}_metrics_summary.csv`,
			`${key}/${AggregateType.Sensitive}_metrics_summary.csv`,
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
			`${key}/${AggregateType.Aggregated}_metrics_summary.csv`,
			`${key}/${AggregateType.Aggregated}_metrics_summary.csv`,
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
			`${key}/${AggregateType.Synthetic}_metrics_summary.csv`,
			`${key}/${AggregateType.Synthetic}_metrics_summary.csv`,
		),
	]
}

async function generateAnalysisByCountCsv(
	evaluateResult: IEvaluateResult,
	countLabels: number[],
	key: string,
): Promise<FileWithPath[]> {
	return [
		new FileWithPath(
			new Blob(
				[getAnalysisByCountCsv(countLabels, evaluateResult.sensitiveDataStats)],
				{
					type: 'text/csv',
				},
			),
			`${key}/${AggregateType.Sensitive}_analysis_by_count.csv`,
			`${key}/${AggregateType.Sensitive}_analysis_by_count.csv`,
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
			`${key}/${AggregateType.Aggregated}_analysis_by_count.csv`,
			`${key}/${AggregateType.Aggregated}_analysis_by_count.csv`,
		),
		new FileWithPath(
			new Blob(
				[getAnalysisByCountCsv(countLabels, evaluateResult.syntheticDataStats)],
				{
					type: 'text/csv',
				},
			),
			`${key}/${AggregateType.Synthetic}_analysis_by_count.csv`,
			`${key}/${AggregateType.Synthetic}_analysis_by_count.csv`,
		),
	]
}

async function generateAnalysisByLenCsv(
	evaluateResult: IEvaluateResult,
	lenLabels: number[],
	key: string,
): Promise<FileWithPath[]> {
	return [
		new FileWithPath(
			new Blob(
				[getAnalysisByLenCsv(lenLabels, evaluateResult.sensitiveDataStats)],
				{
					type: 'text/csv',
				},
			),
			`${key}/${AggregateType.Sensitive}_analysis_by_length.csv`,
			`${key}/${AggregateType.Sensitive}_analysis_by_length.csv`,
		),
		new FileWithPath(
			new Blob(
				[getAnalysisByLenCsv(lenLabels, evaluateResult.aggregateCountsStats)],
				{
					type: 'text/csv',
				},
			),
			`${key}/${AggregateType.Aggregated}_analysis_by_length.csv`,
			`${key}/${AggregateType.Aggregated}_analysis_by_length.csv`,
		),
		new FileWithPath(
			new Blob(
				[getAnalysisByLenCsv(lenLabels, evaluateResult.syntheticDataStats)],
				{
					type: 'text/csv',
				},
			),
			`${key}/${AggregateType.Synthetic}_analysis_by_length.csv`,
			`${key}/${AggregateType.Synthetic}_analysis_by_length.csv`,
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

		await collection.add(
			new FileWithPath(
				new Blob([sensitiveContent.table.toCSV({ delimiter })], {
					type: 'text/csv',
				}),
				'sensitive_data.csv',
				'sensitive_data.csv',
			),
		)

		for (const s of allSynthesisInfo) {
			const syntheticContent = await getSyntheticCsvContent(s, false)
			const evaluateResult = await manager?.instance.getEvaluateResult(s.key)
			const countLabels = getMetricsByCountLabels(
				evaluateResult?.sensitiveDataStats.meanProportionalErrorByBucket,
			)
			const lenLabels = getMetricsByLenLabels(evaluateResult?.reportingLength)

			await collection.add(
				new FileWithPath(
					new Blob([syntheticContent.table.toCSV({ delimiter })], {
						type: 'text/csv',
					}),
					`${s.key}/synthetic_data.csv`,
					`${s.key}/synthetic_data.csv`,
				),
			)

			if (evaluateResult && manager) {
				await collection.add([
					...(await generateAggregatesCsv(manager, s.key)),
					...(await generateMetricsSummaryCsv(evaluateResult, s.key)),
					...(await generateAnalysisByCountCsv(
						evaluateResult,
						countLabels,
						s.key,
					)),
					...(await generateAnalysisByLenCsv(evaluateResult, lenLabels, s.key)),
				])
			}
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
