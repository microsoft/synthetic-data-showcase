/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import type { ISynthesisInfo } from '~workers/types'

export type OnSynthesisSelectedCallback = (synthesis: ISynthesisInfo) => void

export interface SynthesisDropdownProps {
	allSynthesisInfo: ISynthesisInfo[]
	selectedSynthesis: ISynthesisInfo | null
	onChange?: OnSynthesisSelectedCallback
	disabled?: boolean
}
