/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import mime from 'mime'
import type { ElementType, FC, RefObject } from 'react'
import { forwardRef, memo, useImperativeHandle, useMemo } from 'react'
import type { DropzoneOptions } from 'react-dropzone'
import { useDropzone } from 'react-dropzone'
import styled from 'styled-components'

import { FileDropContext } from './context'

export type FileDropRef = {
	open: () => void
}

export interface FileDropProps extends DropzoneOptions {
	onDragMessage?: ElementType
	divOverlay?: ElementType
	ref?: RefObject<FileDropRef>
}

export const FileDrop: FC<FileDropProps> = memo(
	forwardRef(function FileDrop(props, ref) {
		const accept = useMemo(() => {
			if (props.accept) {
				return (
					Array.isArray(props.accept) ? props.accept : props.accept.split(',')
				)
					.reduce<string[]>((acc, file) => {
						const mimeType = file.startsWith('.')
							? mime.getType(file.trim())
							: file
						if (!mimeType) {
							throw new Error(`Unable to determine MIME type for ${file}`)
						}
						acc.push(file)
						if (mimeType !== file) acc.push(mimeType)
						return acc
					}, [])
					.join(',')
			}
			return undefined
		}, [props.accept])
		const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
			...props,
			...(accept && { accept }),
		})

		const DivOverlay = useMemo(() => {
			return props.divOverlay ?? DefaultDivOverlay
		}, [props.divOverlay])

		const DragMessage = useMemo(() => {
			return props.onDragMessage ?? (() => <>Drop files.</>)
		}, [props.onDragMessage])

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

const DefaultDivOverlay = styled.div`
	position: fixed;
	display: flex;
	justify-content: center;
	align-items: center;
	top: 0;
	left: 0;
	z-index: 1000000;
	width: 100vw;
	height: 100vh;
	background-color: ${p => p.theme.palette.neutralTertiaryAlt};
	font-weight: bold;
	color: ${p => p.theme.palette.black};
	opacity: 0.6;
`
