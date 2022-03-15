/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { useMemo } from 'react'
import type { IEvaluateResult } from 'sds-wasm'

export function useMetricsByCountLabels(
	res?: IEvaluateResult | null,
): number[] {
	return useMemo(() => {
		return Object.keys(res?.preservationByCount.buckets ?? {})
			.reverse()
			.map(bin => Number(bin))
	}, [res])
}
