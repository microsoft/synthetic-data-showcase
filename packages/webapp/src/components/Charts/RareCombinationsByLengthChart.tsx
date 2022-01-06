/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { memo } from 'react'
import { Bar } from 'react-chartjs-2'
import { IAggregateCountByLen } from 'sds-wasm'

export interface RareCombinationsByLengthChartProps {
	combinationsLabel: string
	rareCombinationsLabel: string
	combinationsCountByLen: IAggregateCountByLen
	rareCombinationsCountByLen: IAggregateCountByLen
	height: number
	width: number
}

export const RareCombinationsByLengthChart: React.FC<RareCombinationsByLengthChartProps> =
	memo(function RareCombinationsByLengthChart({
		combinationsLabel,
		rareCombinationsLabel,
		combinationsCountByLen,
		rareCombinationsCountByLen,
		height,
		width,
	}: RareCombinationsByLengthChartProps) {
		const labels = Object.keys(combinationsCountByLen).sort()

		return (
			<Bar
				height={height}
				width={width}
				data={{
					labels: labels,
					datasets: [
						{
							label: rareCombinationsLabel,
							type: 'line',
							data: labels.map(
								l =>
									((rareCombinationsCountByLen[l] ?? 0) * 100) /
									(combinationsCountByLen[l] ?? 1),
							),
							yAxisID: 'yRareAxis',
							// eslint-disable-next-line @typescript-eslint/no-explicit-any
						} as any,
						{
							label: combinationsLabel,
							data: labels.map(l => combinationsCountByLen[l] ?? 0),
							yAxisID: 'yCombinationsAxis',
						},
					],
				}}
				options={{
					responsive: false,
					maintainAspectRatio: false,
					scales: {
						yCombinationsAxis: {
							type: 'linear',
							display: true,
							position: 'left',
						},
						yRareAxis: {
							type: 'linear',
							position: 'right',
							grid: {
								drawOnChartArea: false,
							},
						},
					},
				}}
			/>
		)
	})
