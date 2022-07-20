/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import type { IIconProps } from '@fluentui/react'
import { ActionButton } from '@fluentui/react'
import type { ChangeEvent, FC, PropsWithChildren } from 'react'
import { useRef } from 'react'

const openFileIcon: IIconProps = { iconName: 'FabricOpenFolderHorizontal' }

export type FileInputButtonProps = PropsWithChildren<{
	onChange: (e: ChangeEvent<HTMLInputElement>) => void
	disabled?: boolean
}>

export const FileInputButton: FC<FileInputButtonProps> = ({
	onChange,
	disabled,
	children,
}) => {
	const inputFile = useRef<HTMLInputElement>(null)
	return (
		<>
			<ActionButton
				iconProps={openFileIcon}
				title="Load file"
				ariaLabel="Load File"
				onClick={() => {
					inputFile.current?.click()
				}}
			>
				{children}
			</ActionButton>
			<input
				type="file"
				multiple={false}
				disabled={disabled}
				onChange={onChange}
				ref={inputFile}
				style={{ display: 'none' }}
			/>
		</>
	)
}
