/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import {
	ArqueroTableHeader,
	ArqueroDetailsList,
} from '@data-wrangling-components/react'
import { ICommandBarItemProps, Stack } from '@fluentui/react'
import { useThematic } from '@thematic/react'
import { memo } from 'react'
import { ICsvContent } from '~models/csv'

export interface ICsvTableProps {
	content: ICsvContent
	commands?: ICommandBarItemProps[]
	visibleColumns?: string[]
}

export const CsvTable: React.FC<ICsvTableProps> = memo(function CsvTable({
	content,
	commands = [],
	visibleColumns,
}: ICsvTableProps) {
	const thematic = useThematic()

	if (content.table.numCols() === 0) {
		return <></>
	}

	return (
		<Stack>
			<Stack.Item>
				<ArqueroTableHeader
					table={content.table}
					commands={commands}
					visibleColumns={visibleColumns}
				/>
				<ArqueroDetailsList
					table={content.table}
					metadata={content.metadata}
					features={{
						histogramColumnHeaders: true,
						statsColumnHeaders: true,
					}}
					isSortable
					isHeadersFixed
					showColumnBorders
					visibleColumns={visibleColumns}
					styles={{
						root: {
							height: 800,
							border: `1px solid ${thematic.application().faint().hex()}`,
						},
					}}
				/>
			</Stack.Item>
		</Stack>
	)
})
