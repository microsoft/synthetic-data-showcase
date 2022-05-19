/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { makeStyles } from '@griffel/react'

import { useMergeAllClasses } from '../hooks/useMergeAllClasses.js'
import type { FileDropSlotClassNames, FileDropSlots } from './FileDrop.types.js'

export const useDefaultStyles = makeStyles<FileDropSlots>({
	Overlay: {
		position: 'fixed',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		top: 0,
		left: 0,
		zIndex: 1000000,
		width: '100vw',
		height: '100vh',
		fontWeight: 'bold',
		opacity: 0.6,
		backgroundColor: 'var(--neutralTertiaryAlt, #c8c6c4)',
		color: 'var(--black, #000000)',
	},
	OverlayMessage: {},
})

export function useFileDropStyles(
	slotClassNames?: FileDropSlotClassNames,
): FileDropSlotClassNames {
	const defaultClasses = useDefaultStyles()
	return useMergeAllClasses<FileDropSlots>(defaultClasses, slotClassNames)
}
