/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import type { SetterOrUpdater } from 'recoil'
import { atom, useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'

import { SynthesisMode } from '~models'

const state = atom<SynthesisMode>({
	key: 'synthesis-mode',
	default: SynthesisMode.Seeded,
})

export function useSynthesisMode(): [
	SynthesisMode,
	SetterOrUpdater<SynthesisMode>,
] {
	return useRecoilState(state)
}

export function useSynthesisModeValue(): SynthesisMode {
	return useRecoilValue(state)
}

export function useSynthesisModeSetter(): SetterOrUpdater<SynthesisMode> {
	return useSetRecoilState(state)
}
