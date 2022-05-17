/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import type { SetterOrUpdater } from 'recoil'
import { atom, useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'

const state = atom<number>({
	key: 'cache-size',
	default: 100000,
})

export function useCacheSize(): [number, SetterOrUpdater<number>] {
	return useRecoilState(state)
}

export function useCacheSizeValue(): number {
	return useRecoilValue(state)
}

export function useCacheSizeSetter(): SetterOrUpdater<number> {
	return useSetRecoilState(state)
}
