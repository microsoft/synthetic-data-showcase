/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { useMemo } from 'react'
import type { IMetricByKey } from 'sds-wasm'

export function useMetricsByCountLabels(
	metricsByKey?: IMetricByKey | null,
): number[] {
	return useMemo(() => {
		return Object.keys(metricsByKey ?? {})
			.reverse()
			.map(bin => Number(bin))
	}, [metricsByKey])
}
