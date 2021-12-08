/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import {
	DetailsList,
	DetailsListLayoutMode,
	IColumn,
	IGroup,
	SelectionMode,
} from '@fluentui/react'
import { memo } from 'react'
import { IPrivacyRiskSummary } from '~models'

export interface EvaluationSummaryProps {
	privacyRiskLabel: string
	utilityCostLabel: string
	privacyRisk: IPrivacyRiskSummary
	recordExpansion: number
	combinationLoss: number
}

export const EvaluationSummary: React.FC<EvaluationSummaryProps> = memo(
	function EvaluationSummary({
		privacyRiskLabel,
		utilityCostLabel,
		privacyRisk,
		recordExpansion,
		combinationLoss,
	}: EvaluationSummaryProps) {
		const precision = 2
		const columns: IColumn[] = [
			{
				key: 'metric',
				name: 'Metric',
				fieldName: 'metric',
				isResizable: true,
				minWidth: 200,
				maxWidth: 400,
			},
			{
				key: 'value',
				name: 'Value',
				fieldName: 'value',
				isResizable: true,
				minWidth: 200,
				maxWidth: 400,
			},
		]
		const groups: IGroup[] = [
			{
				key: 'privacyRisk',
				name: privacyRiskLabel,
				startIndex: 0,
				count: 4,
				level: 0,
			},
			{
				key: 'utilityCost',
				name: utilityCostLabel,
				startIndex: 4,
				count: 2,
				level: 0,
			},
		]
		const items = [
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
		]

		return (
			<DetailsList
				selectionMode={SelectionMode.none}
				layoutMode={DetailsListLayoutMode.justified}
				columns={columns}
				groups={groups}
				items={items}
			/>
		)
	},
)
