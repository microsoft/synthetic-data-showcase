/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { useMemo } from 'react'
import type { IMicrodataStatistics } from 'sds-wasm'

import { AggregateType } from '~models'
import { tooltips } from '~ui-tooltips'

export function useMicrodataMetricsItems(
	stats: IMicrodataStatistics | undefined,
	aggregateType: AggregateType,
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
								aggregateType === AggregateType.Reportable ||
								aggregateType === AggregateType.Synthetic
									? stats.suppressedCombinationsPercentage
											.toFixed(precision)
											.toString() + ' %'
									: emptyValue,
						},
						{
							metric: 'Fabricated combinations',
							tooltip: undefined,
							value:
								aggregateType === AggregateType.Reportable ||
								aggregateType === AggregateType.Synthetic
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
								aggregateType === AggregateType.Synthetic
									? stats.recordExpansionPercentage
											.toFixed(precision)
											.toString() + ' %'
									: emptyValue,
						},
						{
							metric: 'Mean proportional error',
							tooltip: undefined,
							value:
								aggregateType === AggregateType.Reportable ||
								aggregateType === AggregateType.Synthetic
									? stats.meanProportionalError.toFixed(precision).toString()
									: emptyValue,
						},
						{
							metric: 'Records containing unique attribute combinations',
							tooltip: tooltips.recordsWithUniqueCombs,
							value:
								aggregateType === AggregateType.Sensitive
									? stats.recordsWithUniqueCombinationsPercentage
											.toFixed(precision)
											.toString() + ' %'
									: emptyValue,
						},
						{
							metric: 'Records containing rare attribute combinations',
							tooltip: tooltips.recordsWithRareCombs,
							value:
								aggregateType === AggregateType.Sensitive
									? stats.recordsWithRareCombinationsPercentage
											.toFixed(precision)
											.toString() + ' %'
									: emptyValue,
						},
						{
							metric: 'Unique attribute combinations',
							tooltip: tooltips.uniqueCombs,
							value:
								aggregateType === AggregateType.Sensitive
									? stats.uniqueCombinationsPercentage
											.toFixed(precision)
											.toString() + ' %'
									: emptyValue,
						},
						{
							metric: 'Rare attribute combinations',
							tooltip: tooltips.rareCombs,
							value:
								aggregateType === AggregateType.Sensitive
									? stats.rareCombinationsPercentage
											.toFixed(precision)
											.toString() + ' %'
									: emptyValue,
						},
				  ]
				: [],
		[stats, aggregateType, precision, emptyValue],
	)
}
