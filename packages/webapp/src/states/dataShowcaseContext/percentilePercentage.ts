/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import type { SetterOrUpdater } from 'recoil'
import { atom, useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'

const state = atom<number>({
	key: 'percentile-percentage',
	default: 99,
})

export function usePercentilePercentage(): [number, SetterOrUpdater<number>] {
	return useRecoilState(state)
}

export function usePercentilePercentageValue(): number {
	return useRecoilValue(state)
}

export function usePercentilePercentageSetter(): SetterOrUpdater<number> {
	return useSetRecoilState(state)
}
