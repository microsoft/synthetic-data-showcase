/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { memo } from 'react'
import { Chart } from 'react-chartjs-2'

import type { IMetrics } from '~models'

export interface IMetricsChart {
	label: string
	metrics: IMetrics
	type: 'line' | 'bar'
	max?: number
	drawYAxisOnChartArea?: boolean
}

export interface MetricsChartProps {
	labels: number[]
	leftChart?: IMetricsChart
	rightChart?: IMetricsChart
	height: number
	width: number
}

function add_chart(
	datasets,
	scales,
	chart: IMetricsChart,
	position: 'left' | 'right',
	labels: number[],
) {
	datasets.push({
		label: chart.label,
		type: chart.type,
		data: labels.map(l => chart.metrics[l] ?? 0),
		yAxisID: position,
	})
	scales[position] = {
		type: 'linear',
		position: position,
		suggestedMax: chart.max,
		grid: {
			drawOnChartArea: chart.drawYAxisOnChartArea,
		},
	}
}

export const MetricsChart: React.FC<MetricsChartProps> = memo(
	function MetricsChart({
		labels,
		leftChart,
		rightChart,
		height,
		width,
	}: MetricsChartProps) {
		const datasets = []
		const scales = {}

		if (leftChart) {
			add_chart(datasets, scales, leftChart, 'left', labels)
		}

		if (rightChart) {
			add_chart(datasets, scales, rightChart, 'right', labels)
		}

		return (
			<Chart
				type="bar"
				height={height}
				width={width}
				data={{
					labels,
					datasets,
				}}
				options={{
					responsive: false,
					maintainAspectRatio: false,
					scales: scales,
				}}
			/>
		)
	},
)
