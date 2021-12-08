/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import {
	DetailsList,
	DetailsListLayoutMode,
	IColumn,
	IconButton,
	IIconProps,
	Label,
	SelectionMode,
	Stack,
	TextField,
	useTheme,
} from '@fluentui/react'
import { memo, useRef, useState } from 'react'
import { ICsvContent } from 'src/models/csv'
import styled from 'styled-components'
import { useOnDownloadCsvContent } from './hooks'

const downloadIcon: IIconProps = { iconName: 'Download' }

export interface ICsvTableProps {
	content: ICsvContent
	pageSize: number
	downloadAlias: string
	disable?: boolean
	takeFirstItems?: number
}

export const CsvTable: React.FC<ICsvTableProps> = memo(function CsvTable(
	props: ICsvTableProps,
) {
	const [currentPage, setCurrentPage] = useState(1)

	const downloadAnchorRef = useRef<HTMLAnchorElement>(null)

	const theme = useTheme()

	const columns: IColumn[] = props.content.headers
		.filter(h => h.use)
		.map(h => ({
			key: h.name,
			name: h.name,
			fieldName: h.fieldName,
			minWidth: 100,
			maxWidth: 100,
			isResizable: true,
		}))

	const nItems = props.takeFirstItems
		? Math.min(props.content.items.length, props.takeFirstItems)
		: props.content.items.length

	const nPages = Math.ceil(nItems / props.pageSize)

	const start = (currentPage - 1) * props.pageSize

	let items = props.content.items

	if (nItems !== items.length) {
		items = items.slice(0, nItems)
	}

	const onDownload = useOnDownloadCsvContent(
		downloadAnchorRef,
		props.content,
		nItems,
		props.downloadAlias,
	)

	items = items.slice(start, start + props.pageSize)

	if (!nPages) {
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
						<TextField
							type="number"
							value={currentPage.toString()}
							disabled={props.disable}
							onChange={(_, newValue) =>
								setCurrentPage(Math.min(Math.max(+(newValue ?? 0), 1), nPages))
							}
						/>
						<Label>{`/ ${nPages}`}</Label>
						<IconButton iconProps={downloadIcon} onClick={onDownload} />
						<DownloadAnchor ref={downloadAnchorRef} />
					</Stack>
				</Stack.Item>
			</Stack>
			<DetailsList
				styles={{
					root: {
						height: 510,
					},
				}}
				selectionMode={SelectionMode.none}
				layoutMode={DetailsListLayoutMode.justified}
				columns={columns}
				items={items}
			/>
		</Stack>
	)
})

const DownloadAnchor = styled.a`
	display: none;
`
