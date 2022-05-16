/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import type { ISynthesisInfo } from '~workers/types'

export interface AllSynthesisInfoProps {
	allSynthesisInfo: ISynthesisInfo[]
	selectedKey?: string
	onSelected?: (newKey: string | undefined) => void
	onDelete?: (key: string) => void
}
