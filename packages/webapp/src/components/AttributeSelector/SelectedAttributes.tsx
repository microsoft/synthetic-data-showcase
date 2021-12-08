/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import {
	CommandButton,
	IIconProps,
	IStackTokens,
	PrimaryButton,
	Stack,
	useTheme,
} from '@fluentui/react'
import { memo, useEffect, useRef, useState } from 'react'
import { useOnAttributeSelection, useOnClearAttributeSelection } from './hooks'
import { CsvRecord } from '~models'
import { useNavigateResultValue, useWasmWorkerValue } from '~states'
import {
	useSelectedAttributeRowsSetter,
	useSelectedAttributes,
} from '~states/dataShowcaseContext'

const deleteIcon: IIconProps = { iconName: 'Delete' }

export interface SelectedAttributesProps {
	headers: CsvRecord
}

export const SelectedAttributes: React.FC<SelectedAttributesProps> = memo(
	function SelectedAttributes({ headers }: SelectedAttributesProps) {
		const [selectedAttributes, setSelectedAttributes] = useSelectedAttributes()
		const [isLoading, setIsLoading] = useState(false)
		const theme = useTheme()
		const worker = useWasmWorkerValue()
		const navigateResult = useNavigateResultValue()
		const setSelectedAttributeRows = useSelectedAttributeRowsSetter()
		const isMounted = useRef(true)

		const stackTokens: IStackTokens = {
			childrenGap: theme.spacing.s2,
		}

		const onAttributeSelection = useOnAttributeSelection(
			setIsLoading,
			selectedAttributes,
			worker,
			navigateResult,
			isMounted,
			setSelectedAttributes,
			setSelectedAttributeRows,
		)

		const onClearAttributeSection = useOnClearAttributeSelection(
			setIsLoading,
			worker,
			navigateResult,
			isMounted,
			setSelectedAttributes,
			setSelectedAttributeRows,
		)

		const selectedEntries = Object.entries(selectedAttributes)

		useEffect(() => {
			return () => {
				isMounted.current = false
			}
		}, [])

		return (
			<Stack tokens={stackTokens} horizontal wrap verticalAlign="center">
				<PrimaryButton
					onClick={onClearAttributeSection}
					disabled={isLoading || selectedEntries.length === 0}
				>
					Clear
				</PrimaryButton>
				{selectedEntries.map(entry => {
					return (
						<CommandButton
							key={`${entry[0]}:${entry[1]}`}
							iconProps={deleteIcon}
							text={`${headers[entry[0]]}:${entry[1]}`}
							disabled={isLoading}
							onClick={() => onAttributeSelection(+entry[0], undefined)}
						/>
					)
				})}
			</Stack>
		)
	},
)
