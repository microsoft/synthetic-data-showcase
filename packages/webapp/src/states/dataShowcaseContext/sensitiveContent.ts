/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { useCallback } from 'react'
import type { SetterOrUpdater } from 'recoil'
import {
	atom,
	useRecoilValue,
	useResetRecoilState,
	useSetRecoilState,
} from 'recoil'

import type { ICsvContent } from '~models/csv'
import { defaultCsvContent } from '~models/csv'
import { useClearContexts } from '~states'

const state = atom<ICsvContent>({
	key: 'sensitive-content',
	default: defaultCsvContent,
	dangerouslyAllowMutability: true,
})

export function useSensitiveContent(): [
	ICsvContent,
	SetterOrUpdater<ICsvContent>,
] {
	return [useSensitiveContentValue(), useSensitiveContentSetter()]
}

export function useSensitiveContentValue(): ICsvContent {
	return useRecoilValue(state)
}

export function useSensitiveContentSetter(): SetterOrUpdater<ICsvContent> {
	const clearContexts = useClearContexts()
	const setter = useSetRecoilState(state)
	return useCallback(
		async newValue => {
			await clearContexts()
			setter(newValue)
		},
		[clearContexts, setter],
	)
}

export function useResetSensitiveContent(): () => void {
	const clearContexts = useClearContexts()
	const resetter = useResetRecoilState(state)
	return useCallback(async () => {
		await clearContexts()
		resetter()
	}, [clearContexts, resetter])
}
