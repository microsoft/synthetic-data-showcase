/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import {
	Checkbox,
	getTheme,
	IconButton,
	IIconProps,
	IStackStyles,
	IStackTokens,
	Label,
	Stack,
	TextField,
} from '@fluentui/react'
import { parse } from 'papaparse'
import { memo, useCallback, useRef } from 'react'
import { defaultCsvContent, ICsvTableHeader } from 'src/models/csv'
import { CsvTable } from './CsvTable'
import { DataBinning } from '~components/DataBinning'
import { defaultEvaluatedResult, defaultNavigateResult } from '~models'
import {
	useEvaluatedResultSetter,
	useIsProcessing,
	useNavigateResultSetter,
	useRecordLimit,
	useSensitiveContent,
	useSyntheticContentSetter,
	useWasmWorkerValue,
} from '~states'

const openFileIcon: IIconProps = { iconName: 'FabricOpenFolderHorizontal' }

export const DataInput: React.FC = memo(function DataInput() {
	const [recordLimit, setRecordLimit] = useRecordLimit()
	const [isProcessing, setIsProcessing] = useIsProcessing()
	const [sensitiveContent, setSensitiveContent] = useSensitiveContent()
	const setSyntheticContent = useSyntheticContentSetter()
	const setEvaluatedResult = useEvaluatedResultSetter()
	const setNavigateResult = useNavigateResultSetter()
	const worker = useWasmWorkerValue()

	const inputFile = useRef<HTMLInputElement>(null)

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

	const onFileChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			const f = e.target.files?.[0]

			if (f) {
				setIsProcessing(true)
				setSyntheticContent(defaultCsvContent)
				setEvaluatedResult(defaultEvaluatedResult)
				setNavigateResult(defaultNavigateResult)
				parse<Array<string>>(f, {
					complete: async results => {
						const headers =
							results.data[0]?.map(
								(h, i) =>
									({
										name: h,
										fieldName: i.toString(),
										use: true,
										hasSensitiveZeros: false,
									} as ICsvTableHeader),
							) ?? []
						const items = results.data?.slice(1) ?? []

						setIsProcessing(false)
						setSensitiveContent({
							headers,
							items,
							columnsWithZeros: await worker?.findColumnsWithZeros(items),
							delimiter: results.meta.delimiter,
						})
					},
				})
			}
		},
		[
			worker,
			setIsProcessing,
			setSyntheticContent,
			setEvaluatedResult,
			setNavigateResult,
			setSensitiveContent,
		],
	)

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
						<IconButton
							iconProps={openFileIcon}
							title="Load file"
							ariaLabel="Load File"
							onClick={() => {
								inputFile.current?.click()
							}}
						/>
						<input
							type="file"
							multiple={false}
							disabled={isProcessing}
							onChange={onFileChange}
							ref={inputFile}
							style={{ display: 'none' }}
						/>
					</Stack.Item>
				</Stack>
			</Stack.Item>

			{sensitiveContent.items.length && (
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

			{sensitiveContent.items.length && (
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
					pageSize={10}
					downloadAlias="sensitive_data"
					disable={isProcessing}
					takeFirstItems={recordLimit}
				/>
			</Stack.Item>
		</Stack>
	)
})
