/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import type { ISynthesisInfo } from '~workers/types'

export type SelectSynthesisInfoCallback = (
	newSelection: ISynthesisInfo | null,
) => void | Promise<void>

export type DeleteSynthesisInfoCallback = (
	selection: ISynthesisInfo,
) => void | Promise<void>

export interface AllSynthesisInfoProps {
	allSynthesisInfo: ISynthesisInfo[]
	selectedSynthesisInfo: ISynthesisInfo | null
	onSelected?: SelectSynthesisInfoCallback
	onDelete?: DeleteSynthesisInfoCallback
}
