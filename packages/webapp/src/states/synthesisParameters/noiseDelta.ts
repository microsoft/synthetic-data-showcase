/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import type { SetterOrUpdater } from 'recoil'
import { atom, useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'

const state = atom<number>({
	key: 'noise-delta',
	default: 0.0001,
})

export function useNoiseDelta(): [number, SetterOrUpdater<number>] {
	return useRecoilState(state)
}

export function useNoiseDeltaValue(): number {
	return useRecoilValue(state)
}

export function useNoiseDeltaSetter(): SetterOrUpdater<number> {
	return useSetRecoilState(state)
}
