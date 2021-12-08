/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { memo } from 'react'
import { Bar } from 'react-chartjs-2'
import { IAggregatedCountByLen } from '~models'

export interface PreservationPercentageByLengthProps {
	combinationsLabel: string
	preservationLabel: string
	combinationsCountByLen: IAggregatedCountByLen
	sensitiveCombinationsCountByLen: IAggregatedCountByLen
	syntheticCombinationsCountByLen: IAggregatedCountByLen
	height: number
	width: number
}

export const PreservationPercentageByLength: React.FC<PreservationPercentageByLengthProps> =
	memo(function PreservationPercentageByLength({
		combinationsLabel,
		preservationLabel,
		combinationsCountByLen,
		sensitiveCombinationsCountByLen,
		syntheticCombinationsCountByLen,
		height,
		width,
	}: PreservationPercentageByLengthProps) {
		const labels = Object.keys(sensitiveCombinationsCountByLen).sort()

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
									((syntheticCombinationsCountByLen[l] ?? 0) * 100) /
									(sensitiveCombinationsCountByLen[l] ?? 1),
							),
							yAxisID: 'yPreservationAxis',
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
