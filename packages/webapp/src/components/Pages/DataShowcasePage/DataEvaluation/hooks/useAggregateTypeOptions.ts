/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import type { IDropdownOption } from '@fluentui/react'

import { AggregateType } from '~models'

const options = [
	{ key: AggregateType.Sensitive, text: 'Sensitive' },
	{ key: AggregateType.Reportable, text: 'Reportable' },
	{ key: AggregateType.Synthetic, text: 'Synthetic' },
]

export function useAggregateTypeOptions(): IDropdownOption[] {
	return options
}