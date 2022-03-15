/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import _ from 'lodash'
import { useMemo } from 'react'
import type { IEvaluateResult } from 'sds-wasm'

export function useMetricsByLenLabels(res: IEvaluateResult | null): number[] {
	return useMemo(() => {
		if (!res) {
			return []
		}
		return _.range(1, Number(res.sensitiveAggregateResult.reportingLength) + 1)
	}, [res])
}
