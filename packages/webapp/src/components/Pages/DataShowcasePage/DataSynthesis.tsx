/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import {
	Dropdown,
	getTheme,
	IStackStyles,
	IStackTokens,
	Position,
	PrimaryButton,
	SpinButton,
	Stack,
} from '@fluentui/react'
import { memo } from 'react'
import { CsvTable } from './CsvTable'
import {
	useOnRunGenerate,
	useSpinButtonOnChange,
	useSynthesisModeOnChange,
	useSynthesisModeOptions,
	useSyntheticTableCommands,
} from './hooks'
import {
	useCacheSize,
	useIsProcessingValue,
	useRecordLimit,
	useResolution,
	useSensitiveContentValue,
	useSynthesisMode,
	useSyntheticContent,
} from '~states'

export const DataSynthesis: React.FC = memo(function DataSynthesis() {
	const [resolution, setResolution] = useResolution()
	const [recordLimit, setRecordLimit] = useRecordLimit()
	const [cacheSize, setCacheSize] = useCacheSize()
	const isProcessing = useIsProcessingValue()
	const sensitiveContent = useSensitiveContentValue()
	const [syntheticContent, setSyntheticContent] = useSyntheticContent()
	const [synthesisMode, setSynthesisMode] = useSynthesisMode()
	const synthesisModeOptions = useSynthesisModeOptions()

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

	const synthesisModeStyles = {
		root: {
			width: 100,
		},
	}

	const onRunGenerate = useOnRunGenerate(
		setSyntheticContent,
		resolution,
		recordLimit,
		cacheSize,
		synthesisMode,
	)

	const tableCommands = useSyntheticTableCommands(syntheticContent)

	const handleResolutionChange = useSpinButtonOnChange(setResolution)
	const handleRecordLimitChange = useSpinButtonOnChange(setRecordLimit)
	const handleCacheSizeChange = useSpinButtonOnChange(setCacheSize)
	const handleSynthesisModeChange = useSynthesisModeOnChange(setSynthesisMode)

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
							max={sensitiveContent.table.numRows()}
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
					<Stack.Item>
						<Dropdown
							label="Mode"
							selectedKey={synthesisMode}
							onChange={handleSynthesisModeChange}
							placeholder="Select synthesis mode"
							options={synthesisModeOptions}
							styles={synthesisModeStyles}
							disabled={isProcessing}
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
