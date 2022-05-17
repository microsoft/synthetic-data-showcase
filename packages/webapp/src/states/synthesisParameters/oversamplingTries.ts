/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import type { SetterOrUpdater } from 'recoil'
import { atom, useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'

const state = atom<number>({
	key: 'oversampling-tries',
	default: 10,
})

export function useOversamplingTries(): [number, SetterOrUpdater<number>] {
	return useRecoilState(state)
}

export function useOversamplingTriesValue(): number {
	return useRecoilValue(state)
}

export function useOversamplingTriesSetter(): SetterOrUpdater<number> {
	return useSetRecoilState(state)
}
