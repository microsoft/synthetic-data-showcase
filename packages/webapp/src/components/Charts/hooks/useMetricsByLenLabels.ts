/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import _ from 'lodash'
import { useMemo } from 'react'

export function useMetricsByLenLabels(reportingLength?: number | null): number[] {
	return useMemo(() => {
		if (!reportingLength) {
			return []
		}
		return _.range(1, Number(reportingLength) + 1)
	}, [reportingLength])
}
