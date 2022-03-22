/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import type { IDropdownOption } from '@fluentui/react'
import { useCallback } from 'react'

import type { AllContextsParameters } from '~models'

import type { OnContextSelectedCallback } from '..'

export function useContextsDropdownOnChange(
	allContextsParameters: AllContextsParameters,
	onContextSelected?: OnContextSelectedCallback,
): (event: React.FormEvent<HTMLDivElement>, item?: IDropdownOption) => void {
	return useCallback(
		(event: React.FormEvent<HTMLDivElement>, item?: IDropdownOption) => {
			if (item) {
				const contextParameters = allContextsParameters.find(
					p => p.key === item.key,
				)

				if (contextParameters) {
					onContextSelected?.(contextParameters)
				}
			}
		},
		[allContextsParameters, onContextSelected],
	)
}
