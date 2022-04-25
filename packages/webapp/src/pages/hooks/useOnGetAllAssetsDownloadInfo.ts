/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import {
	FileCollection,
	FileWithPath,
} from '@data-wrangling-components/utilities'
import { useCallback } from 'react'
import type { IEvaluateResult } from 'sds-wasm'

import {
	getMetricsByCountLabels,
	getMetricsByLenLabels,
} from '../../components/Charts/hooks'
import type { DownloadInfo } from '../../components/controls/DownloadButton'
import {
	getAggregatesCsv,
	getAnalysisByCountCsv,
	getAnalysisByLenCsv,
	getMetricsSummaryCsv,
} from '../../components/DataEvaluationInfoDownloader'
import { getMicrodataMetricsItems } from '../../components/MetricsSummaryTable'
import type { IContextParameters } from '../../models'
import { AggregateType } from '../../models'
import {
	useAllContextsParametersValue,
	useSensitiveContentValue,
	useWasmWorkerValue,
} from '../../states'
import type { SdsWasmWorker } from '../../workers/sds-wasm'
import { useGetSyntheticCsvContent } from '../Synthesize/DataSynthesis/hooks'

async function generateAggregatesCsv(
	worker: SdsWasmWorker,
	c: IContextParameters,
): Promise<FileWithPath[]> {
	return [
		new FileWithPath(
			new Blob(
				[await getAggregatesCsv(worker, c.key, AggregateType.Sensitive)],
				{
					type: 'text/csv',
				},
			),
			`${c.key}/${AggregateType.Sensitive}_aggregates.csv`,
			`${c.key}/${AggregateType.Sensitive}_aggregates.csv`,
		),
		new FileWithPath(
			new Blob(
				[await getAggregatesCsv(worker, c.key, AggregateType.Reportable)],
				{
					type: 'text/csv',
				},
			),
			`${c.key}/${AggregateType.Reportable}_aggregates.csv`,
			`${c.key}/${AggregateType.Reportable}_aggregates.csv`,
		),
		new FileWithPath(
			new Blob(
				[await getAggregatesCsv(worker, c.key, AggregateType.Synthetic)],
				{
					type: 'text/csv',
				},
			),
			`${c.key}/${AggregateType.Synthetic}_aggregates.csv`,
			`${c.key}/${AggregateType.Synthetic}_aggregates.csv`,
		),
	]
}

async function generateMetricsSummaryCsv(
	evaluateResult: IEvaluateResult,
	c: IContextParameters,
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
			`${c.key}/${AggregateType.Sensitive}_metrics_summary.csv`,
			`${c.key}/${AggregateType.Sensitive}_metrics_summary.csv`,
		),
		new FileWithPath(
			new Blob(
				[
					getMetricsSummaryCsv(
						getMicrodataMetricsItems(
							evaluateResult.aggregateCountsStats,
							AggregateType.Reportable,
						),
					),
				],
				{
					type: 'text/csv',
				},
			),
			`${c.key}/${AggregateType.Reportable}_metrics_summary.csv`,
			`${c.key}/${AggregateType.Reportable}_metrics_summary.csv`,
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
			`${c.key}/${AggregateType.Synthetic}_metrics_summary.csv`,
			`${c.key}/${AggregateType.Synthetic}_metrics_summary.csv`,
		),
	]
}

async function generateAnalysisByCountCsv(
	evaluateResult: IEvaluateResult,
	countLabels: number[],
	c: IContextParameters,
): Promise<FileWithPath[]> {
	return [
		new FileWithPath(
			new Blob(
				[getAnalysisByCountCsv(countLabels, evaluateResult.sensitiveDataStats)],
				{
					type: 'text/csv',
				},
			),
			`${c.key}/${AggregateType.Sensitive}_analysis_by_count.csv`,
			`${c.key}/${AggregateType.Sensitive}_analysis_by_count.csv`,
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
			`${c.key}/${AggregateType.Reportable}_analysis_by_count.csv`,
			`${c.key}/${AggregateType.Reportable}_analysis_by_count.csv`,
		),
		new FileWithPath(
			new Blob(
				[getAnalysisByCountCsv(countLabels, evaluateResult.syntheticDataStats)],
				{
					type: 'text/csv',
				},
			),
			`${c.key}/${AggregateType.Synthetic}_analysis_by_count.csv`,
			`${c.key}/${AggregateType.Synthetic}_analysis_by_count.csv`,
		),
	]
}

async function generateAnalysisByLenCsv(
	evaluateResult: IEvaluateResult,
	lenLabels: number[],
	c: IContextParameters,
): Promise<FileWithPath[]> {
	return [
		new FileWithPath(
			new Blob(
				[getAnalysisByLenCsv(lenLabels, evaluateResult.sensitiveDataStats)],
				{
					type: 'text/csv',
				},
			),
			`${c.key}/${AggregateType.Sensitive}_analysis_by_length.csv`,
			`${c.key}/${AggregateType.Sensitive}_analysis_by_length.csv`,
		),
		new FileWithPath(
			new Blob(
				[getAnalysisByLenCsv(lenLabels, evaluateResult.aggregateCountsStats)],
				{
					type: 'text/csv',
				},
			),
			`${c.key}/${AggregateType.Reportable}_analysis_by_length.csv`,
			`${c.key}/${AggregateType.Reportable}_analysis_by_length.csv`,
		),
		new FileWithPath(
			new Blob(
				[getAnalysisByLenCsv(lenLabels, evaluateResult.syntheticDataStats)],
				{
					type: 'text/csv',
				},
			),
			`${c.key}/${AggregateType.Synthetic}_analysis_by_length.csv`,
			`${c.key}/${AggregateType.Synthetic}_analysis_by_length.csv`,
		),
	]
}

/* eslint-disable @essex/adjacent-await */
export function useOnGetAllAssetsDownloadInfo(
	delimiter = ',',
	alias = 'all_assets.zip',
): () => Promise<DownloadInfo | undefined> {
	const worker = useWasmWorkerValue()
	const allContextsParameters = useAllContextsParametersValue()
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

		for (const c of allContextsParameters) {
			const syntheticContent = await getSyntheticCsvContent(c)
			const evaluateResult = await worker?.getEvaluateResult(c.key)
			const countLabels = getMetricsByCountLabels(
				evaluateResult?.sensitiveDataStats.meanProportionalErrorByBucket,
			)
			const lenLabels = getMetricsByLenLabels(evaluateResult?.reportingLength)

			console.log(`lenLabels`, lenLabels)

			await collection.add(
				new FileWithPath(
					new Blob([syntheticContent.table.toCSV({ delimiter })], {
						type: 'text/csv',
					}),
					`${c.key}/synthetic_data.csv`,
					`${c.key}/synthetic_data.csv`,
				),
			)

			if (c.isEvaluated && evaluateResult && worker) {
				await collection.add([
					...(await generateAggregatesCsv(worker, c)),
					...(await generateMetricsSummaryCsv(evaluateResult, c)),
					...(await generateAnalysisByCountCsv(evaluateResult, countLabels, c)),
					...(await generateAnalysisByLenCsv(evaluateResult, lenLabels, c)),
				])
			}
		}

		await collection.toZip(alias)

		return undefined
	}, [
		delimiter,
		alias,
		worker,
		allContextsParameters,
		sensitiveContent,
		getSyntheticCsvContent,
	])
}
/* eslint-enable @essex/adjacent-await */
