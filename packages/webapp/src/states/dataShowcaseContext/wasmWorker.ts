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
import { SdsWasmWorker } from 'src/workers/sds-wasm'

const state = atom<SdsWasmWorker | null>({
	key: 'wasm-worker',
	default: null,
})

export function useWasmWorker(): [
	SdsWasmWorker | null,
	SetterOrUpdater<SdsWasmWorker | null>,
] {
	return useRecoilState(state)
}

export function useWasmWorkerValue(): SdsWasmWorker | null {
	return useRecoilValue(state)
}

export function useWasmWorkerSetter(): SetterOrUpdater<SdsWasmWorker | null> {
	return useSetRecoilState(state)
}
