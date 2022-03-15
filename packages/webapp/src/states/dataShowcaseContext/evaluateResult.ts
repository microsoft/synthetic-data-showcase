/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import type { SetterOrUpdater } from 'recoil'
import {
	atom,
	useRecoilState,
	useRecoilValue,
	useResetRecoilState,
	useSetRecoilState,
} from 'recoil'
import type { IEvaluateResult } from 'sds-wasm'

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

export function useResetEvaluateResult(): () => void {
	return useResetRecoilState(state)
}
