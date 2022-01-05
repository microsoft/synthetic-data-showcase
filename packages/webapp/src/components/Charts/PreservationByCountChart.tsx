/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import { memo } from 'react'
import { Bar } from 'react-chartjs-2'
import { IPreservationByCountBuckets } from 'sds-wasm'

export interface PreservationByCountChartProps {
	meanLengthLabel: string
	preservationLabel: string
	preservationByCountBuckets: IPreservationByCountBuckets
	height: number
	width: number
}

export const PreservationByCountChart: React.FC<PreservationByCountChartProps> =
	memo(function PreservationByCountChart({
		meanLengthLabel,
		preservationLabel,
		preservationByCountBuckets,
		height,
		width,
	}: PreservationByCountChartProps) {
		const labels = Object.keys(preservationByCountBuckets).reverse()

		return (
			<Bar
				height={height}
				width={width}
				data={{
					labels: labels,
					datasets: [
						{
							label: preservationLabel,
							type: 'line',
							data: labels.map(
								l =>
									((preservationByCountBuckets[l].preservationSum ?? 0) * 100) /
									Number(preservationByCountBuckets[l].size ?? 1),
							),
							yAxisID: 'yPreservationAxis',
							// eslint-disable-next-line @typescript-eslint/no-explicit-any
						} as any,
						{
							label: meanLengthLabel,
							data: labels.map(
								l =>
									Number(preservationByCountBuckets[l].lengthSum ?? 0) /
									Number(preservationByCountBuckets[l].size ?? 1),
							),
							yAxisID: 'yMeanAxis',
						},
					],
				}}
				options={{
					responsive: false,
					maintainAspectRatio: false,
					scales: {
						yMeanAxis: {
							type: 'linear',
							display: true,
							position: 'left',
						},
						yPreservationAxis: {
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
