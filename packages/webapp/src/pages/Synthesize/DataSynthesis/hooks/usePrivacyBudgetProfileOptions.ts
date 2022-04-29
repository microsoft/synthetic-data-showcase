/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import type { IDropdownOption } from '@fluentui/react'

import { PrivacyBudgetProfile } from '~models'

const privacyBudgetProfilesOptions = [
	{ key: PrivacyBudgetProfile.Flat, text: PrivacyBudgetProfile.Flat },
	{
		key: PrivacyBudgetProfile.ProportionallyIncreasing,
		text: PrivacyBudgetProfile.ProportionallyIncreasing,
	},
	{
		key: PrivacyBudgetProfile.ProportionallyDecreasing,
		text: PrivacyBudgetProfile.ProportionallyDecreasing,
	},
]

export function usePrivacyBudgetProfileOptions(): IDropdownOption[] {
	return privacyBudgetProfilesOptions
}
