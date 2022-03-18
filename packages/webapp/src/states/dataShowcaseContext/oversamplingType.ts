/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import type { SetterOrUpdater } from 'recoil'
import { atom, useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'

import { OversamplingType } from '~models'

const state = atom<OversamplingType>({
	key: 'oversampling-type',
	default: OversamplingType.Unlimited
})

export function useOversamplingType(): [OversamplingType, SetterOrUpdater<OversamplingType>] {
	return useRecoilState(state)
}

export function useOversamplingTypeValue(): OversamplingType {
	return useRecoilValue(state)
}

export function useOversamplingTypeSetter(): SetterOrUpdater<OversamplingType> {
	return useSetRecoilState(state)
}
