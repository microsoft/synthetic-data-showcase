/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { memo, useMemo } from 'react'
import { Bar } from 'react-chartjs-2'
import { IAggregateCountByLen } from 'sds-wasm'

export interface FabricatedCountChartProps {
	combinationsLabel: string
	fabricatedLabel: string
	combinationsCountByLen: IAggregateCountByLen
	fabricatedCountByLen: IAggregateCountByLen
	height: number
	width: number
}

export const FabricatedCountChart: React.FC<FabricatedCountChartProps> = memo(
	function FabricatedCountChart({
		combinationsLabel,
		fabricatedLabel,
		combinationsCountByLen,
		fabricatedCountByLen,
		height,
		width,
	}: FabricatedCountChartProps) {
		const labels = useMemo(
			() => Object.keys(combinationsCountByLen).sort(),
			[combinationsCountByLen],
		)

		return (
			<Bar
				height={height}
				width={width}
				data={{
					labels: labels,
					datasets: [
						{
							label: fabricatedLabel,
							type: 'line',
							data: labels.map(l => fabricatedCountByLen[l] ?? 0),
							// eslint-disable-next-line @typescript-eslint/no-explicit-any
						} as any,
						{
							label: combinationsLabel,
							data: labels.map(l => combinationsCountByLen[l] ?? 0),
						},
					],
				}}
				options={{
					responsive: false,
					maintainAspectRatio: false,
				}}
			/>
		)
	},
)
