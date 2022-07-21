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
	path: string,
): Promise<FileWithPath[]> {
	return [
		new FileWithPath(
			new Blob(
				[await getAggregatesCsv(manager, key, AggregateType.Sensitive)],
				{
					type: 'text/csv',
				},
			),
			`${path}/${AggregateType.Sensitive}_aggregates.csv`,
			`${path}/${AggregateType.Sensitive}_aggregates.csv`,
		),
		new FileWithPath(
			new Blob(
				[await getAggregatesCsv(manager, key, AggregateType.Aggregated)],
				{
					type: 'text/csv',
				},
			),
			`${path}/${AggregateType.Aggregated}_aggregates.csv`,
			`${path}/${AggregateType.Aggregated}_aggregates.csv`,
		),
		new FileWithPath(
			new Blob(
				[await getAggregatesCsv(manager, key, AggregateType.Synthetic)],
				{
					type: 'text/csv',
				},
			),
			`${path}/${AggregateType.Synthetic}_aggregates.csv`,
			`${path}/${AggregateType.Synthetic}_aggregates.csv`,
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
			`${path}/${AggregateType.Sensitive}_metrics_summary.csv`,
			`${path}/${AggregateType.Sensitive}_metrics_summary.csv`,
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
			`${path}/${AggregateType.Aggregated}_metrics_summary.csv`,
			`${path}/${AggregateType.Aggregated}_metrics_summary.csv`,
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
			`${path}/${AggregateType.Synthetic}_metrics_summary.csv`,
			`${path}/${AggregateType.Synthetic}_metrics_summary.csv`,
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
			`${path}/${AggregateType.Sensitive}_analysis_by_count.csv`,
			`${path}/${AggregateType.Sensitive}_analysis_by_count.csv`,
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
			`${path}/${AggregateType.Aggregated}_analysis_by_count.csv`,
			`${path}/${AggregateType.Aggregated}_analysis_by_count.csv`,
		),
		new FileWithPath(
			new Blob(
				[getAnalysisByCountCsv(countLabels, evaluateResult.syntheticDataStats)],
				{
					type: 'text/csv',
				},
			),
			`${path}/${AggregateType.Synthetic}_analysis_by_count.csv`,
			`${path}/${AggregateType.Synthetic}_analysis_by_count.csv`,
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
			`${path}/${AggregateType.Sensitive}_analysis_by_length.csv`,
			`${path}/${AggregateType.Sensitive}_analysis_by_length.csv`,
		),
		new FileWithPath(
			new Blob(
				[getAnalysisByLenCsv(lenLabels, evaluateResult.aggregateCountsStats)],
				{
					type: 'text/csv',
				},
			),
			`${path}/${AggregateType.Aggregated}_analysis_by_length.csv`,
			`${path}/${AggregateType.Aggregated}_analysis_by_length.csv`,
		),
		new FileWithPath(
			new Blob(
				[getAnalysisByLenCsv(lenLabels, evaluateResult.syntheticDataStats)],
				{
					type: 'text/csv',
				},
			),
			`${path}/${AggregateType.Synthetic}_analysis_by_length.csv`,
			`${path}/${AggregateType.Synthetic}_analysis_by_length.csv`,
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

		let synthesisIndex = 1

		for (const s of allSynthesisInfo) {
			const path = `Synthesis - ${synthesisIndex}`
			const syntheticContent = await getSyntheticCsvContent(s, false)
			const evaluateResult = await manager?.instance.getEvaluateResult(s.key)
			const countLabels = getMetricsByCountLabels(
				evaluateResult?.sensitiveDataStats.meanProportionalErrorByBucket,
			)
			const lenLabels = getMetricsByLenLabels(evaluateResult?.reportingLength)

			// TODO: maybe dump this as a JSON file
			await collection.add(
				new FileWithPath(
					new Blob([s.key], {
						type: 'text/plain',
					}),
					`${path}/synthesis_info.txt`,
					`${path}/synthesis_info.txt`,
				),
			)

			await collection.add(
				new FileWithPath(
					new Blob([syntheticContent.table.toCSV({ delimiter })], {
						type: 'text/csv',
					}),
					`${path}/synthetic_data.csv`,
					`${path}/synthetic_data.csv`,
				),
			)

			if (evaluateResult && manager) {
				await collection.add([
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
