/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import 'chart.js/auto'

import { useThematic } from '@thematic/react'
import { Chart } from 'chart.js'
import { merge } from 'lodash'
import type { FC, PropsWithChildren } from 'react'
import { memo, useEffect } from 'react'

/**
 * Establishes default color mappings for Chart.js + thematic.
 * Note that this should be nested inside of another context that instantiates thematic.
 */
export const ChartContext: FC<
	PropsWithChildren<{
		/* nothing */
	}>
> = memo(function ChartContext({ children }) {
	const thematic = useThematic()
	useEffect(() => {
		const nominal = thematic.scales().nominal().toArray()

		const plot = thematic.plotArea()
		const grid = thematic.gridLines()
		const tickLabels = thematic.axisTickLabels()

		const overrides = {
			backgroundColor: plot.fill().hex(),
			borderColor: plot.stroke().hex(),
			datasets: {
				bar: {
					backgroundColor: nominal[0],
				},
				line: {
					borderColor: nominal[2],
					borderWidth: 1,
				},
			},
			scale: {
				grid: {
					color: grid.stroke().hex(),
					lineWidth: grid.strokeWidth(),
				},
				ticks: {
					color: tickLabels.fill().hex(),
				},
			},
		}

		merge(Chart.defaults, overrides)
	}, [thematic])
	return <>{children}</>
})
