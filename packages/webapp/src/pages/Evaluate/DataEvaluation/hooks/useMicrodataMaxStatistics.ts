/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import _ from 'lodash'
import { useMemo } from 'react'
import type { IMicrodataStatistics } from 'sds-wasm'

import type { IMicrodataMaxStatistics } from '../../../../models'

export function useMicrodataMaxStatistics(
	statsList?: (IMicrodataStatistics | undefined)[],
): IMicrodataMaxStatistics {
	return useMemo(() => {
		const filteredStats = (statsList ?? []).filter(
			stats => stats !== undefined,
		) as IMicrodataStatistics[]
		const res: IMicrodataMaxStatistics = {}

		if (filteredStats.length !== 0) {
			const base = filteredStats[0]

			for (const k in base) {
				if (typeof base[k] === 'number') {
					res[k] = _(filteredStats)
						.map(stats => stats[k])
						.max()
				} else {
					res[k] = _(filteredStats)
						.flatMap(stats => _.values(stats[k]))
						.max()
				}
			}
		}
		return res
	}, [statsList])
}
