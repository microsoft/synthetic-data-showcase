/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { ArqueroDetailsList } from '@data-wrangling-components/react'
import { IconButton, IIconProps, Stack, useTheme } from '@fluentui/react'
import { memo, useRef } from 'react'
import styled from 'styled-components'
import { useLimit, useOnDownloadCsvContent } from './hooks'
import { ICsvContent } from '~models/csv'

const downloadIcon: IIconProps = { iconName: 'Download' }

export interface ICsvTableProps {
	content: ICsvContent
	downloadAlias: string
	takeFirstItems?: number
}

export const CsvTable: React.FC<ICsvTableProps> = memo(function CsvTable({
	content,
	downloadAlias,
	takeFirstItems,
}: ICsvTableProps) {
	const downloadAnchorRef = useRef<HTMLAnchorElement>(null)

	const theme = useTheme()

	const nItems = useLimit(content.table, takeFirstItems)

	const onDownload = useOnDownloadCsvContent(
		downloadAnchorRef,
		content,
		nItems,
		downloadAlias,
	)

	if (content.table.numCols() === 0) {
		return <></>
	}

	return (
		<Stack>
			<Stack
				horizontal
				horizontalAlign="end"
				tokens={{ childrenGap: theme.spacing.s1 }}
			>
				<Stack.Item align="end">
					<Stack horizontal tokens={{ childrenGap: theme.spacing.s1 }}>
						<IconButton iconProps={downloadIcon} onClick={onDownload} />
						<DownloadAnchor ref={downloadAnchorRef} />
					</Stack>
				</Stack.Item>
			</Stack>
			<ArqueroDetailsList
				table={content.table}
				features={{
					histogramColumnHeaders: true,
					statsColumnHeaders: true,
				}}
				isSortable
				showColumnBorders
			/>
		</Stack>
	)
})

const DownloadAnchor = styled.a`
	display: none;
`
