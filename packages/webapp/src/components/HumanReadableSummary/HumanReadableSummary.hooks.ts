/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import type { IEvaluateResult } from '@essex/sds-core'
import { useMemo } from 'react'

import type { ISynthesisInfo } from '~workers/types'
import { SynthesisMode } from '~workers/types'

export function useSensitiveDataPrivacyText(
	evaluateResult: IEvaluateResult,
	synthesisInfo: ISynthesisInfo,
): string {
	return useMemo(() => {
		const uniqueRecordsPercentage =
			+evaluateResult.sensitiveDataStats.percentageOfRecordsWithUniqueCombinations.toFixed(
				2,
			)
		const rareRecordsPercentage = Math.max(
			+(
				evaluateResult.sensitiveDataStats
					.percentageOfRecordsWithRareCombinations - uniqueRecordsPercentage
			).toFixed(2),
			0.0,
		)

		return `For all combinations of up to ${
			synthesisInfo.parameters.reportingLength
		} attributes, ${(uniqueRecordsPercentage + rareRecordsPercentage).toFixed(
			2,
		)}% of records are potentially linkable to data subjects (${uniqueRecordsPercentage.toFixed(
			2,
		)}% uniquely identifiable, ${rareRecordsPercentage.toFixed(
			2,
		)}% linkable to small groups below the specified privacy resolution of ${
			synthesisInfo.parameters.baseSynthesisParameters.resolution
		}).`
	}, [evaluateResult, synthesisInfo])
}

export function useAggregateDataUtilityText(
	evaluateResult: IEvaluateResult,
	synthesisInfo: ISynthesisInfo,
): string {
	return useMemo(() => {
		switch (synthesisInfo.parameters.mode) {
			case SynthesisMode.Unseeded:
			case SynthesisMode.RowSeeded:
			case SynthesisMode.ValueSeeded:
			case SynthesisMode.AggregateSeeded:
				return `For all combinations of up to ${
					synthesisInfo.parameters.reportingLength
				} attributes, ${evaluateResult.aggregateCountsStats.percentageOfSuppressedCombinations.toFixed(
					2,
				)}% are rare and therefore not reported in the aggregate dataset. All released combinations were present in the sensitive dataset and are reported with an average error of ${evaluateResult.aggregateCountsStats.combinationsCountMeanAbsError.toFixed(
					2,
				)}.`

			case SynthesisMode.DP:
				return `For all combinations of up to ${
					synthesisInfo.parameters.reportingLength
				} attributes, ${evaluateResult.aggregateCountsStats.percentageOfSuppressedCombinations.toFixed(
					2,
				)}% were not reported in the aggregate dataset after preserving privacy. The released combinations were reported with an average error of ${evaluateResult.aggregateCountsStats.combinationsCountMeanAbsError.toFixed(
					2,
				)}.`
		}
	}, [evaluateResult, synthesisInfo])
}

export function useSyntheticDataPrivacyText(
	evaluateResult: IEvaluateResult,
	synthesisInfo: ISynthesisInfo,
): string {
	return useMemo(() => {
		const distinctCount = Object.values(
			evaluateResult.sensitiveDataStats.totalNumberOfCombinationsByLen,
		).reduce((prev, curr) => prev + curr, 0)
		const leakagePercentage =
			(Object.values(
				evaluateResult.syntheticDataStats.leakageCountByLen,
			).reduce((prev, curr) => prev + curr, 0) *
				100) /
			distinctCount

		switch (synthesisInfo.parameters.mode) {
			case SynthesisMode.Unseeded:
			case SynthesisMode.RowSeeded:
			case SynthesisMode.ValueSeeded:
				return `For all attribute combinations of any length, none describe groups of data subjects smaller than the privacy resolution (guaranteed by k-anonymity).`

			case SynthesisMode.AggregateSeeded:
				return `For all attribute combinations of up to ${synthesisInfo.parameters.reportingLength} attributes, none describe groups of data subjects smaller than the privacy resolution (guaranteed by k-anonymity).`

			case SynthesisMode.DP:
				return `For all attribute combinations of up to ${
					synthesisInfo.parameters.reportingLength
				} attributes, ${leakagePercentage.toFixed(
					2,
				)}% describe groups of data subjects smaller than the privacy resolution (but protected by differential privacy).`
		}
	}, [evaluateResult, synthesisInfo])
}

export function useSyntheticDataUtilityText(
	evaluateResult: IEvaluateResult,
	synthesisInfo: ISynthesisInfo,
): string {
	return useMemo(() => {
		const retainedCombinationsPercentage =
			100 -
			evaluateResult.syntheticVsAggregateDataStats
				.percentageOfSuppressedCombinations

		switch (synthesisInfo.parameters.mode) {
			case SynthesisMode.Unseeded:
			case SynthesisMode.RowSeeded:
			case SynthesisMode.ValueSeeded:
			case SynthesisMode.AggregateSeeded:
				return `For all attribute combinations of up to ${
					synthesisInfo.parameters.reportingLength
				} attributes, ${retainedCombinationsPercentage.toFixed(
					2,
				)}% of the reported combinations in the aggregate dataset are retained in the synthetic dataset. All released combinations were present in the sensitive dataset and the average error of synthetic counts is ${evaluateResult.syntheticDataStats.combinationsCountMeanAbsError.toFixed(
					2,
				)}.`

			case SynthesisMode.DP:
				return `For all attribute combinations of up to ${
					synthesisInfo.parameters.reportingLength
				} attributes, ${retainedCombinationsPercentage.toFixed(
					2,
				)}% of the reported combinations in the aggregate dataset are retained in the synthetic dataset. The average error of synthetic counts is ${evaluateResult.syntheticDataStats.combinationsCountMeanAbsError.toFixed(
					2,
				)}.`
		}
	}, [evaluateResult, synthesisInfo])
}

export function useHumanReadableSummaryItems(
	evaluateResult: IEvaluateResult,
	synthesisInfo: ISynthesisInfo,
): { name: string; text: string }[] {
	const sensitiveDataPrivacyText = useSensitiveDataPrivacyText(
		evaluateResult,
		synthesisInfo,
	)
	const aggregateDataUtilityText = useAggregateDataUtilityText(
		evaluateResult,
		synthesisInfo,
	)
	const syntheticDataPrivacyText = useSyntheticDataPrivacyText(
		evaluateResult,
		synthesisInfo,
	)
	const syntheticDataUtilityText = useSyntheticDataUtilityText(
		evaluateResult,
		synthesisInfo,
	)

	return useMemo(() => {
		return [
			{
				name: 'Sensitive data privacy',
				text: sensitiveDataPrivacyText,
			},
			{
				name: 'Aggregate data utility',
				text: aggregateDataUtilityText,
			},
			{
				name: 'Synthetic data privacy',
				text: syntheticDataPrivacyText,
			},
			{
				name: 'Synthetic data utility',
				text: syntheticDataUtilityText,
			},
		]
	}, [
		sensitiveDataPrivacyText,
		aggregateDataUtilityText,
		syntheticDataPrivacyText,
		syntheticDataUtilityText,
	])
}
