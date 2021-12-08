/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import {
	ChoiceGroup,
	Dropdown,
	IChoiceGroupOption,
	IDropdownOption,
	IStackTokens,
	Stack,
	useTheme,
} from '@fluentui/react'
import { memo, useCallback, useState } from 'react'
import { ColumnValueReplacer } from './ColumnValueReplacer'
import { CustomDataBinning } from './CustomDataBinning'
import { FixedCountDataBinning } from './FixedCountDataBinning'
import { FixedWidthDataBinning } from './FixedWidthDataBinning'
import { useIsProcessingValue, useSensitiveContentValue } from '~states'

const fixedWidthKey = 'fixedWidth'
const fixedCountKey = 'fixedCount'
const customBinsKey = 'customBins'
const valueReplacerKey = 'valueReplacer'

const binningOptions: IChoiceGroupOption[] = [
	{ key: fixedWidthKey, text: 'Use fixed bin width' },
	{ key: fixedCountKey, text: 'Use fixed bin count' },
	{ key: customBinsKey, text: 'Use custom bins' },
	{ key: valueReplacerKey, text: 'Transform values' },
]

export const DataBinning: React.FC = memo(function DataBinning() {
	const [selectedOption, setSelectedOption] = useState(fixedWidthKey)
	const [selectedHeaderKey, setSelectedHeaderKey] = useState<
		number | undefined
	>()
	const csvContent = useSensitiveContentValue()
	const isProcessing = useIsProcessingValue()
	const theme = useTheme()

	const onSelectedOptionChange = useCallback(
		(_, option) => {
			setSelectedOption(option.key)
		},
		[setSelectedOption],
	)

	const onSelectedHeaderChange = useCallback(
		(_, item) => {
			setSelectedHeaderKey(item?.key)
		},
		[setSelectedHeaderKey],
	)

	const headerOptions: IDropdownOption[] = csvContent.headers
		.filter(h => h.use)
		.map(h => ({
			key: h.fieldName,
			text: h.name,
		}))

	const stackTokens: IStackTokens = {
		childrenGap: theme.spacing.m,
	}

	let currentBinningComponent

	if (selectedHeaderKey) {
		switch (selectedOption) {
			case fixedWidthKey:
				currentBinningComponent = (
					<FixedWidthDataBinning
						headerIndex={+selectedHeaderKey}
						key={selectedHeaderKey}
					/>
				)
				break
			case fixedCountKey:
				currentBinningComponent = (
					<FixedCountDataBinning
						headerIndex={+selectedHeaderKey}
						key={selectedHeaderKey}
					/>
				)
				break
			case customBinsKey:
				currentBinningComponent = (
					<CustomDataBinning
						headerIndex={+selectedHeaderKey}
						key={selectedHeaderKey}
					/>
				)
				break
			case valueReplacerKey:
				currentBinningComponent = (
					<ColumnValueReplacer
						headerIndex={+selectedHeaderKey}
						key={selectedHeaderKey}
					/>
				)
				break
		}
	}

	return (
		<Stack horizontal tokens={stackTokens} wrap>
			<Stack.Item
				styles={{
					root: {
						width: 200,
					},
				}}
			>
				<Stack>
					<Dropdown
						label="Column"
						selectedKey={selectedHeaderKey}
						onChange={onSelectedHeaderChange}
						placeholder="Select a header"
						options={headerOptions}
						disabled={isProcessing}
					/>
					<ChoiceGroup
						selectedKey={selectedOption}
						options={binningOptions}
						onChange={onSelectedOptionChange}
						disabled={isProcessing}
					/>
				</Stack>
			</Stack.Item>
			{currentBinningComponent && (
				<Stack.Item>{currentBinningComponent}</Stack.Item>
			)}
		</Stack>
	)
})
