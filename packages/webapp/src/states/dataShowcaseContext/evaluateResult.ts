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
import { IEvaluateResult } from 'sds-wasm'

const state = atom<IEvaluateResult | null>({
	key: 'evaluate-result',
	default: null,
})

export function useEvaluateResult(): [
	IEvaluateResult | null,
	SetterOrUpdater<IEvaluateResult | null>,
] {
	return useRecoilState(state)
}

export function useEvaluateResultValue(): IEvaluateResult | null {
	return useRecoilValue(state)
}

export function useEvaluateResultSetter(): SetterOrUpdater<IEvaluateResult | null> {
	return useSetRecoilState(state)
}
