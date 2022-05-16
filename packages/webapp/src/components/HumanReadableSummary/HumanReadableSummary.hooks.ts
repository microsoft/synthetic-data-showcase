/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { useMemo } from 'react'
import type { IEvaluateResult } from 'sds-wasm'

import type { ISynthesisInfo } from '~workers/types'
import { SynthesisMode } from '~workers/types'

export function useSensitiveDataPrivacyText(
	evaluateResult: IEvaluateResult,
	synthesisInfo: ISynthesisInfo,
): string {
	return useMemo(() => {
		const uniqueAttributeCount =
			evaluateResult.sensitiveDataStats.totalNumberOfCombinationsByLen[1] || 0
		return `The sensitive dataset contains ${uniqueAttributeCount} distinct attributes linked to ${
			synthesisInfo.parameters.csvDataParameters.recordLimit
		} unique data subjects. Its privacy risk has been analysed for all combinations of up to ${
			synthesisInfo.parameters.reportingLength
		} attributes, revealing that ${evaluateResult.sensitiveDataStats.percentageOfRecordsWithUniqueCombinations.toFixed(
			2,
		)}% of data subjects are linked to unique combinations and a further ${evaluateResult.sensitiveDataStats.percentageOfRecordsWithRareCombinations.toFixed(
			2,
		)}% are linked to rare combinations below the specified privacy resolution of ${
			synthesisInfo.parameters.baseSynthesisParameters.resolution
		}.`
	}, [evaluateResult, synthesisInfo])
}

export function useAggregateDataUtilityText(
	evaluateResult: IEvaluateResult,
	synthesisInfo: ISynthesisInfo,
): string {
	return useMemo(() => {
		const distinctCount = Object.values(
			evaluateResult.sensitiveDataStats.totalNumberOfCombinationsByLen,
		).reduce((prev, curr) => prev + curr, 0)

		return (
			`Considering all attribute combinations up to length ${
				synthesisInfo.parameters.reportingLength
			}, the sensitive dataset contains ${distinctCount} distinct combinations. ${evaluateResult.aggregateCountsStats.percentageOfSuppressedCombinations.toFixed(
				2,
			)}% of these combinations are rare and therefore not reported in the aggregate dataset. The average error of released combination counts after preserving privacy is ${evaluateResult.aggregateCountsStats.combinationsCountMeanAbsError.toFixed(
				2,
			)}.` +
			(synthesisInfo.parameters.mode === SynthesisMode.DP
				? ` IMPORTANT: ${evaluateResult.aggregateCountsStats.percentageOfFabricatedCombinations.toFixed(
						2,
				  )}% of combinations were fabricated and do not exist in the sensitive dataset - this protects privacy, but only if the amount of fabrication is NOT disclosed.`
				: ` All of these reported attributes exist in the sensitive dataset - there is zero fabrication of attribute combinations.`)
		)
	}, [evaluateResult, synthesisInfo])
}

export function useSyntheticDataPrivacyText(
	evaluateResult: IEvaluateResult,
	synthesisInfo: ISynthesisInfo,
): string {
	return useMemo(() => {
		const uniqueAttributeCount =
			evaluateResult.syntheticDataStats.totalNumberOfCombinationsByLen[1] || 0
		const distinctCount = Object.values(
			evaluateResult.sensitiveDataStats.totalNumberOfCombinationsByLen,
		).reduce((prev, curr) => prev + curr, 0)
		const leakagePercentage =
			(Object.values(
				evaluateResult.syntheticDataStats.leakageCountByLen,
			).reduce((prev, curr) => prev + curr, 0) *
				100) /
			distinctCount
		const totalNumberOfRecords = Math.round(
			(evaluateResult.syntheticDataStats.recordExpansionPercentage / 100 + 1) *
				synthesisInfo.parameters.csvDataParameters.recordLimit,
		)
		return (
			`The synthetic dataset contains ${uniqueAttributeCount} distinct attributes linked to ${totalNumberOfRecords} "synthetic" individuals who are not actual data subjects in the sensitive dataset. Considering all attribute combinations up to length ${
				synthesisInfo.parameters.reportingLength
			}, ${leakagePercentage.toFixed(
				2,
			)}% describe groups of data subjects smaller than the privacy resolution ` +
			(synthesisInfo.parameters.mode === SynthesisMode.DP
				? '(but protected by differential privacy).'
				: '(guaranteed by k-anonymity).')
		)
	}, [evaluateResult, synthesisInfo])
}

export function useSyntheticDataUtilityText(
	evaluateResult: IEvaluateResult,
	synthesisInfo: ISynthesisInfo,
): string {
	return useMemo(() => {
		const distinctCount = Object.values(
			evaluateResult.syntheticDataStats.totalNumberOfCombinationsByLen,
		).reduce((prev, curr) => prev + curr, 0)
		const retainedCombinationsPercentage =
			100 - evaluateResult.syntheticDataStats.percentageOfSuppressedCombinations
		return `Considering all attribute combinations up to length ${
			synthesisInfo.parameters.reportingLength
		}, the synthetic dataset contains ${distinctCount} distinct combinations, retaining ${retainedCombinationsPercentage.toFixed(
			2,
		)}% of the combinations contained in the sensitive dataset. The average error of counts derived from this synthetic data is ${evaluateResult.syntheticDataStats.combinationsCountMeanAbsError.toFixed(
			2,
		)}.`
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
