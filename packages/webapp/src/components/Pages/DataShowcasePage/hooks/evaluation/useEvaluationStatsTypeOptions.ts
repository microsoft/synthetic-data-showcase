/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import type { IDropdownOption } from '@fluentui/react'

import { EvaluationStatsType } from '~models'

const options = [
	{ key: EvaluationStatsType.SensitiveData, text: 'Sensitive data' },
	{ key: EvaluationStatsType.AggregateCounts, text: 'Aggregate counts' },
	{ key: EvaluationStatsType.SyntheticData, text: 'Synthetic data' },
]

export function useEvaluationStatsTypeOptions(): IDropdownOption[] {
	return options
}
