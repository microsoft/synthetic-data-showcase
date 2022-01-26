/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { IDropdownOption } from '@fluentui/react'
import { SynthesisMode } from '~models'

const synthesisModeOptions = [
	{ key: SynthesisMode.Seeded, text: 'Seeded' },
	{ key: SynthesisMode.Unseeded, text: 'Unseeded' },
]

export function useSynthesisModeOptions(): IDropdownOption[] {
	return synthesisModeOptions
}
