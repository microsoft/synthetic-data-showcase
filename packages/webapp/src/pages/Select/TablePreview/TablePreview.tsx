/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { ArqueroDetailsList } from '@essex/arquero-react'
import { useTheme } from '@fluentui/react'
import type { FC } from 'react'
import { memo, useMemo } from 'react'
import styled from 'styled-components'

import { useSensitiveContent } from '~states'

export const TablePreview: FC = memo(function TablePreview() {
	const [sensitiveContent] = useSensitiveContent()
	const theme = useTheme()

	const visibleColumns = useMemo(() => {
		return sensitiveContent.headers.filter(h => h.use).map(h => h.name)
	}, [sensitiveContent])

	if (!visibleColumns.length) return <></>

	return (
		<Container>
			<ArqueroDetailsList
				table={sensitiveContent.table}
				metadata={sensitiveContent.metadata}
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
						border: `1px solid ${theme.palette.neutralLight}`,
					},
				}}
			/>
		</Container>
	)
})
TablePreview.displayName = 'TablePreview'

const Container = styled.div`
	height: 100%;
	min-height: 150px;
`
