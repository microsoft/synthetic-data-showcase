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
import { defaultEvaluatedResult, IEvaluatedResult } from '~models'

const state = atom<IEvaluatedResult>({
	key: 'evaluted-result',
	default: defaultEvaluatedResult,
})

export function useEvaluatedResult(): [
	IEvaluatedResult,
	SetterOrUpdater<IEvaluatedResult>,
] {
	return useRecoilState(state)
}

export function useEvaluatedResultValue(): IEvaluatedResult {
	return useRecoilValue(state)
}

export function useEvaluatedResultSetter(): SetterOrUpdater<IEvaluatedResult> {
	return useSetRecoilState(state)
}
