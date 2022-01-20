/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import type { Plugin } from 'chart.js'
import ChartDataLabels from 'chartjs-plugin-datalabels'
import { memo, useCallback } from 'react'
import { Bar } from 'react-chartjs-2'
import { IAttributesIntersection } from 'sds-wasm'
import {
	useActualBarConfig,
	useDataLabelsConfig,
	useEstimatedBarConfig,
} from './hooks'

export interface AttributeIntersectionValueChartProps {
	items: IAttributesIntersection[]
	maxCount: number
	height: number
	onClick?: (item: IAttributesIntersection | undefined) => void
	selectedAttributes: Set<string>
}

export const AttributeIntersectionValueChart: React.FC<AttributeIntersectionValueChartProps> =
	memo(function AttributeIntersectionValueChart({
		items,
		maxCount,
		height,
		onClick,
		selectedAttributes,
	}: AttributeIntersectionValueChartProps) {
		const labels = items ? items.map(i => i.value) : []
		const estimated = items ? items.map(i => Number(i.estimatedCount)) : []
		const actual = items
			? items
					.map(i =>
						i.actualCount !== undefined ? Number(i.actualCount) : undefined,
					)
					.filter(i => i !== undefined)
			: []
		const estimatedBarConfig = useEstimatedBarConfig(labels, selectedAttributes)
		const actualBarConfig = useActualBarConfig(labels, selectedAttributes)
		const dataLabelsConfig = useDataLabelsConfig(labels, selectedAttributes)

		const handleClick = useCallback(
			(evt, elements, chart) => {
				// either bar click fires off the same item
				const clicked = elements && elements[0]
				const item = clicked ? items[clicked.index] : undefined
				// only triggers the event if we clicked a bar
				if (item !== undefined) onClick?.(item)
			},
			[items, onClick],
		)

		return (
			<Bar
				height={height}
				data={{
					labels: labels.length > 0 ? labels : [' '],
					datasets: [
						{
							label: 'Actual',
							data: actual,
							xAxisID: 'xAxis',
							...actualBarConfig,
						},
						{
							label: 'Estimated',
							data: estimated,
							xAxisID: 'xAxis',
							...estimatedBarConfig,
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
						...dataLabelsConfig,
						legend: {
							display: false,
						},
					},
					indexAxis: 'y',
					scales: {
						xAxis: {
							display: false,
							max: maxCount,
						},
					},
					animation: {
						duration: 0,
					},
					onClick: handleClick,
				}}
			/>
		)
	})
