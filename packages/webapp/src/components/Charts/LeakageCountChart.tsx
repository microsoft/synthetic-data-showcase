/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { memo } from 'react'
import { Bar } from 'react-chartjs-2'
import { IAggregatedCountByLen } from '~models'

export interface LeakageCountChartProps {
	combinationsLabel: string
	leakageLabel: string
	combinationsCountByLen: IAggregatedCountByLen
	leakageCountByLen: IAggregatedCountByLen
	height: number
	width: number
}

export const LeakageCountChart: React.FC<LeakageCountChartProps> = memo(
	function LeakageCountChart({
		combinationsLabel,
		leakageLabel,
		combinationsCountByLen,
		leakageCountByLen,
		height,
		width,
	}: LeakageCountChartProps) {
		const labels = Object.keys(combinationsCountByLen).sort()

		return (
			<Bar
				height={height}
				width={width}
				data={{
					labels: labels,
					datasets: [
						{
							label: leakageLabel,
							type: 'line',
							data: labels.map(l => leakageCountByLen[l] ?? 0),
							borderWidth: '1',
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
