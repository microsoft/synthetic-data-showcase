/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import type { IRecordsCountByColumn } from 'sds-wasm'

export interface ColumnContributionChartProps {
	proportionPerColumn: IRecordsCountByColumn
	label: string
	containerHeight: number | string
	barHeight: number
	onClick?: (column: string) => void
}
