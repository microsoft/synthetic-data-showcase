/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import type { IColumn, IGroup, IStackTokens } from '@fluentui/react'
import {
	DetailsList,
	DetailsListLayoutMode,
	SelectionMode,
	Stack,
} from '@fluentui/react'
import { memo } from 'react'
import type { IPrivacyRiskSummary } from 'sds-wasm'

import { DownloadButton } from '~components/controls/DownloadButton'
import { InfoTooltip } from '~components/InfoTooltip'

import { useEvaluationSummaryItems, useOnGetSummaryDownloadInfo } from './hooks'

export interface EvaluationSummaryProps {
	privacyRiskLabel: string
	utilityCostLabel: string
	privacyRisk: IPrivacyRiskSummary
	recordExpansion: number
	combinationLoss: number
	chartStackTokens?: IStackTokens
}

export const EvaluationSummary: React.FC<EvaluationSummaryProps> = memo(
	function EvaluationSummary({
		privacyRiskLabel,
		utilityCostLabel,
		privacyRisk,
		recordExpansion,
		combinationLoss,
		chartStackTokens,
	}: EvaluationSummaryProps) {
		const columns: IColumn[] = [
			{
				key: 'metric',
				name: 'Metric',
				fieldName: 'metric',
				isResizable: true,
				minWidth: 200,
				maxWidth: 400,
				onRender: item => (
					<Stack horizontal>
						<Stack.Item align="center">{item.metric}</Stack.Item>
						<Stack.Item align="center">
							<InfoTooltip>{item.tooltip}</InfoTooltip>
						</Stack.Item>
					</Stack>
				),
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
		const items = useEvaluationSummaryItems(
			privacyRisk,
			recordExpansion,
			combinationLoss,
		)
		const onGetSummaryDownloadInfo = useOnGetSummaryDownloadInfo(
			privacyRisk,
			recordExpansion,
			combinationLoss,
		)

		return (
			<>
				<Stack horizontal tokens={chartStackTokens}>
					<h3>Summary</h3>
					<Stack.Item align="center">
						<DownloadButton
							title="Download evaluation summary CSV"
							onGetDownloadInfo={onGetSummaryDownloadInfo}
						/>
					</Stack.Item>
				</Stack>
				<DetailsList
					selectionMode={SelectionMode.none}
					layoutMode={DetailsListLayoutMode.justified}
					columns={columns}
					groups={groups}
					items={items}
				/>
			</>
		)
	},
)
