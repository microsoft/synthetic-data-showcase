/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { useCallback } from 'react'
import type { IMicrodataStatistics } from 'sds-wasm'

import type { DownloadInfo } from '~components/controls/DownloadButton'
import { EvaluationStatsType } from '~models'
import { useWasmWorkerValue } from '~states'

export function useOnGetMetricsSummaryCsv(
	stats: IMicrodataStatistics | undefined,
	statsType: EvaluationStatsType,
	delimiter = ',',
): () => string {
	return useCallback(() => {
		let data = `Metric${delimiter}Value\n`

		if (
			statsType === EvaluationStatsType.AggregateCounts ||
			statsType === EvaluationStatsType.SyntheticData
		) {
			data += `Suppressed combinations percentage${delimiter}${stats?.suppressedCombinationsPercentage}\n`
		}
		if (
			statsType === EvaluationStatsType.AggregateCounts ||
			statsType === EvaluationStatsType.SyntheticData
		) {
			data += `Fabricated combinations percentage${delimiter}${stats?.fabricatedCombinationsPercentage}\n`
		}
		Object.keys(stats?.originalMeanCombinationsCountByLen ?? {}).forEach(l => {
			data += `${l}-count mean value +/- Mean error${delimiter}${
				stats?.originalMeanCombinationsCountByLen[l] ?? 0
			} +/- ${stats?.meanCombinationsCountErrorByLen[l]}\n`
		})
		data += `Mean combination count +/- Mean error${delimiter}${stats?.originalMeanCombinationsCount} +/- ${stats?.meanCombinationsCountError}\n`
		if (statsType === EvaluationStatsType.SyntheticData) {
			data += `Record expansion percentage${delimiter}${stats?.recordExpansionPercentage}\n`
		}
		if (
			statsType === EvaluationStatsType.AggregateCounts ||
			statsType === EvaluationStatsType.SyntheticData
		) {
			data += `Mean proportional error${delimiter}${stats?.meanProportionalError}\n`
		}
		if (statsType === EvaluationStatsType.SensitiveData) {
			data += `Percentage of records containing unique attribute combinations${delimiter}${stats?.recordsWithUniqueCombinationsPercentage}\n`
		}
		if (statsType === EvaluationStatsType.SensitiveData) {
			data += `Percentage of records containing rare attribute combinations${delimiter}${stats?.recordsWithRareCombinationsPercentage}\n`
		}
		if (statsType === EvaluationStatsType.SensitiveData) {
			data += `Percentage of unique attribute combinations${delimiter}${stats?.uniqueCombinationsPercentage}\n`
		}
		if (statsType === EvaluationStatsType.SensitiveData) {
			data += `Percentage of rare attribute combinations${delimiter}${stats?.rareCombinationsPercentage}\n`
		}

		return data
	}, [stats, statsType, delimiter])
}

export function useOnGetAnalysisByCountCsv(
	countLabels: number[],
	stats: IMicrodataStatistics | undefined,
	delimiter = ',',
): () => string {
	return useCallback(() => {
		let data = `Bin${delimiter}Mean proportional error${delimiter}Mean length of combinations\n`

		countLabels.forEach(c => {
			data += `${c}${delimiter}${
				stats?.meanProportionalErrorByBucket[c] ?? 0
			}${delimiter}${stats?.meanCombinationsLengthByBucket[c] ?? 0}\n`
		})

		return data
	}, [countLabels, stats, delimiter])
}

export function useOnGetAnalysisByLenCsv(
	lenLabels: number[],
	stats: IMicrodataStatistics | undefined,
	delimiter = ',',
): () => string {
	return useCallback(() => {
		let data = `Length${delimiter}Mean combinations count${delimiter}Distinct combinations count${delimiter}Rare combinations count${delimiter}Rare combinations percentage${delimiter}Leakage count${delimiter}Leakage percentage${delimiter}\n`

		lenLabels.forEach(l => {
			data += `${l}${delimiter}${
				stats?.meanCombinationsCountByLen[l] ?? 0
			}${delimiter}${
				stats?.distinctCombinationsCountByLen[l] ?? 0
			}${delimiter}${stats?.rareCombinationsCountByLen[l] ?? 0}${delimiter}${
				stats?.rareCombinationsPercentageByLen[l] ?? 0
			}${delimiter}${stats?.leakageCountByLen[l] ?? 0}${delimiter}${
				stats?.leakagePercentageByLen[l] ?? 0
			}\n`
		})

		return data
	}, [lenLabels, stats, delimiter])
}

export function useOnGetAggregatesCsv(
	statsType: EvaluationStatsType,
	aggregatesDelimiter = ',',
	combinationDelimiter = ';',
): () => Promise<string> {
	const worker = useWasmWorkerValue()

	return useCallback(async () => {
		const result = await worker?.getAggregateResult(
			statsType,
			aggregatesDelimiter,
			combinationDelimiter,
		)
		return result?.aggregatesData || ''
	}, [worker, statsType, aggregatesDelimiter, combinationDelimiter])
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
