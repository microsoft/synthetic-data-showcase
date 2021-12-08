/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { memo } from 'react'
import { Bar } from 'react-chartjs-2'
import { IAggregatedCountByLen } from '~models'

export interface MeanCombinationsByLengthChartProps {
	meanLabel: string
	combinationsCountByLen: IAggregatedCountByLen
	combinationsSumByLen: IAggregatedCountByLen
	height: number
	width: number
}

export const MeanCombinationsByLengthChart: React.FC<MeanCombinationsByLengthChartProps> =
	memo(function MeanCombinationsByLengthChart({
		meanLabel,
		combinationsCountByLen,
		combinationsSumByLen,
		height,
		width,
	}: MeanCombinationsByLengthChartProps) {
		const labels = Object.keys(combinationsCountByLen).sort()

		return (
			<Bar
				height={height}
				width={width}
				data={{
					labels: labels,
					datasets: [
						{
							label: meanLabel,
							data: labels.map(
								l =>
									(combinationsSumByLen[l] ?? 0) /
									(combinationsCountByLen[l] ?? 1),
							),
						},
					],
				}}
				options={{
					responsive: false,
					maintainAspectRatio: false,
				}}
			/>
		)
	})
