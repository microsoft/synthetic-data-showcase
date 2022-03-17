/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { useMemo } from 'react'
import type { IMicrodataStatistics } from 'sds-wasm'

import { EvaluationStatsType } from '~models'
import { tooltips } from '~ui-tooltips'

export function useMicrodataMetricsItems(
	stats: Partial<IMicrodataStatistics>,
	statsType: EvaluationStatsType,
	precision = 2,
): { metric: string; tooltip?: JSX.Element; value: string }[] {
	return useMemo(
		() => [
			{
				metric: 'Suppressed combinations',
				tooltip: undefined,
				value:
					stats.suppressedCombinationsPercentage !== undefined &&
					(statsType === EvaluationStatsType.AggregateCounts ||
						statsType === EvaluationStatsType.SyntheticData)
						? stats.suppressedCombinationsPercentage
								.toFixed(precision)
								.toString() + ' %'
						: '-',
			},
			{
				metric: 'Fabricated combinations',
				tooltip: undefined,
				value:
					stats.fabricatedCombinationsPercentage !== undefined &&
					(statsType === EvaluationStatsType.AggregateCounts ||
						statsType === EvaluationStatsType.SyntheticData)
						? stats.fabricatedCombinationsPercentage
								.toFixed(precision)
								.toString() + ' %'
						: '-',
			},
			...Object.keys(stats.originalMeanCombinationsCountByLen ?? {}).map(l => ({
				metric: `${l}-count mean value +/- Mean error`,
				tooltip: undefined,
				value: `${
					stats.originalMeanCombinationsCountByLen?.[l]
						.toFixed(precision)
						.toString() ?? 0
				} +/- ${
					stats.meanCombinationsCountErrorByLen?.[l]
						.toFixed(precision)
						.toString() ?? 0
				}`,
			})),
			{
				metric: 'Mean combination count +/- Mean error',
				tooltip: undefined,
				value:
					stats.meanCombinationsCountError !== undefined &&
					stats.originalMeanCombinationsCount !== undefined
						? `${stats.originalMeanCombinationsCount
								.toFixed(precision)
								.toString()} +/- ${stats.meanCombinationsCountError
								.toFixed(precision)
								.toString()}`
						: '-',
			},
			{
				metric: 'Record expansion',
				tooltip: tooltips.recordExpansion,
				value:
					stats.recordExpansionPercentage !== undefined &&
					statsType === EvaluationStatsType.SyntheticData
						? stats.recordExpansionPercentage.toFixed(precision).toString() +
						  ' %'
						: '-',
			},
			{
				metric: 'Mean proportional error',
				tooltip: undefined,
				value:
					stats.meanProportionalError !== undefined &&
					(statsType === EvaluationStatsType.AggregateCounts ||
						statsType === EvaluationStatsType.SyntheticData)
						? stats.meanProportionalError.toFixed(precision).toString()
						: '-',
			},
			{
				metric: 'Records containing unique attribute combinations',
				tooltip: tooltips.recordsWithUniqueCombs,
				value:
					stats.recordsWithUniqueCombinationsPercentage !== undefined &&
					statsType === EvaluationStatsType.SensitiveData
						? stats.recordsWithUniqueCombinationsPercentage
								.toFixed(precision)
								.toString() + ' %'
						: '-',
			},
			{
				metric: 'Records containing rare attribute combinations',
				tooltip: tooltips.recordsWithRareCombs,
				value:
					stats.recordsWithRareCombinationsPercentage !== undefined &&
					statsType === EvaluationStatsType.SensitiveData
						? stats.recordsWithRareCombinationsPercentage
								.toFixed(precision)
								.toString() + ' %'
						: '-',
			},
			{
				metric: 'Unique attribute combinations',
				tooltip: tooltips.uniqueCombs,
				value:
					stats.uniqueCombinationsPercentage !== undefined &&
					statsType === EvaluationStatsType.SensitiveData
						? stats.uniqueCombinationsPercentage.toFixed(precision).toString() +
						  ' %'
						: '-',
			},
			{
				metric: 'Rare attribute combinations',
				tooltip: tooltips.rareCombs,
				value:
					stats.rareCombinationsPercentage !== undefined &&
					statsType === EvaluationStatsType.SensitiveData
						? stats.rareCombinationsPercentage.toFixed(precision).toString() +
						  ' %'
						: '-',
			},
		],
		[stats, statsType, precision],
	)
}
