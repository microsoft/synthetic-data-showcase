/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import type { IIconProps } from '@fluentui/react'
import { ActionButton, Stack, useTheme } from '@fluentui/react'
import type { FC } from 'react'
import { useRef } from 'react'
import styled from 'styled-components'

import type { DownloadInfo } from './DownloadInfo'
import { useDownloadOnClick } from './hooks'

const downloadIcon: IIconProps = { iconName: 'Download' }

export interface DownloadButtonProps {
	onGetDownloadInfo: () => Promise<DownloadInfo | undefined>
	title?: string
	label?: string
	disabled?: boolean
}

export const DownloadButton: FC<DownloadButtonProps> = ({
	onGetDownloadInfo,
	title,
	label,
	disabled,
}) => {
	const downloadAnchorRef = useRef<HTMLAnchorElement>(null)
	const theme = useTheme()
	const downloadOnClick = useDownloadOnClick(
		downloadAnchorRef,
		onGetDownloadInfo,
	)

	return (
		<Stack horizontal tokens={{ childrenGap: theme.spacing.s1 }}>
			<ActionButton
				iconProps={downloadIcon}
				onClick={downloadOnClick}
				disabled={disabled}
				title={title}
			>
				{label}
			</ActionButton>
			<DownloadAnchor ref={downloadAnchorRef} />
		</Stack>
	)
}

const DownloadAnchor = styled.a`
	display: none;
`
