/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { useMemo } from 'react'
import type { IEvaluateResult } from 'sds-wasm'

import type { IContextParameters } from '~models'
import { SynthesisMode } from '~models'

export function useSensitiveDataPrivacyText(
	evaluateResult: IEvaluateResult,
	contextParameters: IContextParameters,
): string {
	return useMemo(() => {
		const uniqueAttributeCount =
			evaluateResult.sensitiveDataStats.totalNumberOfCombinationsByLen[1] || 0
		return `The sensitive dataset contains ${uniqueAttributeCount} distinct attributes linked to ${
			contextParameters.recordLimit
		} unique data subjects. Its privacy risk has been analysed for all combinations of up to ${
			contextParameters.reportingLength
		} attributes, revealing that ${evaluateResult.sensitiveDataStats.percentageOfRecordsWithUniqueCombinations.toFixed(
			2,
		)}% of data subjects are linked to unique combinations and a further ${evaluateResult.sensitiveDataStats.percentageOfRecordsWithRareCombinations.toFixed(
			2,
		)}% are linked to rare combinations below the specified privacy resolution of ${
			contextParameters.resolution
		}.`
	}, [evaluateResult, contextParameters])
}

export function useAggregateDataUtilityText(
	evaluateResult: IEvaluateResult,
	contextParameters: IContextParameters,
): string {
	return useMemo(() => {
		const distinctCount = Object.values(
			evaluateResult.sensitiveDataStats.totalNumberOfCombinationsByLen,
		).reduce((prev, curr) => prev + curr, 0)

		return (
			`Considering all attribute combinations up to length ${
				contextParameters.reportingLength
			}, the sensitive dataset contains ${distinctCount} distinct combinations. ${evaluateResult.aggregateCountsStats.percentageOfSuppressedCombinations.toFixed(
				2,
			)}% of these combinations are rare and therefore not reported in the aggregate dataset. The average error of released combination counts after preserving privacy is ${evaluateResult.aggregateCountsStats.combinationsCountMeanAbsError.toFixed(
				2,
			)}.` +
			(contextParameters.synthesisMode === SynthesisMode.DP
				? ` IMPORTANT: ${evaluateResult.aggregateCountsStats.percentageOfFabricatedCombinations.toFixed(
						2,
				  )}% of combinations were fabricated and do not exist in the sensitive dataset - this protects privacy, but only if the amount of fabrication is NOT disclosed.`
				: ` All of these reported attributes exist in the sensitive dataset - there is zero fabrication of attribute combinations.`)
		)
	}, [evaluateResult, contextParameters])
}

export function useSyntheticDataPrivacyText(
	evaluateResult: IEvaluateResult,
	contextParameters: IContextParameters,
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
				contextParameters.recordLimit,
		)
		return (
			`The synthetic dataset contains ${uniqueAttributeCount} distinct attributes linked to ${totalNumberOfRecords} "synthetic" individuals who are not actual data subjects in the sensitive dataset. Considering all attribute combinations up to length ${
				contextParameters.reportingLength
			}, ${leakagePercentage.toFixed(
				2,
			)}% describe groups of data subjects smaller than the privacy resolution ` +
			(contextParameters.synthesisMode === SynthesisMode.DP
				? '(but protected by differential privacy).'
				: '(guaranteed by k-anonymity).')
		)
	}, [evaluateResult, contextParameters])
}

export function useSyntheticDataUtilityText(
	evaluateResult: IEvaluateResult,
	contextParameters: IContextParameters,
): string {
	return useMemo(() => {
		const distinctCount = Object.values(
			evaluateResult.syntheticDataStats.totalNumberOfCombinationsByLen,
		).reduce((prev, curr) => prev + curr, 0)
		const retainedCombinationsPercentage =
			100 - evaluateResult.syntheticDataStats.percentageOfSuppressedCombinations
		return `Considering all attribute combinations up to length ${
			contextParameters.reportingLength
		}, the synthetic dataset contains ${distinctCount} distinct combinations, retaining ${retainedCombinationsPercentage.toFixed(
			2,
		)}% of the combinations contained in the sensitive dataset. The average error of counts derived from this synthetic data is ${evaluateResult.syntheticDataStats.combinationsCountMeanAbsError.toFixed(
			2,
		)}.`
	}, [evaluateResult, contextParameters])
}

export function useHumanReadableSummaryItems(
	evaluateResult: IEvaluateResult,
	contextParameters: IContextParameters,
): { name: string; text: string }[] {
	const sensitiveDataPrivacyText = useSensitiveDataPrivacyText(
		evaluateResult,
		contextParameters,
	)
	const aggregateDataUtilityText = useAggregateDataUtilityText(
		evaluateResult,
		contextParameters,
	)
	const syntheticDataPrivacyText = useSyntheticDataPrivacyText(
		evaluateResult,
		contextParameters,
	)
	const syntheticDataUtilityText = useSyntheticDataUtilityText(
		evaluateResult,
		contextParameters,
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
