/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import type { IMicrodataStatistics } from '@essex/sds-core'
import { useMemo } from 'react'

import { tooltips } from '~ui-tooltips'
import { AggregateType } from '~workers/types'

export interface IMicrodataMetricItem {
	metric: string
	tooltip?: JSX.Element
	value: string
}

export function getMicrodataMetricsItems(
	stats: IMicrodataStatistics | undefined,
	aggregateType: AggregateType,
	precision = 2,
	emptyValue = '-',
): IMicrodataMetricItem[] {
	if (stats) {
		return [
			{
				metric: 'Suppressed combinations',
				tooltip: tooltips.suppressedCombinations,
				value:
					aggregateType === AggregateType.Aggregated ||
					aggregateType === AggregateType.Synthetic
						? stats.percentageOfSuppressedCombinations
								.toFixed(precision)
								.toString() + ' %'
						: emptyValue,
			},
			{
				metric: 'Fabricated combinations',
				tooltip: tooltips.fabricatedCombinations,
				value:
					aggregateType === AggregateType.Aggregated ||
					aggregateType === AggregateType.Synthetic
						? stats.percentageOfFabricatedCombinations
								.toFixed(precision)
								.toString() + ' %'
						: emptyValue,
			},
			...Object.keys(stats.originalCombinationsCountMeanByLen ?? {}).map(l => ({
				metric: `${l}-count mean value +/- Mean error`,
				tooltip: tooltips.nCountMeanAndError,
				value: `${
					stats.originalCombinationsCountMeanByLen[l]
						?.toFixed(precision)
						?.toString() ?? 0
				} +/- ${
					stats.combinationsCountMeanAbsErrorByLen[l]
						?.toFixed(precision)
						?.toString() ?? 0
				}`,
			})),
			{
				metric: 'Mean combination count +/- Mean error',
				tooltip: tooltips.countMeanAndError,
				value: `${stats.originalCombinationsCountMean
					.toFixed(precision)
					.toString()} +/- ${stats.combinationsCountMeanAbsError
					.toFixed(precision)
					.toString()}`,
			},
			{
				metric: 'Record expansion',
				tooltip: tooltips.recordExpansion,
				value:
					aggregateType === AggregateType.Synthetic
						? stats.recordExpansionPercentage.toFixed(precision).toString() +
						  ' %'
						: emptyValue,
			},
			{
				metric: 'Mean proportional error',
				tooltip: tooltips.meanProportionalError,
				value:
					aggregateType === AggregateType.Aggregated ||
					aggregateType === AggregateType.Synthetic
						? stats.meanProportionalError.toFixed(precision).toString()
						: emptyValue,
			},
			{
				metric: 'Records containing unique attribute combinations',
				tooltip: tooltips.recordsWithUniqueCombs,
				value:
					aggregateType === AggregateType.Sensitive
						? stats.percentageOfRecordsWithUniqueCombinations
								.toFixed(precision)
								.toString() + ' %'
						: emptyValue,
			},
			{
				metric: 'Records containing rare attribute combinations',
				tooltip: tooltips.recordsWithRareCombs,
				value:
					aggregateType === AggregateType.Sensitive
						? stats.percentageOfRecordsWithRareCombinations
								.toFixed(precision)
								.toString() + ' %'
						: emptyValue,
			},
			{
				metric: 'Unique attribute combinations',
				tooltip: tooltips.uniqueCombs,
				value:
					aggregateType === AggregateType.Sensitive
						? stats.percentageOfUniqueCombinations
								.toFixed(precision)
								.toString() + ' %'
						: emptyValue,
			},
			{
				metric: 'Rare attribute combinations',
				tooltip: tooltips.rareCombs,
				value:
					aggregateType === AggregateType.Sensitive
						? stats.percentageOfRareCombinations.toFixed(precision).toString() +
						  ' %'
						: emptyValue,
			},
		]
	}
	return []
}

export function useMicrodataMetricsItems(
	stats: IMicrodataStatistics | undefined,
	aggregateType: AggregateType,
	precision = 2,
	emptyValue = '-',
): { metric: string; tooltip?: JSX.Element; value: string }[] {
	return useMemo(
		() => getMicrodataMetricsItems(stats, aggregateType, precision, emptyValue),
		[stats, aggregateType, precision, emptyValue],
	)
}
