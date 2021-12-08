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
import { AttributeRows } from '~models'

const state = atom<AttributeRows>({
	key: 'selected-attribute-rows',
	default: [],
})

export function useSelectedAttributeRows(): [
	AttributeRows,
	SetterOrUpdater<AttributeRows>,
] {
	return useRecoilState(state)
}

export function useSelectedAttributeRowsValue(): AttributeRows {
	return useRecoilValue(state)
}

export function useSelectedAttributeRowsSetter(): SetterOrUpdater<AttributeRows> {
	return useSetRecoilState(state)
}
