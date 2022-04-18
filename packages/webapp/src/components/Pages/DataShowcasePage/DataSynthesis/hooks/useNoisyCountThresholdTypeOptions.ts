/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import type { IDropdownOption } from '@fluentui/react'

import { NoisyCountThresholdType } from '~models'

const noisyCountThresholdTypeOptions = [
	{ key: NoisyCountThresholdType.Fixed, text: NoisyCountThresholdType.Fixed },
	{
		key: NoisyCountThresholdType.Adaptive,
		text: NoisyCountThresholdType.Adaptive,
	},
	{
		key: NoisyCountThresholdType.MaxFabrication,
		text: NoisyCountThresholdType.MaxFabrication,
	},
]

export function useNoisyCountThresholdTypeOptions(): IDropdownOption[] {
	return noisyCountThresholdTypeOptions
}
