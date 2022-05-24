/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import type { SetterOrUpdater } from 'recoil'
import { atom, useRecoilState, useResetRecoilState } from 'recoil'

import type { ISynthesisInfo } from '~workers/types'

const state = atom<ISynthesisInfo | null>({
	key: 'selected-synthesis-info',
	default: null,
})

export function useSelectedSynthesisInfo(): [
	ISynthesisInfo | null,
	SetterOrUpdater<ISynthesisInfo | null>,
] {
	return useRecoilState(state)
}

export function useResetSelectedSynthesisInfo(): () => void {
	return useResetRecoilState(state)
}
