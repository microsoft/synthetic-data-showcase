/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { FlexContainer, FlexItem } from '@sds/components'
import { useThematic } from '@thematic/react'
import type { Plugin } from 'chart.js'
import ChartDataLabels from 'chartjs-plugin-datalabels'
import _ from 'lodash'
import type { FC } from 'react'
import { memo, useCallback, useMemo } from 'react'
import { Bar } from 'react-chartjs-2'

import { useNominalBoldScale, useNominalScale } from '~utils'

import { ChartContainer } from './ContributionChart.styles.js'
import type { ContributionChartProps } from './ContributionChart.types.js'

export const ContributionChart: FC<ContributionChartProps> = memo(
	function ContributionChart({
		selectedKey,
		valuePerKey,
		label,
		containerHeight,
		barHeight,
		tooltipFormatter,
		onClick,
	}) {
		const labels = useMemo(
			() =>
				_(valuePerKey)
					.keys()
					.sortBy(k => -valuePerKey[k])
					.value(),
			[valuePerKey],
		)
		const data = useMemo(
			() => labels.map(k => valuePerKey[k].toFixed(2)),
			[labels, valuePerKey],
		)
		const handleClick = useCallback(
			(evt, elements, chart) => {
				// either bar click fires off the same item
				const clicked = elements && elements[0]
				const key = clicked ? labels[clicked.index] : undefined
				// only triggers the event if we clicked a bar
				key && onClick?.(key)
			},
			[labels, onClick],
		)
		const thematic = useThematic()
		const nominalScale = useNominalScale()
		const nominalBoldScale = useNominalBoldScale()
		const backgroundColor = useMemo(() => {
			const normalColor = nominalScale[0]
			const selectedColor = nominalBoldScale[1]

			return labels.map(l => (l === selectedKey ? selectedColor : normalColor))
		}, [labels, nominalScale, nominalBoldScale, selectedKey])
		const labelColors = useMemo(() => {
			const greys = thematic.scales().greys().toArray()

			return labels.map(l => (selectedKey === l ? greys[0] : greys[80]))
		}, [labels, thematic, selectedKey])

		return (
			<FlexContainer vertical justify="center">
				<FlexItem align="center">{label}</FlexItem>
				<ChartContainer
					style={{
						maxHeight: containerHeight,
					}}
				>
					<div
						style={{
							height: Math.max(barHeight * data.length, barHeight),
						}}
					>
						<Bar
							data={{
								labels: labels,
								datasets: [
									{
										label: label,
										data: data,
										xAxisID: 'xAxis',
										yAxisID: 'yAxis',
										backgroundColor,
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
								responsive: true,
								maintainAspectRatio: false,
								plugins: {
									legend: {
										display: false,
									},
									datalabels: {
										anchor: 'start',
										align: 'end',
										offset: 5,
										formatter: value => `${value} %`,
										color: labelColors,
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
					</div>
				</ChartContainer>
			</FlexContainer>
		)
	},
)
ContributionChart.displayName = 'ContributionChart'
