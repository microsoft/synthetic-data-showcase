/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { useMemo } from 'react'
import type { IMicrodataStatistics } from 'sds-wasm'

import { EvaluationStatsType } from '~models'
import { tooltips } from '~ui-tooltips'

export function useMicrodataMetricsItems(
	stats: IMicrodataStatistics | undefined,
	statsType: EvaluationStatsType,
	precision = 2,
	emptyValue = '-',
): { metric: string; tooltip?: JSX.Element; value: string }[] {
	return useMemo(
		() =>
			stats
				? [
						{
							metric: 'Suppressed combinations',
							tooltip: undefined,
							value:
								statsType === EvaluationStatsType.AggregateCounts ||
								statsType === EvaluationStatsType.SyntheticData
									? stats.suppressedCombinationsPercentage
											.toFixed(precision)
											.toString() + ' %'
									: emptyValue,
						},
						{
							metric: 'Fabricated combinations',
							tooltip: undefined,
							value:
								statsType === EvaluationStatsType.AggregateCounts ||
								statsType === EvaluationStatsType.SyntheticData
									? stats.fabricatedCombinationsPercentage
											.toFixed(precision)
											.toString() + ' %'
									: emptyValue,
						},
						...Object.keys(stats.originalMeanCombinationsCountByLen ?? {}).map(
							l => ({
								metric: `${l}-count mean value +/- Mean error`,
								tooltip: undefined,
								value: `${
									stats.originalMeanCombinationsCountByLen[l]
										.toFixed(precision)
										.toString() ?? 0
								} +/- ${
									stats.meanCombinationsCountErrorByLen[l]
										.toFixed(precision)
										.toString() ?? 0
								}`,
							}),
						),
						{
							metric: 'Mean combination count +/- Mean error',
							tooltip: undefined,
							value: `${stats.originalMeanCombinationsCount
								.toFixed(precision)
								.toString()} +/- ${stats.meanCombinationsCountError
								.toFixed(precision)
								.toString()}`,
						},
						{
							metric: 'Record expansion',
							tooltip: tooltips.recordExpansion,
							value:
								statsType === EvaluationStatsType.SyntheticData
									? stats.recordExpansionPercentage
											.toFixed(precision)
											.toString() + ' %'
									: emptyValue,
						},
						{
							metric: 'Mean proportional error',
							tooltip: undefined,
							value:
								statsType === EvaluationStatsType.AggregateCounts ||
								statsType === EvaluationStatsType.SyntheticData
									? stats.meanProportionalError.toFixed(precision).toString()
									: emptyValue,
						},
						{
							metric: 'Records containing unique attribute combinations',
							tooltip: tooltips.recordsWithUniqueCombs,
							value:
								statsType === EvaluationStatsType.SensitiveData
									? stats.recordsWithUniqueCombinationsPercentage
											.toFixed(precision)
											.toString() + ' %'
									: emptyValue,
						},
						{
							metric: 'Records containing rare attribute combinations',
							tooltip: tooltips.recordsWithRareCombs,
							value:
								statsType === EvaluationStatsType.SensitiveData
									? stats.recordsWithRareCombinationsPercentage
											.toFixed(precision)
											.toString() + ' %'
									: emptyValue,
						},
						{
							metric: 'Unique attribute combinations',
							tooltip: tooltips.uniqueCombs,
							value:
								statsType === EvaluationStatsType.SensitiveData
									? stats.uniqueCombinationsPercentage
											.toFixed(precision)
											.toString() + ' %'
									: emptyValue,
						},
						{
							metric: 'Rare attribute combinations',
							tooltip: tooltips.rareCombs,
							value:
								statsType === EvaluationStatsType.SensitiveData
									? stats.rareCombinationsPercentage
											.toFixed(precision)
											.toString() + ' %'
									: emptyValue,
						},
				  ]
				: [],
		[stats, statsType, precision, emptyValue],
	)
}
