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
import { ThemeProvider } from 'styled-components'
import { ICsvContent } from '~models/csv'

export interface ICsvTableProps {
	content: ICsvContent
	commands?: ICommandBarItemProps[]
}

export const CsvTable: React.FC<ICsvTableProps> = memo(function CsvTable({
	content,
	commands = [],
}: ICsvTableProps) {
	const thematic = useThematic()

	if (content.table.numCols() === 0) {
		return <></>
	}

	// this ThemeProvider is a bit of a kludge to make sure a thematic theme object is available in our components
	// we need to differentiate the themes in styled-components better (preferably by making a better fluent + thematic union)
	return (
		<Stack>
			<Stack.Item>
				<ThemeProvider theme={thematic}>
					<ArqueroTableHeader table={content.table} commands={commands} />
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
						styles={{
							root: {
								overflowX: 'scroll',
								border: `1px solid ${thematic.application().faint().hex()}`,
							},
						}}
					/>
				</ThemeProvider>
			</Stack.Item>
		</Stack>
	)
})
