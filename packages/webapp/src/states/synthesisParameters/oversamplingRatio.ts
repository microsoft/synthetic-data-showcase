/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import type { SetterOrUpdater } from 'recoil'
import { atom, useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'

const state = atom<number>({
	key: 'oversampling-ratio',
	default: 0.1,
})

export function useOversamplingRatio(): [number, SetterOrUpdater<number>] {
	return useRecoilState(state)
}

export function useOversamplingRatioValue(): number {
	return useRecoilValue(state)
}

export function useOversamplingRatioSetter(): SetterOrUpdater<number> {
	return useSetRecoilState(state)
}
