/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import type { PropsWithChildren, RefObject } from 'react'
import type { DropzoneOptions } from 'react-dropzone'

import type { Expand } from '../types/expand.js'
export type FileDropContextType = () => void

export type FileDropRef = {
	open: () => void
}

export type FileDropProps = Expand<
	Omit<DropzoneOptions, 'accept'> &
		PropsWithChildren<{
			accept?: string | string[]
			onDragMessage?: string
			ref?: RefObject<FileDropRef>
			slotClassNames?: FileDropSlotClassNames
		}>
>

export enum FileDropSlots {
	Overlay = 'Overlay',
	OverlayMessage = 'OverlayMessage',
}

export type FileDropSlotClassNames = Partial<Record<FileDropSlots, string>>
