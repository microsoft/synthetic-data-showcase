/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import type { FC, PropsWithChildren } from 'react'
import React, { forwardRef, memo, useImperativeHandle, useMemo } from 'react'

import { FileDropContext } from './FileDrop.context.js'
import { useFileDrop } from './FileDrop.hooks.js'
import { useFileDropStyles } from './FileDrop.styles.js'
import type { FileDropProps } from './FileDrop.types.js'

export const FileDrop: FC<FileDropProps> = memo(
	forwardRef(function FileDrop(props, ref) {
		const { getRootProps, getInputProps, isDragActive, open } =
			useFileDrop(props)
		const classes = useFileDropStyles(props.slotClassNames)
		const DivOverlay = useMemo(() => {
			return (
				props.divOverlay ??
				((({ children }) => {
					return <div className={classes.Overlay}>{children}</div>
				}) as FC<
					PropsWithChildren<{
						/* nothing */
					}>
				>)
			)
		}, [props.divOverlay, classes])

		const DragMessage = useMemo(() => {
			return (
				props.onDragMessage ??
				(() => <span className={classes.OverlayMessage}>Drop files.</span>)
			)
		}, [props.onDragMessage, classes])

		useImperativeHandle(ref, () => ({ open }), [open])

		return (
			<FileDropContext.Provider value={open}>
				<span {...getRootProps()}>
					<input {...getInputProps()} />
					{isDragActive && (
						<DivOverlay>
							<DragMessage />
						</DivOverlay>
					)}
					{props.children}
				</span>
			</FileDropContext.Provider>
		)
	}),
)
FileDrop.displayName = 'FileDrop'
