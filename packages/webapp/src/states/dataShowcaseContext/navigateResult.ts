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
import { defaultNavigateResult, INavigateResult } from '~models'

const state = atom<INavigateResult>({
	key: 'navigate-result',
	default: defaultNavigateResult,
})

export function useNavigateResult(): [
	INavigateResult,
	SetterOrUpdater<INavigateResult>,
] {
	return useRecoilState(state)
}

export function useNavigateResultValue(): INavigateResult {
	return useRecoilValue(state)
}

export function useNavigateResultSetter(): SetterOrUpdater<INavigateResult> {
	return useSetRecoilState(state)
}
