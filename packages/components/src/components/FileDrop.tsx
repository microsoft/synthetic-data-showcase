/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import type { FC } from 'react'
import React, { forwardRef, memo, useImperativeHandle } from 'react'

import { FileDropContext } from './FileDrop.context.js'
import { useFileDrop } from './FileDrop.hooks.js'
import { useFileDropStyles } from './FileDrop.styles.js'
import type { FileDropProps } from './FileDrop.types.js'

export const FileDrop: FC<FileDropProps> = memo(
	forwardRef(function FileDrop(props, ref) {
		const { getRootProps, getInputProps, isDragActive, open } =
			useFileDrop(props)
		const classes = useFileDropStyles(props.slotClassNames)

		useImperativeHandle(ref, () => ({ open }), [open])

		return (
			<FileDropContext.Provider value={open}>
				<span {...getRootProps()}>
					<input {...getInputProps()} />
					{isDragActive && (
						<div className={classes.Overlay}>
							<span className={classes.OverlayMessage}>
								{props.onDragMessage ?? 'Drop files.'}
							</span>
						</div>
					)}
					{props.children}
				</span>
			</FileDropContext.Provider>
		)
	}),
)
FileDrop.displayName = 'FileDrop'
