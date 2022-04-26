/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import type { SetterOrUpdater } from 'recoil'
import { atom, useRecoilState } from 'recoil'

const multiValueColumnsState = atom<Record<string, string>>({
	key: 'multi-value-columns',
	default: {},
	dangerouslyAllowMutability: true,
})

export function useMultiValueColumns(): [
	Record<string, string>,
	SetterOrUpdater<Record<string, string>>,
] {
	return useRecoilState(multiValueColumnsState)
}
