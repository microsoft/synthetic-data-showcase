/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import type { IDropdownOption } from '@fluentui/react'

import { UseSyntheticCounts } from '~models'

const useSyntheticCountsOptions = [
	{ key: UseSyntheticCounts.Yes, text: UseSyntheticCounts.Yes },
	{ key: UseSyntheticCounts.No, text: UseSyntheticCounts.No },
]

export function useUseSyntheticCountOptions(): IDropdownOption[] {
	return useSyntheticCountsOptions
}
