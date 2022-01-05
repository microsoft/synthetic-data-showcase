/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import {
	Checkbox,
	getTheme,
	IStackStyles,
	IStackTokens,
	Label,
	Stack,
	TextField,
} from '@fluentui/react'
import { memo } from 'react'
import { CsvTable } from './CsvTable'
import { useOnFileChange } from './hooks'
import { DataBinning } from '~components/DataBinning'
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

	const sensitiveColumnsWithZeros = sensitiveContent.columnsWithZeros?.filter(
		i => sensitiveContent.headers[i].use,
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
						<FileInputButton onChange={onFileChange} disabled={isProcessing} />
					</Stack.Item>
				</Stack>
			</Stack.Item>

			{sensitiveContent.table.numCols() > 0 && (
				<>
					<Stack.Item>
						<Label>Use columns</Label>
					</Stack.Item>
					<Stack.Item>
						<Stack wrap horizontal tokens={{ childrenGap: theme.spacing.s1 }}>
							{sensitiveContent.headers.map((h, i) => (
								<Checkbox
									key={`${h.name}-${h.use}`}
									label={h.name}
									checked={h.use}
									disabled={isProcessing}
									onChange={() => {
										setSensitiveContent({
											...sensitiveContent,
											headers: [
												...sensitiveContent.headers.slice(0, i),
												{
													...sensitiveContent.headers[i],
													use: !sensitiveContent.headers[i].use,
												},
												...sensitiveContent.headers.slice(i + 1),
											],
										})
									}}
								/>
							))}
						</Stack>
					</Stack.Item>
				</>
			)}

			{sensitiveColumnsWithZeros?.length && (
				<>
					<Stack.Item>
						<Label>Sensitive zeros</Label>
					</Stack.Item>
					<Stack.Item>
						<Stack wrap horizontal tokens={{ childrenGap: theme.spacing.s1 }}>
							{sensitiveColumnsWithZeros.map(i => {
								const h = sensitiveContent.headers[i]
								return (
									<Checkbox
										key={`${h.name}-${h.use}`}
										label={h.name}
										checked={h.hasSensitiveZeros}
										disabled={isProcessing}
										onChange={() => {
											setSensitiveContent({
												...sensitiveContent,
												headers: [
													...sensitiveContent.headers.slice(0, i),
													{
														...sensitiveContent.headers[i],
														hasSensitiveZeros:
															!sensitiveContent.headers[i].hasSensitiveZeros,
													},
													...sensitiveContent.headers.slice(i + 1),
												],
											})
										}}
									/>
								)
							})}
						</Stack>
					</Stack.Item>
				</>
			)}

			{sensitiveContent.table.numCols() > 0 && (
				<>
					<Stack.Item>
						<Label>Data binning</Label>
					</Stack.Item>
					<Stack.Item>
						<DataBinning />
					</Stack.Item>
				</>
			)}

			<Stack.Item>
				<CsvTable
					content={sensitiveContent}
					downloadAlias="sensitive_data"
					takeFirstItems={recordLimit}
				/>
			</Stack.Item>
		</Stack>
	)
})
