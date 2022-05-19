/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import { useMemo } from 'react'
import type { SetterOrUpdater } from 'recoil'
import { atom, useRecoilState } from 'recoil'
import type { HeaderNames, ISelectedAttributesByColumn } from 'sds-wasm'

import { useSelectedSynthesisInfo } from './selectedSynthesisInfo.js'

export function useAvailableHeaders(): HeaderNames {
	const [selectedSynthesis] = useSelectedSynthesisInfo()
	return useMemo(() => {
		return selectedSynthesis?.parameters.csvDataParameters.useColumns ?? []
	}, [selectedSynthesis])
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
