/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import type { TooltipItem } from 'chart.js'
import type { IRecordsCountByStringKey } from 'sds-wasm'

export interface ColumnContributionChartProps {
	selectedColumn?: string
	proportionPerColumn: IRecordsCountByStringKey
	label: string
	containerHeight: number | string
	barHeight: number
	tooltipFormatter?: (item: TooltipItem<'bar'>) => string
	onClick?: (column: string) => void
}
