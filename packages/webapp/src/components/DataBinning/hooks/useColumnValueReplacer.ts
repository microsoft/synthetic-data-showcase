/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { useCallback } from 'react'
import { SetterOrUpdater } from 'recoil'
import { ICsvContent } from '~models'
import { DataClearer } from '~states'
import {
	BinOperationJoinCondition,
	BinOperationType,
	ICustomBin,
	InplaceBinning,
} from '~utils'
import { fromRows, headers } from '~utils/arquero'

export function useColumnValueReplacer(
	selectedValues: string[],
	valueToReplace: string,
	csvContent: ICsvContent,
	headerIndex: number,
	setCsvContent: SetterOrUpdater<ICsvContent>,
	clearGenerate: DataClearer,
	setCurrentValue: (newValue: string) => void,
	setValueToReplace: (newValue: string) => void,
): () => Promise<void> {
	return useCallback(async () => {
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
				// TEMP: this is temporary until we use DWC for binning
				table: fromRows([headers(csvContent), ...newItems], '\t'),
			})
			setCurrentValue('')
			setValueToReplace('')
		}
	}, [
		selectedValues,
		valueToReplace,
		csvContent,
		headerIndex,
		clearGenerate,
		setCsvContent,
		setCurrentValue,
		setValueToReplace,
	])
}
