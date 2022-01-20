/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import { ColumnTransformModal } from '@data-wrangling-components/react'
import { getTheme, IStackStyles, IStackTokens, Stack } from '@fluentui/react'
import { useBoolean } from '@fluentui/react-hooks'
import { useThematic } from '@thematic/react'
import { memo } from 'react'
import { ThemeProvider } from 'styled-components'
import { CsvTable } from './CsvTable'
import {
	useOnFileChange,
	useOnTableChange,
	useOnTransformColumn,
	useSensitiveTableCommands,
	useVisibleColumnNames,
} from './hooks'
import { FileInputButton } from '~components/controls'
import {
	useClearSensitiveData,
	useIsProcessing,
	useSensitiveContent,
} from '~states'

export const DataInput: React.FC = memo(function DataInput() {
	const [, setIsProcessing] = useIsProcessing()
	const [sensitiveContent, setSensitiveContent] = useSensitiveContent()
	const clearSensitiveData = useClearSensitiveData()
	const onFileChange = useOnFileChange(
		setIsProcessing,
		setSensitiveContent,
		clearSensitiveData,
	)
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

	const thematic = useThematic()
	return (
		<Stack styles={mainStackStyles} tokens={mainStackTokens}>
			<ThemeProvider theme={thematic}>
				<ColumnTransformModal
					headerText={'Transform column'}
					table={sensitiveContent.table}
					isOpen={isModalOpen}
					onDismiss={hideModal}
					onTransformRequested={handleTransformRequested}
					hideOutputColumn
				/>
			</ThemeProvider>
			<Stack.Item>
				<h3>Input file with sensitive records</h3>
			</Stack.Item>
			<Stack.Item>
				<Stack tokens={subStackTokens} horizontal>
					<Stack.Item align="end">
						<FileInputButton onChange={onFileChange} disabled={false} />
					</Stack.Item>
				</Stack>
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
