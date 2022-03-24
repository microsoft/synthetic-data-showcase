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

import type { IContextParameters } from '~models'

const state = atom<IContextParameters | undefined>({
	key: 'selected-context-parameters',
	default: undefined,
})

export function useSelectedContextParameters(): [
	IContextParameters | undefined,
	SetterOrUpdater<IContextParameters | undefined>,
] {
	return useRecoilState(state)
}

export function useSelectedContextParametersValue(): IContextParameters | undefined {
	return useRecoilValue(state)
}

export function useSelectedContextParametersSetter(): SetterOrUpdater<IContextParameters | undefined> {
	return useSetRecoilState(state)
}

export function useResetSelectedContextParameters(): () => void {
	return useResetRecoilState(state)
}
