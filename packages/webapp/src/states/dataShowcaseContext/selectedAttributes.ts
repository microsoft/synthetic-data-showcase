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
import { ISelectedAttributes } from '~models'

const state = atom<ISelectedAttributes>({
	key: 'selected-attributes',
	default: {},
})

export function useSelectedAttributes(): [
	ISelectedAttributes,
	SetterOrUpdater<ISelectedAttributes>,
] {
	return useRecoilState(state)
}

export function useSelectedAttributesValue(): ISelectedAttributes {
	return useRecoilValue(state)
}

export function useSelectedAttributesSetter(): SetterOrUpdater<ISelectedAttributes> {
	return useSetRecoilState(state)
}
