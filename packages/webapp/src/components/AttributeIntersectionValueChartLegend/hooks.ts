/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { useThematic } from '@thematic/react'
import { useMemo } from 'react'

export type BarColors = {
	normal: string
	selected: string
	suppressed: string
}

export function useEstimatedBarChartColors(): BarColors {
	const thematic = useThematic()
	return useMemo(
		() => ({
			normal: thematic.scales().nominal().toArray()[0],
			selected: thematic.scales().nominalBold().toArray()[0],
			suppressed: thematic.scales().nominalMuted().toArray()[0],
		}),
		[thematic],
	)
}

export function useActualBarChartColors(): BarColors {
	const thematic = useThematic()
	return useMemo(
		() => ({
			normal: thematic.scales().nominal().toArray()[1],
			selected: thematic.scales().nominalBold().toArray()[1],
			suppressed: thematic.scales().nominalMuted().toArray()[1],
		}),
		[thematic],
	)
}

export function useEstimatedNominalColor(): string {
	return useEstimatedBarChartColors().normal
}

export function useActualNominalColor(): string {
	return useActualBarChartColors().normal
}
