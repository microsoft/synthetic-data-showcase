/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import type { SetterOrUpdater } from 'recoil'
import { atom, useRecoilState, useResetRecoilState } from 'recoil'

import type { ISynthesisInfo } from '~workers/types'

const state = atom<ISynthesisInfo[]>({
	key: 'all-synthesis-info',
	default: [],
})

export function useAllSynthesisInfo(): [
	ISynthesisInfo[],
	SetterOrUpdater<ISynthesisInfo[]>,
] {
	return useRecoilState(state)
}

export function useResetAllSynthesisInfo(): () => void {
	return useResetRecoilState(state)
}
