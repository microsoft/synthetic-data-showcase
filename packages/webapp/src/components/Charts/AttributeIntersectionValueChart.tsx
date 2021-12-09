/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import type { Plugin } from 'chart.js'
import ChartDataLabels from 'chartjs-plugin-datalabels'
import { memo, useCallback } from 'react'
import { Bar } from 'react-chartjs-2'
import {
	useActualBarConfig,
	useDataLabelsConfig,
	useEstimatedBarConfig,
} from '~components/Charts/hooks'
import { IAttributesIntersectionValue } from '~models'

export interface AttributeIntersectionValueChartProps {
	items: IAttributesIntersectionValue[]
	maxCount: number
	height: number
	onClick?: (item: IAttributesIntersectionValue | undefined) => void
	selectedValue?: string
}

export const AttributeIntersectionValueChart: React.FC<AttributeIntersectionValueChartProps> =
	memo(function AttributeIntersectionValueChart({
		items,
		maxCount,
		height,
		onClick,
		selectedValue,
	}: AttributeIntersectionValueChartProps) {
		const labels = items ? items.map(i => i.value) : []
		const estimated = items ? items.map(i => i.estimatedCount) : []
		const actual = items
			? items.map(i => i.actualCount).filter(i => i !== undefined)
			: []
		const estimatedBarConfig = useEstimatedBarConfig(labels, selectedValue)
		const actualBarConfig = useActualBarConfig(labels, selectedValue)
		const dataLabelsConfig = useDataLabelsConfig(labels, selectedValue)

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
							label: 'Estimated',
							data: estimated,
							xAxisID: 'xAxis',
							...estimatedBarConfig,
						},
						{
							label: 'Actual',
							data: actual,
							xAxisID: 'xAxis',
							...actualBarConfig,
						},
					],
				}}
				plugins={[ChartDataLabels as Plugin<'bar'>]}
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
