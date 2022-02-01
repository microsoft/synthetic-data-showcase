/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { ColumnTransformModal } from '@data-wrangling-components/react'
import {
	getTheme,
	IStackStyles,
	IStackTokens,
	MessageBar,
	MessageBarType,
	Stack,
} from '@fluentui/react'
import { useBoolean } from '@fluentui/react-hooks'
import { memo } from 'react'
import { CsvTable } from './CsvTable'
import {
	useIsMicrodataIdValid,
	useOnFileChange,
	useOnTableChange,
	useOnTransformColumn,
	useSensitiveTableCommands,
	useVisibleColumnNames,
} from './hooks'
import { InfoTooltip } from '~components/InfoTooltip'
import { FileInputButton } from '~components/controls'
import { useSensitiveContent } from '~states'
import { tooltips } from '~ui-tooltips'

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

	const isMicrodataIdValid = useIsMicrodataIdValid(sensitiveContent)

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
			{!isMicrodataIdValid && (
				<Stack.Item>
					<MessageBar
						messageBarType={MessageBarType.warning}
					>{`Your microdata ID "${sensitiveContent.microdataId}" has duplicated values.`}</MessageBar>
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
