/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import type { IEvaluateResult, IMicrodataStatistics } from '@essex/sds-core'
import type { IDropdownOption } from '@fluentui/react'
import _ from 'lodash'
import type { MutableRefObject } from 'react'
import { useCallback, useMemo } from 'react'

import type { IMicrodataMaxStatistics } from '~models'
import { useSdsManagerInstance } from '~states'
import type { ISynthesisInfo } from '~workers/types'
import { AggregateType } from '~workers/types'

export function useSelectedSynthesisOnChange(
	selectedSynthesis: ISynthesisInfo | null,
	setEvaluateResult: (evaluateResult: IEvaluateResult | null) => void,
	isMounted: MutableRefObject<boolean>,
): () => Promise<void> {
	const [manager] = useSdsManagerInstance()

	return useCallback(async () => {
		if (selectedSynthesis && manager) {
			const result = await manager.instance.getEvaluateResult(
				selectedSynthesis.key,
			)

			if (isMounted.current) {
				setEvaluateResult(result)
			}
		} else {
			setEvaluateResult(null)
		}
	}, [manager, selectedSynthesis, setEvaluateResult, isMounted])
}

export function useAggregateTypeOptions(): IDropdownOption[] {
	return [
		{ key: AggregateType.Sensitive, text: 'Sensitive' },
		{ key: AggregateType.Aggregated, text: 'Aggregate' },
		{ key: AggregateType.Synthetic, text: 'Synthetic' },
	]
}

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
