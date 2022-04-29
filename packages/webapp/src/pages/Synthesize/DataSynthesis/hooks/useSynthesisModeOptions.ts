/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import type { IDropdownOption } from '@fluentui/react'

import { SynthesisMode } from '~models'

const synthesisModeOptions = [
	{ key: SynthesisMode.Unseeded, text: SynthesisMode.Unseeded },
	{ key: SynthesisMode.RowSeeded, text: SynthesisMode.RowSeeded },
	{ key: SynthesisMode.ValueSeeded, text: SynthesisMode.ValueSeeded },
	{ key: SynthesisMode.AggregateSeeded, text: SynthesisMode.AggregateSeeded },
	{ key: SynthesisMode.DP, text: SynthesisMode.DP },
]

export function useSynthesisModeOptions(): IDropdownOption[] {
	return synthesisModeOptions
}
