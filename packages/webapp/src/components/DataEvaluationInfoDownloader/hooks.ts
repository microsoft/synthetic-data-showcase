/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { useCallback } from 'react'
import type { IMicrodataStatistics } from 'sds-wasm'

import type { DownloadInfo } from '~components/controls/DownloadButton'
import { useMicrodataMetricsItems } from '~components/MetricsSummaryTable'
import type { AggregateType } from '~models'
import { useWasmWorkerValue } from '~states'

export function useOnGetMetricsSummaryCsv(
	stats: IMicrodataStatistics | undefined,
	aggregateType: AggregateType,
	delimiter = ',',
): () => string {
	const microdataMetricItems = useMicrodataMetricsItems(stats, aggregateType)

	return useCallback(
		() =>
			`Metric${delimiter}Value\n` +
			microdataMetricItems
				.map(item => `${item.metric}${delimiter}${item.value}`)
				.join('\n'),
		[microdataMetricItems, delimiter],
	)
}

export function useOnGetAnalysisByCountCsv(
	countLabels: number[],
	stats: IMicrodataStatistics | undefined,
	delimiter = ',',
): () => string {
	return useCallback(() => {
		let csv = `Bin${delimiter}Mean proportional error${delimiter}Mean length of combinations\n`

		if (stats) {
			csv += countLabels
				.map(
					c =>
						`${c}${delimiter}${
							stats.meanProportionalErrorByBucket[c] ?? 0
						}${delimiter}${stats.meanCombinationsLengthByBucket[c] ?? 0}`,
				)
				.join('\n')
		}
		return csv
	}, [countLabels, stats, delimiter])
}

export function useOnGetAnalysisByLenCsv(
	lenLabels: number[],
	stats: IMicrodataStatistics | undefined,
	delimiter = ',',
): () => string {
	return useCallback(() => {
		let csv = `Length${delimiter}Mean combinations count${delimiter}Distinct combinations count${delimiter}Rare combinations count${delimiter}Rare combinations percentage${delimiter}Leakage count${delimiter}Leakage percentage${delimiter}\n`

		if (stats) {
			csv += lenLabels.map(
				l =>
					`${l}${delimiter}${
						stats.meanCombinationsCountByLen[l] ?? 0
					}${delimiter}${
						stats.distinctCombinationsCountByLen[l] ?? 0
					}${delimiter}${stats.rareCombinationsCountByLen[l] ?? 0}${delimiter}${
						stats.rareCombinationsPercentageByLen[l] ?? 0
					}${delimiter}${stats.leakageCountByLen[l] ?? 0}${delimiter}${
						stats.leakagePercentageByLen[l] ?? 0
					}`,
			)
		}
		return csv
	}, [lenLabels, stats, delimiter])
}

export function useOnGetAggregatesCsv(
	contextKey: string | undefined,
	aggregateType: AggregateType,
	aggregatesDelimiter = ',',
	combinationDelimiter = ';',
): () => Promise<string> {
	const worker = useWasmWorkerValue()

	return useCallback(async () => {
		if (!worker || !contextKey) {
			return ''
		}
		const result = await worker?.getAggregateResult(
			contextKey,
			aggregateType,
			aggregatesDelimiter,
			combinationDelimiter,
		)
		return result?.aggregatesData || ''
	}, [worker, contextKey, aggregateType, aggregatesDelimiter, combinationDelimiter])
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
