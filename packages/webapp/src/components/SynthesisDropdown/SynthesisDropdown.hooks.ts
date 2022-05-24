/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import type { IDropdownOption } from '@fluentui/react'
import { useCallback, useMemo } from 'react'

import type { ISynthesisInfo } from '~workers/types'

import type { OnSynthesisSelectedCallback } from './SynthesisDropdown.types.js'

export function useAllSynthesisOptions(
	allSynthesisInfo: ISynthesisInfo[],
): IDropdownOption[] {
	return useMemo(() => {
		return allSynthesisInfo.map(p => ({ key: p.key, text: p.key }))
	}, [allSynthesisInfo])
}

export function useSynthesisDropdownOnChange(
	allSynthesisInfo: ISynthesisInfo[],
	onSynthesisSelected?: OnSynthesisSelectedCallback,
): (event: React.FormEvent<HTMLDivElement>, item?: IDropdownOption) => void {
	return useCallback(
		(event: React.FormEvent<HTMLDivElement>, item?: IDropdownOption) => {
			if (item) {
				const synthesis = allSynthesisInfo.find(p => p.key === item.key)

				if (synthesis) {
					onSynthesisSelected?.(synthesis)
				}
			}
		},
		[allSynthesisInfo, onSynthesisSelected],
	)
}
