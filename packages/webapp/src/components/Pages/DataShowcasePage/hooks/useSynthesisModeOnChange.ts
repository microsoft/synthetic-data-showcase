/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import type { IDropdownOption } from '@fluentui/react'
import { useCallback } from 'react'
import type { SetterOrUpdater } from 'recoil'

import type { SynthesisMode } from '~models'

export function useSynthesisModeOnChange(
	setter: SetterOrUpdater<SynthesisMode>,
): (event: React.FormEvent<HTMLDivElement>, item?: IDropdownOption) => void {
	return useCallback(
		(event: React.FormEvent<HTMLDivElement>, item?: IDropdownOption) => {
			if (item) {
				setter(item.key as SynthesisMode)
			}
		},
		[setter],
	)
}
