/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import type { SetterOrUpdater } from 'recoil'
import { atom, useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'

const state = atom<number>({
	key: 'percentile-epsilon-proportion',
	default: 0.1,
})

export function usePercentileEpsilonProportion(): [
	number,
	SetterOrUpdater<number>,
] {
	return useRecoilState(state)
}

export function usePercentileEpsilonProportionValue(): number {
	return useRecoilValue(state)
}

export function usePercentileEpsilonProportionSetter(): SetterOrUpdater<number> {
	return useSetRecoilState(state)
}
