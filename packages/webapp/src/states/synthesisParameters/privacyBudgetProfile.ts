/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import type { SetterOrUpdater } from 'recoil'
import { atom, useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'

import { PrivacyBudgetProfile } from '~models'

const state = atom<PrivacyBudgetProfile>({
	key: 'privacy-budget-profile',
	default: PrivacyBudgetProfile.ProportionallyIncreasing,
})

export function usePrivacyBudgetProfile(): [
	PrivacyBudgetProfile,
	SetterOrUpdater<PrivacyBudgetProfile>,
] {
	return useRecoilState(state)
}

export function usePrivacyBudgetProfileValue(): PrivacyBudgetProfile {
	return useRecoilValue(state)
}

export function usePrivacyBudgetProfileSetter(): SetterOrUpdater<PrivacyBudgetProfile> {
	return useSetRecoilState(state)
}
