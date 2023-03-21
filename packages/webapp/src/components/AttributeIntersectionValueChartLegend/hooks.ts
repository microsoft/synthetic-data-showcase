/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { useMemo } from 'react'

import {
	useNominalBoldScale,
	useNominalMutedScale,
	useNominalScale,
} from '~utils'

export type BarColors = {
	normal: string
	selected: string
	suppressed: string
}

export function useEstimatedBarChartColors(): BarColors {
	const nominalScale = useNominalScale()
	const nominalBoldScale = useNominalBoldScale()
	const nominalMutedScale = useNominalMutedScale()

	return useMemo(
		() => ({
			normal: nominalScale[0],
			selected: nominalBoldScale[0],
			suppressed: nominalMutedScale[0],
		}),
		[nominalScale, nominalBoldScale, nominalMutedScale],
	)
}

export function useActualBarChartColors(): BarColors {
	const nominalScale = useNominalScale()
	const nominalBoldScale = useNominalBoldScale()
	const nominalMutedScale = useNominalMutedScale()

	return useMemo(
		() => ({
			normal: nominalScale[1],
			selected: nominalBoldScale[1],
			suppressed: nominalMutedScale[1],
		}),
		[nominalScale, nominalBoldScale, nominalMutedScale],
	)
}

export function useEstimatedNominalColor(): string {
	return useEstimatedBarChartColors().normal
}

export function useActualNominalColor(): string {
	return useActualBarChartColors().normal
}
