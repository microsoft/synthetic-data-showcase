/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import type { IDropdownOption } from '@fluentui/react'
import { useMemo } from 'react'

import type { AllContextsParameters } from '~models'

export function useAllContextsParametersOptions(
	allContextsParameters: AllContextsParameters,
): IDropdownOption[] {
	return useMemo(() => {
		return allContextsParameters.map(p => ({ key: p.key, text: p.key }))
	}, [allContextsParameters])
}
