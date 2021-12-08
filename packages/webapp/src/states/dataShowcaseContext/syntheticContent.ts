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
import { defaultCsvContent, ICsvContent } from 'src/models/csv'

const state = atom<ICsvContent>({
	key: 'synthetic-content',
	default: defaultCsvContent,
})

export function useSyntheticContent(): [
	ICsvContent,
	SetterOrUpdater<ICsvContent>,
] {
	return useRecoilState(state)
}

export function useSyntheticContentValue(): ICsvContent {
	return useRecoilValue(state)
}

export function useSyntheticContentSetter(): SetterOrUpdater<ICsvContent> {
	return useSetRecoilState(state)
}
