/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
export interface IAggregatedCombination {
	combination_key: number
	count: number
	length: number
}

export interface IAggregatedCombinations {
	[name: string]: IAggregatedCombination
}

export interface IAggregatedCountByLen {
	[length: number]: number
}

export interface IPrivacyRiskSummary {
	totalNumberOfRecords: number
	totalNumberOfCombinations: number
	recordsWithUniqueCombinationsCount: number
	recordsWithRareCombinationsCount: number
	uniqueCombinationsCount: number
	rareCombinationsCount: number
	recordsWithUniqueCombinationsProportion: number
	recordsWithRareCombinationsProportion: number
	uniqueCombinationsProportion: number
	rareCombinationsProportion: number
}

export interface IAggregatedResult {
	aggregatedCombinations?: IAggregatedCombinations
	rareCombinationsCountByLen?: IAggregatedCountByLen
	combinationsCountByLen?: IAggregatedCountByLen
	combinationsSumByLen?: IAggregatedCountByLen
	privacyRisk?: IPrivacyRiskSummary
}

export const defaultAggregatedResult: IAggregatedResult = {
	aggregatedCombinations: undefined,
	rareCombinationsCountByLen: undefined,
	combinationsCountByLen: undefined,
	combinationsSumByLen: undefined,
	privacyRisk: undefined,
}
