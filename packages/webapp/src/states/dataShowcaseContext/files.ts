/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import type { SetterOrUpdater } from 'recoil'
import { atom, useRecoilState } from 'recoil'

const fileUploadErrorState = atom<string | undefined>({
	key: 'file-upload-state',
	default: undefined,
})

export function useFileUploadErrorMessage(): [
	string | undefined,
	SetterOrUpdater<string | undefined>,
] {
	return useRecoilState(fileUploadErrorState)
}
