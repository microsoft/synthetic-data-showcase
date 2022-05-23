/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { FlexContainer, FlexItem } from '@sds/components'
import type { Plugin } from 'chart.js'
import ChartDataLabels from 'chartjs-plugin-datalabels'
import _ from 'lodash'
import type { FC } from 'react'
import { memo, useCallback, useMemo } from 'react'
import { Bar } from 'react-chartjs-2'

import { ChartContainer } from './ColumnContributionChart.styles.js'
import type { ColumnContributionChartProps } from './ColumnContributionChart.types.js'

export const ColumnContributionChart: FC<ColumnContributionChartProps> = memo(
	function ColumnContributionChart({
		proportionPerColumn,
		label,
		containerHeight,
		barHeight,
		tooltipFormatter,
		onClick,
	}) {
		const labels = useMemo(
			() =>
				_(proportionPerColumn)
					.keys()
					.sortBy(column => -proportionPerColumn[column])
					.value(),
			[proportionPerColumn],
		)
		const data = useMemo(
			() => labels.map(column => proportionPerColumn[column].toFixed(0)),
			[labels, proportionPerColumn],
		)
		const handleClick = useCallback(
			(evt, elements, chart) => {
				// either bar click fires off the same item
				const clicked = elements && elements[0]
				const column = clicked ? labels[clicked.index] : undefined
				// only triggers the event if we clicked a bar
				column && onClick?.(column)
			},
			[labels, onClick],
		)

		return (
			<FlexContainer vertical justify="center">
				<FlexItem align="center">{label}</FlexItem>
				<ChartContainer
					style={{
						maxHeight: containerHeight,
					}}
				>
					<Bar
						height={Math.max(barHeight * data.length, barHeight)}
						data={{
							labels: labels,
							datasets: [
								{
									label: label,
									data: data,
									xAxisID: 'xAxis',
									yAxisID: 'yAxis',
								},
							],
						}}
						plugins={[
							ChartDataLabels as Plugin<'bar'>,
							{
								id: 'event-catcher',
								beforeEvent(chart, args, _pluginOptions) {
									// on hover at options will not handle well the case
									// where the mouse leaves the bar
									if (args.event.type === 'mousemove') {
										const elements = chart.getActiveElements()
										chart.canvas.style.cursor =
											elements && elements[0] ? 'pointer' : 'default'
									}
								},
							},
						]}
						options={{
							plugins: {
								legend: {
									display: false,
								},
								datalabels: {
									anchor: 'start',
									align: 'end',
									offset: 5,
									formatter: value => `${value} %`,
								},
								tooltip: {
									callbacks: {
										label: tooltipFormatter,
									},
								},
							},
							indexAxis: 'y',
							scales: {
								xAxis: {
									display: false,
									grid: {
										display: false,
									},
								},
								yAxis: {
									grid: {
										display: false,
									},
								},
							},
							onClick: handleClick,
						}}
					/>
				</ChartContainer>
			</FlexContainer>
		)
	},
)
ColumnContributionChart.displayName = 'ColumnContributionChart'
