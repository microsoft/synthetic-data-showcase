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

import type { AllContextsParameters } from '~models'

const state = atom<AllContextsParameters>({
	key: 'all-contexts-parameters',
	default: [],
})

export function useAllContextsParameters(): [
	AllContextsParameters,
	SetterOrUpdater<AllContextsParameters>,
] {
	return useRecoilState(state)
}

export function useAllContextsParametersValue(): AllContextsParameters {
	return useRecoilValue(state)
}

export function useAllContextsParametersSetter(): SetterOrUpdater<AllContextsParameters> {
	return useSetRecoilState(state)
}

export function useResetAllContextsParameters(): () => void {
	return useResetRecoilState(state)
}
