/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import type { SetterOrUpdater } from 'recoil'
import { atom, useRecoilState } from 'recoil'
import type { HeaderNames, ISelectedAttributesByColumn } from 'sds-wasm'

const headersState = atom<HeaderNames>({
	key: 'headers',
	default: [],
})

export function useHeaders(): [HeaderNames, SetterOrUpdater<HeaderNames>] {
	return useRecoilState(headersState)
}

const selectedHeadersState = atom<boolean[]>({
	key: 'selectedHeaders',
	default: [],
})

export function useSelectedHeaders(): [boolean[], SetterOrUpdater<boolean[]>] {
	return useRecoilState(selectedHeadersState)
}

const selectedAttributesByColumnState = atom<ISelectedAttributesByColumn>({
	key: 'selectedAttributesByColumn',
	default: {},
})

export function useSelectedAttributesByColumn(): [
	ISelectedAttributesByColumn,
	SetterOrUpdater<ISelectedAttributesByColumn>,
] {
	return useRecoilState(selectedAttributesByColumnState)
}
