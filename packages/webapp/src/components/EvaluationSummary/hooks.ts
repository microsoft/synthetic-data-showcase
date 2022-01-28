/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { useCallback, useMemo } from 'react'
import { IPrivacyRiskSummary } from 'sds-wasm'
import { DownloadInfo } from '~components/controls/DownloadButton'

export function useEvaluationSummaryItems(
	privacyRisk: IPrivacyRiskSummary,
	recordExpansion: number,
	combinationLoss: number,
	precision = 2,
): { metric: string; value: string }[] {
	return useMemo(
		() => [
			{
				metric: 'Records containing unique attribute combinations',
				value:
					(privacyRisk.recordsWithUniqueCombinationsProportion * 100)
						.toFixed(precision)
						.toString() + ' %',
			},
			{
				metric: 'Records containing rare attribute combinations',
				value:
					(privacyRisk.recordsWithRareCombinationsProportion * 100)
						.toFixed(precision)
						.toString() + ' %',
			},
			{
				metric: 'Unique attribute combinations',
				value:
					(privacyRisk.uniqueCombinationsProportion * 100)
						.toFixed(precision)
						.toString() + ' %',
			},
			{
				metric: 'Rare attribute combinations',
				value:
					(privacyRisk.rareCombinationsProportion * 100)
						.toFixed(precision)
						.toString() + ' %',
			},
			{
				metric: 'Record expansion',
				value:
					((recordExpansion - 1) * 100).toFixed(precision).toString() + ' %',
			},
			{
				metric: 'Combination loss',
				value: (combinationLoss * 100).toFixed(precision).toString() + ' %',
			},
		],
		[privacyRisk, recordExpansion, combinationLoss, precision],
	)
}

export function useOnGetSummaryDownloadInfo(
	privacyRisk: IPrivacyRiskSummary,
	recordExpansion: number,
	combinationLoss: number,
	delimiter = ',',
	type = 'text/csv',
	alias = 'evaluation_summary.csv',
): () => Promise<DownloadInfo | undefined> {
	return useCallback(async () => {
		let data = `Metric${delimiter}Value\n`

		data += `Percentage of sensitive records containing unique attribute combinations${delimiter}${
			privacyRisk.recordsWithUniqueCombinationsProportion * 100
		}\n`
		data += `Percentage of sensitive records containing rare attribute combinations${delimiter}${
			privacyRisk.recordsWithRareCombinationsProportion * 100
		}\n`
		data += `Percentage of sensitive unique attribute combinations${delimiter}${
			privacyRisk.uniqueCombinationsProportion * 100
		}\n`
		data += `Percentage of sensitive rare attribute combinations${delimiter}${
			privacyRisk.rareCombinationsProportion * 100
		}\n`
		data += `Record expansion${delimiter}${(recordExpansion - 1) * 100}\n`
		data += `Combination loss${delimiter}${combinationLoss * 100}\n`

		return {
			url: URL.createObjectURL(
				new Blob([data], {
					type,
				}),
			),
			alias,
		}
	}, [privacyRisk, recordExpansion, combinationLoss, delimiter, type, alias])
}
