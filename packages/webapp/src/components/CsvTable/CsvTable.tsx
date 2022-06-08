/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { ArqueroDetailsList, ArqueroTableHeader } from '@essex/arquero-react'
import type { ICommandBarItemProps } from '@fluentui/react'
import { CommandBar, Stack } from '@fluentui/react'
import { useThematic } from '@thematic/react'
import { memo, useMemo } from 'react'
import styled from 'styled-components'

import type { ICsvContent } from '~models/csv'

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

	const commandBar = useMemo(() => {
		if (!commands.length) {
			return <></>
		}
		return (
			<StyledCommandBar
				items={commands}
				styles={{
					root: {
						background: thematic.application().accent().hex(),
						height: '100%',
					},
				}}
			/>
		)
	}, [commands, thematic])

	if (content.table.numCols() === 0) {
		return <></>
	}

	return (
		<Stack>
			<Stack.Item>
				<ArqueroTableHeader
					table={content.table}
					commandBar={commandBar}
					visibleColumns={visibleColumns}
					showColumnCount={true}
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

const StyledCommandBar = styled(CommandBar)`
	& button,
	& button:hover {
		color: ${p => p.theme.palette.neutralLight} !important;
		background: ${p => p.theme.palette.themePrimary};

		& i,
		& i:hover {
			color: ${p => p.theme.palette.neutralLight} !important;
		}
	}
`
