/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { introspect } from '@data-wrangling-components/core'
import {
	getTheme,
	IStackStyles,
	IStackTokens,
	Position,
	PrimaryButton,
	SpinButton,
	Stack,
} from '@fluentui/react'
import { memo, useCallback } from 'react'
import { CsvTable } from './CsvTable'
import { useSpinButtonOnChange, useSyntheticTableCommands } from './hooks'
import {
	useCacheSize,
	useClearGenerate,
	useIsProcessing,
	useProcessingProgressSetter,
	useRecordLimit,
	useResolution,
	useSensitiveContentValue,
	useSyntheticContent,
	useWasmWorkerValue,
} from '~states'
import { fromRows, rows, tableHeaders } from '~utils/arquero'

export const DataSynthesis: React.FC = memo(function DataSynthesis() {
	const [resolution, setResolution] = useResolution()
	const [recordLimit, setRecordLimit] = useRecordLimit()
	const [cacheSize, setCacheSize] = useCacheSize()
	const [isProcessing, setIsProcessing] = useIsProcessing()
	const [syntheticContent, setSyntheticContent] = useSyntheticContent()
	const worker = useWasmWorkerValue()

	const sensitiveContent = useSensitiveContentValue()
	const setProcessingProgress = useProcessingProgressSetter()
	const clearGenerate = useClearGenerate()

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

	const onRunGenerate = useCallback(async () => {
		setIsProcessing(true)
		await clearGenerate()
		setProcessingProgress(0.0)

		const response = await worker?.generate(
			rows(sensitiveContent.table, true),
			sensitiveContent.headers.filter(h => h.use).map(h => h.name),
			sensitiveContent.headers
				.filter(h => h.hasSensitiveZeros)
				.map(h => h.name),
			recordLimit,
			resolution,
			cacheSize,
			p => {
				setProcessingProgress(p)
			},
		)

		const table = fromRows(response, sensitiveContent.delimiter)

		setIsProcessing(false)
		setSyntheticContent({
			headers: tableHeaders(table),
			delimiter: sensitiveContent.delimiter,
			table,
			metadata: introspect(table, true),
		})
	}, [
		worker,
		setIsProcessing,
		setSyntheticContent,
		clearGenerate,
		sensitiveContent,
		recordLimit,
		resolution,
		cacheSize,
		setProcessingProgress,
	])

	const tableCommands = useSyntheticTableCommands(syntheticContent)

	const handleResolutionChange = useSpinButtonOnChange(setResolution)
	const handleRecordLimitChange = useSpinButtonOnChange(setRecordLimit)
	const handleCacheSizeChange = useSpinButtonOnChange(setCacheSize)

	return (
		<Stack styles={mainStackStyles} tokens={mainStackTokens}>
			<Stack.Item>
				<Stack tokens={subStackTokens} horizontal>
					<Stack.Item>
						<SpinButton
							label="Resolution"
							labelPosition={Position.top}
							min={1}
							step={1}
							value={resolution.toString()}
							disabled={isProcessing}
							onChange={handleResolutionChange}
						/>
					</Stack.Item>
					<Stack.Item>
						<SpinButton
							label="Record Limit"
							labelPosition={Position.top}
							min={1}
							step={10}
							value={recordLimit.toString()}
							disabled={isProcessing}
							onChange={handleRecordLimitChange}
						/>
					</Stack.Item>
					<Stack.Item>
						<SpinButton
							label="Cache size"
							labelPosition={Position.top}
							min={1}
							step={1000}
							value={cacheSize.toString()}
							disabled={isProcessing}
							onChange={handleCacheSizeChange}
						/>
					</Stack.Item>
					<Stack.Item align="end">
						<PrimaryButton
							type="submit"
							onClick={onRunGenerate}
							disabled={isProcessing}
						>
							Run
						</PrimaryButton>
					</Stack.Item>
				</Stack>
			</Stack.Item>

			{syntheticContent.table.numCols() > 0 && (
				<>
					<Stack.Item>
						<h3>Synthetic data</h3>
					</Stack.Item>
					<Stack tokens={subStackTokens}>
						<Stack.Item>
							<CsvTable content={syntheticContent} commands={tableCommands} />
						</Stack.Item>
					</Stack>
				</>
			)}
		</Stack>
	)
})
