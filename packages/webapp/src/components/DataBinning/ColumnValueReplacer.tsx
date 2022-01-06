/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import {
	ComboBox,
	CommandButton,
	IComboBoxOption,
	IconButton,
	IIconProps,
	IStackTokens,
	PrimaryButton,
	Stack,
	useTheme,
} from '@fluentui/react'
import _ from 'lodash'
import { memo, useCallback, useEffect, useState } from 'react'
import { useClearGenerate, useSensitiveContent } from '~states'
import {
	BinOperationJoinCondition,
	BinOperationType,
	ICustomBin,
	InplaceBinning,
} from '~utils'

export interface ColumnValueReplacerProps {
	headerIndex: number
}

const addIcon: IIconProps = { iconName: 'Add' }

const deleteIcon: IIconProps = { iconName: 'Delete' }

export const ColumnValueReplacer: React.FC<ColumnValueReplacerProps> = memo(
	function ColumnValueReplacer({ headerIndex }: ColumnValueReplacerProps) {
		const [availableValues, setAvailableValues] = useState<string[]>([])
		const [selectedValues, setSelectedValues] = useState<string[]>([])
		const [currentValue, setCurrentValue] = useState('')
		const [valueToReplace, setValueToReplace] = useState('')
		const [csvContent, setCsvContent] = useSensitiveContent()
		const clearGenerate = useClearGenerate()

		const theme = useTheme()

		const onUpdateCurrentValue = useCallback(
			newValue => {
				setCurrentValue(newValue)
			},
			[setCurrentValue],
		)

		const onUpdateValueToReplace = useCallback(
			newValue => {
				setValueToReplace(newValue)
			},
			[setValueToReplace],
		)

		const onAddSelectedValue = useCallback(() => {
			if (!selectedValues.includes(currentValue)) {
				setSelectedValues([...selectedValues, currentValue])
			}
		}, [setSelectedValues, selectedValues, currentValue])

		const onRemoveSelectedValue = useCallback(
			index => {
				const newSelectedValues = [...selectedValues]
				newSelectedValues.splice(index, 1)
				setSelectedValues(newSelectedValues)
			},
			[selectedValues, setSelectedValues],
		)

		const onRun = useCallback(async () => {
			if (selectedValues.length > 0 && valueToReplace.length > 0) {
				const newItems = [...csvContent.items.map(item => [...item])]
				const bins: ICustomBin[] = [
					{
						representation: valueToReplace,
						joinCondition: BinOperationJoinCondition.Or,
						operations: selectedValues.map(v => ({
							type: BinOperationType.Equals,
							rhsOperand: v,
						})),
					},
				]
				new InplaceBinning().customBins(bins).run(newItems, headerIndex)

				await clearGenerate()
				setCsvContent({
					...csvContent,
					items: newItems,
				})
				onUpdateCurrentValue('')
				onUpdateValueToReplace('')
			}
		}, [
			selectedValues,
			valueToReplace,
			csvContent,
			headerIndex,
			clearGenerate,
			setCsvContent,
			onUpdateCurrentValue,
			onUpdateValueToReplace,
		])

		const allValueOptions: IComboBoxOption[] = availableValues.map((v, i) => ({
			key: i,
			text: v,
		}))

		const stackTokens: IStackTokens = {
			childrenGap: theme.spacing.m,
		}

		useEffect(() => {
			setAvailableValues(
				_.uniq(
					csvContent.items
						.map(row => row[headerIndex] ?? '')
						.filter(v => v.trim().length > 0),
				),
			)
			setSelectedValues([])
			// eslint-disable-next-line react-hooks/exhaustive-deps
		}, [csvContent, headerIndex, setAvailableValues])

		return (
			<Stack>
				<Stack horizontal tokens={stackTokens} wrap verticalAlign="end">
					<ComboBox
						key={currentValue}
						label="Replace"
						allowFreeform={true}
						autoComplete="on"
						text={currentValue}
						onChange={(event, option, index, value) =>
							onUpdateCurrentValue(value ?? option?.text)
						}
						options={allValueOptions}
					/>
					<IconButton iconProps={addIcon} onClick={onAddSelectedValue} />
				</Stack>
				<Stack horizontal tokens={stackTokens}>
					{selectedValues.map((v, i) => (
						<CommandButton
							key={v}
							iconProps={deleteIcon}
							text={v}
							onClick={() => onRemoveSelectedValue(i)}
						/>
					))}
				</Stack>
				<Stack horizontal tokens={stackTokens} wrap verticalAlign="end">
					<ComboBox
						key={currentValue}
						label="For"
						allowFreeform={true}
						autoComplete="off"
						options={allValueOptions}
						text={valueToReplace}
						onChange={(event, option, index, value) =>
							onUpdateValueToReplace(value ?? option?.text)
						}
					/>
					<PrimaryButton onClick={onRun}>Run</PrimaryButton>
				</Stack>
			</Stack>
		)
	},
)
