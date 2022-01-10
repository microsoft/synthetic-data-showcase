/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import {
	Stack,
} from '@fluentui/react'
import { ArqueroTableHeader, ArqueroDetailsList } from '@data-wrangling-components/react'
import { useThematic } from '@thematic/react'
import { memo} from 'react'
import  { ThemeProvider } from 'styled-components'
import { ICsvContent } from '~models/csv'

export interface ICsvTableProps {
	content: ICsvContent
	downloadAlias?: string
}

export const CsvTable: React.FC<ICsvTableProps> = memo(function CsvTable({
	content,
	downloadAlias = 'download.csv',
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
				<ArqueroTableHeader table={content.table} allowDownload downloadName={downloadAlias} />
				<ArqueroDetailsList
					table={content.table}
					features={{
						histogramColumnHeaders: true,
						statsColumnHeaders: true,
					}}
					isSortable
					showColumnBorders
					styles={{root: {
						width: '100%'
					}}}
				/>
			</ThemeProvider>
			</Stack.Item>
			</Stack>
	)
})
