/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import type { TooltipItem } from 'chart.js'
import type { IRecordsCountByColumn } from 'sds-wasm'

export interface ColumnContributionChartProps {
	proportionPerColumn: IRecordsCountByColumn
	label: string
	containerHeight: number | string
	barHeight: number
	tooltipFormatter?: (item: TooltipItem<'bar'>) => string
	onClick?: (column: string) => void
}
