/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { FlexContainer } from '@sds/components'
import type { FC } from 'react'
import { memo, useMemo } from 'react'
import styled from 'styled-components'

import { useSensitiveContent } from '~states'

export const InfoBar: FC = memo(function InfoBar() {
	const [sensitiveContent] = useSensitiveContent()

	const stats = useMemo(() => {
		const subjectId = sensitiveContent.subjectId
		const rowCount = sensitiveContent.table.numRows()
		const data = sensitiveContent.headers.reduce(
			(acc, cur) => {
				const colStats = sensitiveContent.metadata?.columns[cur.name]
				if (cur.use && colStats && cur.name !== subjectId) {
					acc.count += 1
					acc.unique += colStats.stats?.distinct ?? 0
					acc.combinations *= colStats.stats?.distinct ?? 1
				}

				return acc
			},
			{ count: 0, unique: 0, combinations: 1 },
		)

		if (data.count) {
			return `${data.count} columns and ${rowCount} records.` // with ${data.combinations} maximum possible combimations`
		} else {
			return '0 columns selected'
		}
	}, [sensitiveContent])

	return <Container justify="center">{stats}</Container>
})
InfoBar.displayName = 'InfoBar'

const Container = styled(FlexContainer)`
	padding: ${p => p.theme.spacing.m};
	font-size: ${p => p.theme.fonts.large.fontSize};
`
