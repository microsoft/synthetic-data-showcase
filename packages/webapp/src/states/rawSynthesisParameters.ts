/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { useMemo } from 'react'
import type { SetterOrUpdater } from 'recoil'
import { atom, useRecoilState } from 'recoil'

import type { IRawSynthesisParameters } from '~models/synthesis/RawSynthesisParameters'
import { defaultRawSynthesisParameters } from '~models/synthesis/RawSynthesisParameters'

const state = atom<IRawSynthesisParameters>({
	key: 'raw-synthesis-parameters',
	default: defaultRawSynthesisParameters,
})

export function useRawSynthesisParameters(): [
	IRawSynthesisParameters,
	SetterOrUpdater<IRawSynthesisParameters>,
] {
	return useRecoilState(state)
}

export function useRawSynthesisParametersPropertySetter<T>(
	prop: keyof IRawSynthesisParameters,
): (val: T) => void {
	const [, setRawSynthesisParams] = useRawSynthesisParameters()
	return useMemo(
		() => (val: T) => {
			setRawSynthesisParams(prev => ({
				...prev,
				[prop]: val,
			}))
		},
		[prop, setRawSynthesisParams],
	)
}
