/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import {
	atom,
	SetterOrUpdater,
	useRecoilState,
	useRecoilValue,
	useSetRecoilState,
} from 'recoil'

const state = atom<number>({
	key: 'resolution',
	default: 10,
})

export function useResolution(): [number, SetterOrUpdater<number>] {
	return useRecoilState(state)
}

export function useResolutionValue(): number {
	return useRecoilValue(state)
}

export function useResolutionSetter(): SetterOrUpdater<number> {
	return useSetRecoilState(state)
}
