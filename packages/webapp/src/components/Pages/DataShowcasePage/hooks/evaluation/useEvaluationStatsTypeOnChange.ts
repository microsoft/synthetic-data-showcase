/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import type { IDropdownOption } from '@fluentui/react'
import { useCallback } from 'react'

import type { EvaluationStatsType } from '~models'

export function useEvaluationStatsTypeOnChange(
	setter: (key: EvaluationStatsType | undefined) => void,
): (event: React.FormEvent<HTMLDivElement>, item?: IDropdownOption) => void {
	return useCallback(
		(event: React.FormEvent<HTMLDivElement>, item?: IDropdownOption) => {
			if (item?.key) {
				setter(item.key as EvaluationStatsType)
			}
		},
		[setter],
	)
}
