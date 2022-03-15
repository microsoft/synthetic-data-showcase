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

import type { ICsvContent } from '~models/csv'
import { defaultCsvContent } from '~models/csv'

const state = atom<ICsvContent>({
	key: 'sensitive-content',
	default: defaultCsvContent,
	dangerouslyAllowMutability: true,
})

export function useSensitiveContent(): [
	ICsvContent,
	SetterOrUpdater<ICsvContent>,
] {
	return useRecoilState(state)
}

export function useSensitiveContentValue(): ICsvContent {
	return useRecoilValue(state)
}

export function useSensitiveContentSetter(): SetterOrUpdater<ICsvContent> {
	return useSetRecoilState(state)
}

export function useResetSensitiveContent(): () => void {
	return useResetRecoilState(state)
}
