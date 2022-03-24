/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import type { SetterOrUpdater } from 'recoil'
import { atom, useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'

const state = atom<number>({
	key: 'noise-epsilon',
	default: 6,
})

export function useNoiseEpsilon(): [number, SetterOrUpdater<number>] {
	return useRecoilState(state)
}

export function useNoiseEpsilonValue(): number {
	return useRecoilValue(state)
}

export function useNoiseEpsilonSetter(): SetterOrUpdater<number> {
	return useSetRecoilState(state)
}
