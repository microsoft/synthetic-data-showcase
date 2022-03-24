/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import type { SetterOrUpdater } from 'recoil'
import { atom, useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'

const state = atom<boolean>({
	key: 'is-processing',
	default: false,
})

export function useIsProcessing(): [boolean, SetterOrUpdater<boolean>] {
	return useRecoilState(state)
}

export function useIsProcessingValue(): boolean {
	return useRecoilValue(state)
}

export function useIsProcessingSetter(): SetterOrUpdater<boolean> {
	return useSetRecoilState(state)
}
