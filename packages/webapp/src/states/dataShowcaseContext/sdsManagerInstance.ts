/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import type { SetterOrUpdater } from 'recoil'
import { atom, useRecoilState } from 'recoil'

import type { ISdsManagerInstance } from '~models'

const state = atom<ISdsManagerInstance | null>({
	key: 'sds-manager-instance',
	default: null,
})

export function useSdsManagerInstance(): [
	ISdsManagerInstance | null,
	SetterOrUpdater<ISdsManagerInstance | null>,
] {
	return useRecoilState(state)
}
