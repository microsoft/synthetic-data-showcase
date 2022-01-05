/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { IconButton, IIconProps } from '@fluentui/react'
import { FC, ChangeEvent, useRef } from 'react'

const openFileIcon: IIconProps = { iconName: 'FabricOpenFolderHorizontal' }

export interface FileInputButtonProps {
	onChange: (e: ChangeEvent<HTMLInputElement>) => void
	disabled?: boolean
}

export const FileInputButton: FC<FileInputButtonProps> = ({
	onChange,
	disabled,
}) => {
	const inputFile = useRef<HTMLInputElement>(null)

	return (
		<>
			<IconButton
				iconProps={openFileIcon}
				title="Load file"
				ariaLabel="Load File"
				onClick={() => {
					inputFile.current?.click()
				}}
			/>
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
