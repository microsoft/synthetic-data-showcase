/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import type { SetterOrUpdater } from 'recoil'
import { atom, useRecoilState } from 'recoil'

const globalErrorMessage = atom<string | undefined>({
	key: 'global-error-message',
	default: undefined,
})

export function useGlobalErrorMessage(): [
	string | undefined,
	SetterOrUpdater<string | undefined>,
] {
	return useRecoilState(globalErrorMessage)
}
