/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import type { SetterOrUpdater } from 'recoil'
import { atom, useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'

import { UseSyntheticCounts } from '~models'

const state = atom<UseSyntheticCounts>({
	key: 'use-synthetic-counts',
	default: UseSyntheticCounts.No,
})

export function useUseSyntheticCounts(): [
	UseSyntheticCounts,
	SetterOrUpdater<UseSyntheticCounts>,
] {
	return useRecoilState(state)
}

export function useUseSyntheticCountsValue(): UseSyntheticCounts {
	return useRecoilValue(state)
}

export function useUseSyntheticCountsSetter(): SetterOrUpdater<UseSyntheticCounts> {
	return useSetRecoilState(state)
}
