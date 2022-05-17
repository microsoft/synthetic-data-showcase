/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import type { SetterOrUpdater } from 'recoil'
import { atom, useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import type { IInputNumberByLength } from 'sds-wasm'

const state = atom<IInputNumberByLength>({
	key: 'noisy-count-threshold',
	default: {},
})

export function useNoisyCountThreshold(): [
	IInputNumberByLength,
	SetterOrUpdater<IInputNumberByLength>,
] {
	return useRecoilState(state)
}

export function useNoisyCountThresholdValue(): IInputNumberByLength {
	return useRecoilValue(state)
}

export function useNoisyCountThresholdSetter(): SetterOrUpdater<IInputNumberByLength> {
	return useSetRecoilState(state)
}
