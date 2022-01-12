/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import {
	getTheme,
	IStackStyles,
	IStackTokens,
	Label,
	Stack,
	TextField,
} from '@fluentui/react'
import { memo } from 'react'
import { CsvTable } from './CsvTable'
import {
	useOnFileChange,
	useOnTableChange,
	useSensitiveTableCommands,
	useVisibleColumnNames,
} from './hooks'
import { DataTransform } from '~components/DataTransform'
import { FileInputButton } from '~components/controls'
import {
	useClearSensitiveData,
	useIsProcessing,
	useRecordLimit,
	useSensitiveContent,
} from '~states'

export const DataInput: React.FC = memo(function DataInput() {
	const [recordLimit, setRecordLimit] = useRecordLimit()
	const [isProcessing, setIsProcessing] = useIsProcessing()
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

	const tableCommands = useSensitiveTableCommands(
		sensitiveContent,
		setSensitiveContent,
	)

	return (
		<Stack styles={mainStackStyles} tokens={mainStackTokens}>
			<Stack.Item>
				<h3>Input file with sensitive records</h3>
			</Stack.Item>
			<Stack.Item>
				<Stack tokens={subStackTokens} horizontal>
					<Stack.Item>
						<TextField
							label="Record Limit"
							type="number"
							value={recordLimit.toString()}
							disabled={isProcessing}
							required
							onChange={(_, newValue) => setRecordLimit(+(newValue ?? 0))}
						/>
					</Stack.Item>
					<Stack.Item align="end">
						<FileInputButton onChange={onFileChange} disabled={false} />
					</Stack.Item>
				</Stack>
			</Stack.Item>
			{sensitiveContent.table.numCols() > 0 && (
				<>
					<Stack.Item>
						<Label>Data transform</Label>
					</Stack.Item>
					<Stack.Item>
						<DataTransform
							table={sensitiveContent.table}
							onChange={updateTable}
						/>
					</Stack.Item>
				</>
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
