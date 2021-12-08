/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import {
	Dropdown,
	IconButton,
	IDropdownOption,
	IIconProps,
	IStackTokens,
	Label,
	PrimaryButton,
	Separator,
	Stack,
	TextField,
	useTheme,
} from '@fluentui/react'
import { memo, useCallback, useState } from 'react'
import {
	defaultCsvContent,
	defaultEvaluatedResult,
	defaultNavigateResult,
} from '~models'
import {
	useEvaluatedResultSetter,
	useNavigateResultSetter,
	useSensitiveContent,
	useSyntheticContentSetter,
} from '~states'
import {
	BinOperationJoinCondition,
	BinOperationType,
	ICustomBin,
	InplaceBinning,
} from '~utils'

const operationTypeOptions: IDropdownOption[] = Object.values(
	BinOperationType,
).map(t => ({ key: t, text: t }))

const operationJoinConditionOptions: IDropdownOption[] = Object.values(
	BinOperationJoinCondition,
).map(t => ({ key: t, text: t }))

const addIcon: IIconProps = { iconName: 'Add' }

const deleteIcon: IIconProps = { iconName: 'Delete' }

export interface CustomDataBinningProps {
	headerIndex: number
}

export const CustomDataBinning: React.FC<CustomDataBinningProps> = memo(
	function CustomDataBinning({ headerIndex }: CustomDataBinningProps) {
		const [bins, setBins] = useState<ICustomBin[]>([])
		const [csvContent, setCsvContent] = useSensitiveContent()
		const setSyntheticContent = useSyntheticContentSetter()
		const setEvaluatedResult = useEvaluatedResultSetter()
		const setNavigateResult = useNavigateResultSetter()

		const theme = useTheme()

		const onAddBin = useCallback(() => {
			setBins([
				...bins,
				{
					operations: [],
					joinCondition: BinOperationJoinCondition.And,
					representation: '',
				},
			])
		}, [bins, setBins])

		const onRemoveBin = useCallback(
			binIndex => {
				const newBins = [...bins]

				newBins.splice(binIndex, 1)
				setBins(newBins)
			},
			[bins, setBins],
		)

		const onAddOperation = useCallback(
			binIndex => {
				const newBins = [...bins]

				newBins[binIndex].operations.push({
					rhsOperand: '',
					type: BinOperationType.Contains,
				})
				setBins(newBins)
			},
			[bins, setBins],
		)

		const onRemoveOperation = useCallback(
			(binIndex, operationIndex) => {
				const newBins = [...bins]

				newBins[binIndex].operations.splice(operationIndex, 1)
				setBins(newBins)
			},
			[bins, setBins],
		)

		const onUpdateRepresentation = useCallback(
			(binIndex, value) => {
				const newBins = [...bins]
				newBins[binIndex].representation = value
				setBins(newBins)
			},
			[bins, setBins],
		)

		const onUpdateJoinCondition = useCallback(
			(binIndex, value) => {
				const newBins = [...bins]
				newBins[binIndex].joinCondition = value
				setBins(newBins)
			},
			[bins, setBins],
		)

		const onUpdateOperationType = useCallback(
			(binIndex, operationIndex, value) => {
				const newBins = [...bins]
				newBins[binIndex].operations[operationIndex].type = value
				setBins(newBins)
			},
			[bins, setBins],
		)

		const onUpdateOperationValue = useCallback(
			(binIndex, operationIndex, value) => {
				const newBins = [...bins]
				newBins[binIndex].operations[operationIndex].rhsOperand = value
				setBins(newBins)
			},
			[bins, setBins],
		)

		const onRun = useCallback(() => {
			if (bins.length > 0) {
				const newItems = [...csvContent.items.map(item => [...item])]

				new InplaceBinning().customBins(bins).run(newItems, headerIndex)

				setCsvContent({
					...csvContent,
					items: newItems,
				})
				setSyntheticContent(defaultCsvContent)
				setEvaluatedResult(defaultEvaluatedResult)
				setNavigateResult(defaultNavigateResult)
			}
		}, [
			bins,
			csvContent,
			headerIndex,
			setCsvContent,
			setSyntheticContent,
			setEvaluatedResult,
			setNavigateResult,
		])

		const stackTokens: IStackTokens = {
			childrenGap: theme.spacing.m,
		}

		return (
			<Stack tokens={stackTokens}>
				<Stack horizontal tokens={stackTokens} verticalAlign="end">
					<Label>Custom bins</Label>
					<IconButton iconProps={addIcon} onClick={onAddBin} />
				</Stack>

				{bins.map((bin, binIndex) => {
					return (
						<Stack key={binIndex}>
							<Stack horizontal tokens={stackTokens} verticalAlign="end">
								<TextField
									label="Replace matchs for"
									value={bin.representation}
									onChange={(_, newValue) =>
										onUpdateRepresentation(binIndex, newValue ?? '')
									}
								/>
								<Dropdown
									label="Join condition"
									selectedKey={bin.joinCondition}
									options={operationJoinConditionOptions}
									onChange={(_, item) =>
										onUpdateJoinCondition(
											binIndex,
											item?.key ?? BinOperationJoinCondition.And,
										)
									}
								/>
								<IconButton
									iconProps={deleteIcon}
									onClick={() => onRemoveBin(binIndex)}
								/>
							</Stack>

							<Stack horizontal tokens={stackTokens} verticalAlign="end">
								<Label>Operations</Label>
								<IconButton
									iconProps={addIcon}
									onClick={() => onAddOperation(binIndex)}
								/>
							</Stack>
							<Stack tokens={stackTokens}>
								{bin.operations.map((op, operationIndex) => {
									return (
										<Stack
											key={operationIndex}
											horizontal
											tokens={stackTokens}
											verticalAlign="end"
										>
											<Dropdown
												selectedKey={op.type}
												options={operationTypeOptions}
												onChange={(_, item) =>
													onUpdateOperationType(
														binIndex,
														operationIndex,
														item?.key ?? BinOperationType.Contains,
													)
												}
												styles={{ root: { width: 90 } }}
											/>
											<TextField
												label="Value"
												value={op.rhsOperand}
												onChange={(_, newValue) =>
													onUpdateOperationValue(
														binIndex,
														operationIndex,
														newValue ?? '',
													)
												}
											/>
											<IconButton
												iconProps={deleteIcon}
												onClick={() =>
													onRemoveOperation(binIndex, operationIndex)
												}
											/>
										</Stack>
									)
								})}
							</Stack>
							<Separator />
						</Stack>
					)
				})}

				<Stack.Item>
					<PrimaryButton onClick={onRun}>Run</PrimaryButton>
				</Stack.Item>
			</Stack>
		)
	},
)
