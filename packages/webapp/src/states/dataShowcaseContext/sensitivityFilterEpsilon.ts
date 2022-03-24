/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import type { SetterOrUpdater } from 'recoil'
import { atom, useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'

const state = atom<number>({
	key: 'sensitivity-filter-epsilon',
	default: 6,
})

export function useSensitivityFilterEpsilon(): [number, SetterOrUpdater<number>] {
	return useRecoilState(state)
}

export function useSensitivityFilterEpsilonValue(): number {
	return useRecoilValue(state)
}

export function useSensitivityFilterEpsilonSetter(): SetterOrUpdater<number> {
	return useSetRecoilState(state)
}
