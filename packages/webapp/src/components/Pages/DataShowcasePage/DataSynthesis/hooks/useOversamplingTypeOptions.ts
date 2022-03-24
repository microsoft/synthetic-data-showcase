/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import type { IDropdownOption } from '@fluentui/react'

import { OversamplingType } from '~models'

const oversamplingTypesOptions = [
	{ key: OversamplingType.Unlimited, text: OversamplingType.Unlimited },
	{ key: OversamplingType.Controlled, text: OversamplingType.Controlled },
]

export function useOversamplingTypeOptions(): IDropdownOption[] {
	return oversamplingTypesOptions
}
