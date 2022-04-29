/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import type { IInputProps } from '@fluentui/react'
import { useMemo } from 'react'
import type { SetterOrUpdater } from 'recoil'
import type { IInputNumberByLength } from 'sds-wasm'

export function useNoisyCountThresholdChange(
	noisyCountThreshold: IInputProps,
	setNoisyCountThreshold: SetterOrUpdater<IInputNumberByLength>,
): {
	[length: number]: (
		event: React.SyntheticEvent<HTMLElement>,
		newValue?: string,
	) => void
} {
	return useMemo(() => {
		const handlers = {}

		for (const l of Object.keys(noisyCountThreshold)) {
			handlers[+l] = (_event, newValue?) => {
				const val = +(newValue || 0)
				if (!isNaN(val)) {
					setNoisyCountThreshold(prev => ({ ...prev, [l]: val }))
				}
			}
		}
		return handlers
	}, [noisyCountThreshold, setNoisyCountThreshold])
}
