/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { useCallback } from 'react'
import type { IMicrodataStatistics } from 'sds-wasm'

import type { DownloadInfo } from '~components/controls/DownloadButton'
import type { IMicrodataMetricItem } from '~components/MetricsSummaryTable'
import { useMicrodataMetricsItems } from '~components/MetricsSummaryTable'
import type { ISdsManagerInstance } from '~models'
import { useSdsManagerInstance } from '~states'
import type { AggregateType } from '~workers/types'

export function getMetricsSummaryCsv(
	microdataMetricItems: IMicrodataMetricItem[],
	delimiter = ',',
): string {
	return (
		`Metric${delimiter}Value\n` +
		microdataMetricItems
			.map(item => `${item.metric}${delimiter}${item.value}`)
			.join('\n')
	)
}

export function useOnGetMetricsSummaryCsv(
	stats: IMicrodataStatistics | undefined,
	aggregateType: AggregateType,
	delimiter = ',',
): () => string {
	const microdataMetricItems = useMicrodataMetricsItems(stats, aggregateType)

	return useCallback(
		() => getMetricsSummaryCsv(microdataMetricItems, delimiter),
		[microdataMetricItems, delimiter],
	)
}

export function getAnalysisByCountCsv(
	countLabels: number[],
	stats: IMicrodataStatistics | undefined,
	delimiter = ',',
): string {
	let csv = `Bin${delimiter}Mean proportional error${delimiter}Mean length of combinations\n`

	if (stats) {
		csv += countLabels
			.map(
				c =>
					`${c}${delimiter}${
						stats.meanProportionalErrorByBucket[c] ?? 0
					}${delimiter}${stats.meanCombinationLengthByBucket[c] ?? 0}`,
			)
			.join('\n')
	}
	return csv
}

export function useOnGetAnalysisByCountCsv(
	countLabels: number[],
	stats: IMicrodataStatistics | undefined,
	delimiter = ',',
): () => string {
	return useCallback(
		() => getAnalysisByCountCsv(countLabels, stats, delimiter),
		[countLabels, stats, delimiter],
	)
}

export function getAnalysisByLenCsv(
	lenLabels: number[],
	stats: IMicrodataStatistics | undefined,
	delimiter = ',',
): string {
	let csv = `Length${delimiter}Mean combinations count${delimiter}Distinct combinations count${delimiter}Rare combinations count${delimiter}Rare combinations percentage${delimiter}Leakage count${delimiter}Leakage percentage${delimiter}\n`

	if (stats) {
		csv += lenLabels
			.map(
				l =>
					`${l}${delimiter}${
						stats.combinationsCountMeanByLen[l] ?? 0
					}${delimiter}${
						stats.totalNumberOfCombinationsByLen[l] ?? 0
					}${delimiter}${
						stats.numberOfRareCombinationsByLen[l] ?? 0
					}${delimiter}${
						stats.percentageOfRareCombinationsByLen[l] ?? 0
					}${delimiter}${stats.leakageCountByLen[l] ?? 0}${delimiter}${
						stats.leakagePercentageByLen[l] ?? 0
					}`,
			)
			.join('\n')
	}
	return csv
}

export function useOnGetAnalysisByLenCsv(
	lenLabels: number[],
	stats: IMicrodataStatistics | undefined,
	delimiter = ',',
): () => string {
	return useCallback(
		() => getAnalysisByLenCsv(lenLabels, stats, delimiter),
		[lenLabels, stats, delimiter],
	)
}

export async function getAggregatesCsv(
	manager: ISdsManagerInstance | null,
	contextKey: string | undefined,
	aggregateType: AggregateType,
	aggregatesDelimiter = ',',
	combinationDelimiter = ';',
): Promise<string> {
	if (!manager || !contextKey) {
		return ''
	}
	const result = await manager?.instance.getAggregateResult(
		contextKey,
		aggregateType,
		aggregatesDelimiter,
		combinationDelimiter,
	)
	return result?.aggregatesData || ''
}

export function useOnGetAggregatesCsv(
	contextKey: string | undefined,
	aggregateType: AggregateType,
	aggregatesDelimiter = ',',
	combinationDelimiter = ';',
): () => Promise<string> {
	const [manager] = useSdsManagerInstance()

	return useCallback(async () => {
		return getAggregatesCsv(
			manager,
			contextKey,
			aggregateType,
			aggregatesDelimiter,
			combinationDelimiter,
		)
	}, [
		manager,
		contextKey,
		aggregateType,
		aggregatesDelimiter,
		combinationDelimiter,
	])
}

export function useOnGetDownloadInfo(
	getter: (() => Promise<string>) | (() => string),
	alias: string,
	type = 'text/csv',
): () => Promise<DownloadInfo | undefined> {
	return useCallback(async () => {
		let data = getter()

		if (data instanceof Promise) {
			data = await data
		}

		return {
			url: URL.createObjectURL(
				new Blob([data], {
					type,
				}),
			),
			alias,
		}
	}, [getter, type, alias])
}
