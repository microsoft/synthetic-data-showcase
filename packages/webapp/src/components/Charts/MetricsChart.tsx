/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import type { IMetricByKey } from '@essex/sds-core'
import { memo } from 'react'
import { Chart } from 'react-chartjs-2'

import { useNominalScale } from '~utils'

export interface IMetricsChart {
	label: string
	metrics: IMetricByKey
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
	color: string,
) {
	datasets.push({
		label: chart.label,
		type: chart.type,
		data: labels.map(l => chart.metrics[l] ?? 0),
		yAxisID: position,
		backgroundColor: color,
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
		const color = useNominalScale()[0]

		if (leftChart) {
			add_chart(datasets, scales, leftChart, 'left', labels, color)
		}

		if (rightChart) {
			add_chart(datasets, scales, rightChart, 'right', labels, color)
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
				style={{
					margin: 'auto',
				}}
			/>
		)
	},
)
