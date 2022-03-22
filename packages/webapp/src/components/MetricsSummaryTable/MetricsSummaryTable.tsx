/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import type { IColumn } from '@fluentui/react'
import {
	DetailsList,
	DetailsListLayoutMode,
	SelectionMode,
	Stack,
} from '@fluentui/react'
import { memo } from 'react'
import type { IMicrodataStatistics } from 'sds-wasm'

import { InfoTooltip } from '~components/InfoTooltip'
import type { AggregateType } from '~models'

import { useMicrodataMetricsItems } from './hooks'

export interface MetricsSummaryTableProps {
	stats: IMicrodataStatistics
	aggregateType: AggregateType
}

export const MetricsSummaryTable: React.FC<MetricsSummaryTableProps> = memo(
	function MetricsSummaryTable({ stats, aggregateType }: MetricsSummaryTableProps) {
		const columns: IColumn[] = [
			{
				key: 'metric',
				name: 'Metric',
				fieldName: 'metric',
				isResizable: true,
				minWidth: 100,
				maxWidth: 350,
				onRender: item => (
					<Stack horizontal>
						<Stack.Item align="center">{item.metric}</Stack.Item>
						{item.tooltip !== undefined && (
							<Stack.Item align="center">
								<InfoTooltip>{item.tooltip}</InfoTooltip>
							</Stack.Item>
						)}
					</Stack>
				),
			},
			{
				key: 'value',
				name: 'Value',
				fieldName: 'value',
				isResizable: true,
				minWidth: 100,
			},
		]
		const items = useMicrodataMetricsItems(stats, aggregateType)

		return (
			<DetailsList
				selectionMode={SelectionMode.none}
				layoutMode={DetailsListLayoutMode.justified}
				columns={columns}
				items={items}
			/>
		)
	},
)
