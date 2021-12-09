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
	key: 'reporting-length',
	default: 3,
})

export function useReportingLength(): [number, SetterOrUpdater<number>] {
	return useRecoilState(state)
}

export function useReportingLengthValue(): number {
	return useRecoilValue(state)
}

export function useReportingLengthSetter(): SetterOrUpdater<number> {
	return useSetRecoilState(state)
}
