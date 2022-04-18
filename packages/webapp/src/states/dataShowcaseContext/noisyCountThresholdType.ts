/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import type { SetterOrUpdater } from 'recoil'
import { atom, useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'

import { NoisyCountThresholdType } from '~models'

const state = atom<NoisyCountThresholdType>({
	key: 'noisy-count-threshold-type',
	default: NoisyCountThresholdType.MaxFabrication,
})

export function useNoisyCountThresholdType(): [
	NoisyCountThresholdType,
	SetterOrUpdater<NoisyCountThresholdType>,
] {
	return useRecoilState(state)
}

export function useNoisyCountThresholdTypeValue(): NoisyCountThresholdType {
	return useRecoilValue(state)
}

export function useNoisyCountThresholdTypeSetter(): SetterOrUpdater<NoisyCountThresholdType> {
	return useSetRecoilState(state)
}
