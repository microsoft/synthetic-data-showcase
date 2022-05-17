/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import type { SetterOrUpdater } from 'recoil'
import { atom, useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'

const state = atom<number>({
	key: 'record-limit',
	default: 0,
})

export function useRecordLimit(): [number, SetterOrUpdater<number>] {
	return useRecoilState(state)
}

export function useRecordLimitValue(): number {
	return useRecoilValue(state)
}

export function useRecordLimitSetter(): SetterOrUpdater<number> {
	return useSetRecoilState(state)
}
