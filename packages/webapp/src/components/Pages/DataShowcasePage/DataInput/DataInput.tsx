/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { ColumnTransformModal } from '@data-wrangling-components/react'
import type { IStackStyles, IStackTokens } from '@fluentui/react'
import { getTheme, MessageBar, MessageBarType, Stack } from '@fluentui/react'
import { useBoolean } from '@fluentui/react-hooks'
import { memo } from 'react'

import { FileInputButton } from '~components/controls'
import { CsvTable } from '~components/CsvTable'
import { InfoTooltip } from '~components/InfoTooltip'
import { useSensitiveContent } from '~states'
import { tooltips } from '~ui-tooltips'

import {
	useOnFileChange,
	useOnTableChange,
	useOnTransformColumn,
	useSensitiveTableCommands,
	useSubjectIdErrorMessage,
	useVisibleColumnNames,
} from './hooks'

export const DataInput: React.FC = memo(function DataInput() {
	const [sensitiveContent, setSensitiveContent] = useSensitiveContent()
	const onFileChange = useOnFileChange(setSensitiveContent)
	const updateTable = useOnTableChange(setSensitiveContent)

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

	const subStackTokens: IStackTokens = {
		childrenGap: theme.spacing.s1,
	}

	const visibleColumns = useVisibleColumnNames(sensitiveContent)

	const [isModalOpen, { setTrue: showModal, setFalse: hideModal }] =
		useBoolean(false)

	const tableCommands = useSensitiveTableCommands(
		sensitiveContent,
		setSensitiveContent,
		showModal,
	)

	const handleTransformRequested = useOnTransformColumn(
		sensitiveContent,
		updateTable,
	)

	const subjectIdErrorMessage = useSubjectIdErrorMessage(sensitiveContent)

	return (
		<Stack styles={mainStackStyles} tokens={mainStackTokens}>
			<ColumnTransformModal
				headerText={'Transform column'}
				table={sensitiveContent.table}
				isOpen={isModalOpen}
				onDismiss={hideModal}
				onTransformRequested={handleTransformRequested}
				hideOutputColumn
			/>
			<Stack.Item>
				<Stack tokens={subStackTokens} horizontal>
					<Stack.Item align="end">
						<FileInputButton onChange={onFileChange} disabled={false}>
							Open sensitive data file
						</FileInputButton>
					</Stack.Item>
					<Stack.Item align="center">
						<InfoTooltip>{tooltips.sensitiveFile}</InfoTooltip>
					</Stack.Item>
				</Stack>
			</Stack.Item>
			{subjectIdErrorMessage && (
				<Stack.Item>
					<MessageBar messageBarType={MessageBarType.error}>
						{subjectIdErrorMessage}
					</MessageBar>
				</Stack.Item>
			)}
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
