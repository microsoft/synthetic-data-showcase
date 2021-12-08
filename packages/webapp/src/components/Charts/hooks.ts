/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { SelectionState } from '@thematic/core'
import { useThematic } from '@thematic/react'
import { BaseSyntheticEvent, useCallback, useMemo, WheelEvent } from 'react'
/*
	this module contains hooks for chart colors and such that may not be covered in thedefault ChartContext
 */

// we don't have types imported,
// this provides a subset as needed
// see, e.g. https://www.chartjs.org/docs/latest/charts/bar.html
export interface ChartJsDatasetConfig {
	type?: string
	backgroundColor?: string | string[]
}

export function useSecondaryBarConfig(): ChartJsDatasetConfig {
	const thematic = useThematic()
	return useMemo(() => {
		const nominal = thematic.scales().nominal().toArray()
		return {
			type: 'bar',
			backgroundColor: nominal[1],
		}
	}, [thematic])
}

export function useSelectedBarConfig(
	items: string[],
	selectedValue?: string,
): ChartJsDatasetConfig {
	const thematic = useThematic()
	return useMemo(() => {
		const nominal = thematic.scales().nominal().toArray()
		const backgroundColor = items.map(i =>
			i === selectedValue
				? thematic
						.rect({
							selectionState: SelectionState.Selected,
						})
						.fill()
						.hex()
				: nominal[0],
		)
		return backgroundColor.length > 0
			? {
					backgroundColor,
			  }
			: {}
	}, [thematic, items, selectedValue])
}

export function useHorizontalScrolling(): (e: WheelEvent<HTMLElement>) => void {
	return useCallback((e: WheelEvent<HTMLElement>) => {
		e.stopPropagation()
		e.currentTarget.scrollTo({
			left: e.currentTarget.scrollLeft + e.deltaY,
		})
	}, [])
}

export function useStopPropagation(): (e: BaseSyntheticEvent) => void {
	return useCallback((e: BaseSyntheticEvent) => {
		e.stopPropagation()
	}, [])
}
