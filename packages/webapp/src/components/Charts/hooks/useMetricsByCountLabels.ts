/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import type { IMetricByKey } from '@essex/sds-core'
import { useMemo } from 'react'

export function getMetricsByCountLabels(
	metricsByKey?: IMetricByKey | null,
): number[] {
	return Object.keys(metricsByKey ?? {})
		.reverse()
		.map(bin => Number(bin))
}

export function useMetricsByCountLabels(
	metricsByKey?: IMetricByKey | null,
): number[] {
	return useMemo(() => getMetricsByCountLabels(metricsByKey), [metricsByKey])
}
