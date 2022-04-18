/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import type { SetterOrUpdater } from 'recoil'
import { atom, useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'

const state = atom<number>({
	key: 'noisy-count-threshold-value',
	default: 0.2,
})

export function useNoisyCountThresholdValue(): [
	number,
	SetterOrUpdater<number>,
] {
	return useRecoilState(state)
}

export function useNoisyCountThresholdValueValue(): number {
	return useRecoilValue(state)
}

export function useNoisyCountThresholdValueSetter(): SetterOrUpdater<number> {
	return useSetRecoilState(state)
}
