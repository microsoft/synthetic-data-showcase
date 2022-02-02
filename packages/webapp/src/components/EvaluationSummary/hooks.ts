/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { useCallback, useMemo } from 'react'
import { IPrivacyRiskSummary } from 'sds-wasm'
import { DownloadInfo } from '~components/controls/DownloadButton'
import { tooltips } from '~ui-tooltips'

export function useEvaluationSummaryItems(
	privacyRisk: IPrivacyRiskSummary,
	recordExpansion: number,
	combinationLoss: number,
	precision = 2,
): { metric: string; tooltip: JSX.Element; value: string }[] {
	return useMemo(
		() => [
			{
				metric: 'Records containing unique attribute combinations',
				tooltip: tooltips.recordsWithUniqueCombs,
				value:
					(privacyRisk.recordsWithUniqueCombinationsProportion * 100)
						.toFixed(precision)
						.toString() + ' %',
			},
			{
				metric: 'Records containing rare attribute combinations',
				tooltip: tooltips.recordsWithRareCombs,
				value:
					(privacyRisk.recordsWithRareCombinationsProportion * 100)
						.toFixed(precision)
						.toString() + ' %',
			},
			{
				metric: 'Unique attribute combinations',
				tooltip: tooltips.uniqueCombs,
				value:
					(privacyRisk.uniqueCombinationsProportion * 100)
						.toFixed(precision)
						.toString() + ' %',
			},
			{
				metric: 'Rare attribute combinations',
				tooltip: tooltips.rareCombs,
				value:
					(privacyRisk.rareCombinationsProportion * 100)
						.toFixed(precision)
						.toString() + ' %',
			},
			{
				metric: 'Record expansion',
				tooltip: tooltips.recordExpansion,
				value:
					((recordExpansion - 1) * 100).toFixed(precision).toString() + ' %',
			},
			{
				metric: 'Combination loss',
				tooltip: tooltips.combinationLoss,
				value: (combinationLoss * 100).toFixed(precision).toString() + ' %',
			},
		],
		[privacyRisk, recordExpansion, combinationLoss, precision],
	)
}

export function useOnGetSummaryCsv(
	privacyRisk?: IPrivacyRiskSummary,
	recordExpansion?: number,
	combinationLoss?: number,
	delimiter = ',',
): () => string {
	return useCallback(() => {
		let data = `Metric${delimiter}Value\n`

		if (privacyRisk !== undefined) {
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
		}
		if (recordExpansion !== undefined) {
			data += `Record expansion${delimiter}${(recordExpansion - 1) * 100}\n`
		}
		if (combinationLoss !== undefined) {
			data += `Combination loss${delimiter}${combinationLoss * 100}\n`
		}

		return data
	}, [privacyRisk, recordExpansion, combinationLoss, delimiter])
}

export function useOnGetSummaryDownloadInfo(
	privacyRisk: IPrivacyRiskSummary,
	recordExpansion: number,
	combinationLoss: number,
	delimiter = ',',
	type = 'text/csv',
	alias = 'evaluation_summary.csv',
): () => Promise<DownloadInfo | undefined> {
	const getSummaryCsv = useOnGetSummaryCsv(
		privacyRisk,
		recordExpansion,
		combinationLoss,
		delimiter,
	)

	return useCallback(async () => {
		const data = getSummaryCsv()

		return {
			url: URL.createObjectURL(
				new Blob([data], {
					type,
				}),
			),
			alias,
		}
	}, [getSummaryCsv, type, alias])
}
