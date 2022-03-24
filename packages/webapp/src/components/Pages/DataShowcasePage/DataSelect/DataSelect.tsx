/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import type { IStackStyles, IStackTokens } from '@fluentui/react'
import { getTheme, Stack } from '@fluentui/react'
import type { FC } from 'react'
import { memo } from 'react'

import { CsvTable } from '~components/CsvTable'
import { ErrorMessageBar } from '~components/ErrorMessageBar'
import { useSensitiveContent } from '~states'

import {
	useOnTableChange,
	useSensitiveTableCommands,
	useSubjectIdErrorMessage,
	useVisibleColumnNames,
} from './hooks'

export const DataSelect: FC = memo(function DataSelect() {
	useOnTableChange()
	const [sensitiveContent, setSensitiveContent] = useSensitiveContent()
	const subjectIdErrorMessage = useSubjectIdErrorMessage(sensitiveContent)

	const theme = getTheme()

	const mainStackStyles: IStackStyles = {
		root: {
			display: 'flex',
			marginTop: theme.spacing.s2,
			marginLeft: theme.spacing.l1,
			marginRight: theme.spacing.l1,
		},
	}

	const mainStackTokens: IStackTokens = {
		childrenGap: theme.spacing.s1,
	}

	const visibleColumns = useVisibleColumnNames(sensitiveContent)

	const tableCommands = useSensitiveTableCommands(
		sensitiveContent,
		setSensitiveContent,
	)

	return (
		<Stack styles={mainStackStyles} tokens={mainStackTokens}>
			<Stack.Item>
				<ErrorMessageBar message={subjectIdErrorMessage} />
			</Stack.Item>
			<Stack.Item>
				<CsvTable
					content={sensitiveContent}
					commands={tableCommands}
					visibleColumns={visibleColumns}
				/>
			</Stack.Item>
		</Stack>
	)
})
