/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import mime from 'mime'
import { useContext, useMemo } from 'react'
import type { DropzoneState } from 'react-dropzone'
import { useDropzone } from 'react-dropzone'

import { FileDropContext } from './FileDrop.context.js'
import type { FileDropContextType, FileDropProps } from './FileDrop.types.js'

export function useFileDropOpen(): FileDropContextType {
	return useContext(FileDropContext)
}

export function useFileDrop(props: FileDropProps): DropzoneState {
	const accept = useMemo(() => {
		if (props.accept) {
			return (
				Array.isArray(props.accept) ? props.accept : props.accept.split(',')
			).reduce<Record<string, string[]>>((acc, file) => {
				file = file.trim()
				const mimeType = file.startsWith('.') ? mime.getType(file) : file
				if (!mimeType) {
					throw new Error(`Unable to determine MIME type for ${file}`)
				}
				acc[mimeType] = [
					...(Array.isArray(acc[mimeType]) ? acc[mimeType] : []),
					file,
				]
				return acc
			}, {})
		}
		return undefined
	}, [props.accept])

	return useDropzone({
		...{
			...props,
			accept: undefined,
		},
		...(accept && { accept }),
	})
}
