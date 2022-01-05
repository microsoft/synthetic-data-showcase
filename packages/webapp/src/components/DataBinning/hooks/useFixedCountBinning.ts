/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { useCallback } from 'react'
import { SetterOrUpdater } from 'recoil'
import { ICsvContent } from '~models'
import { DataClearer } from '~states'
import { InplaceBinning } from '~utils'
import { fromRows, headers } from '~utils/arquero'

export function useFixedCountBinning(
	csvContent: ICsvContent,
	headerIndex: number,
	setCsvContent: SetterOrUpdater<ICsvContent>,
	clearGenerate: DataClearer,
): (values) => Promise<void> {
	return useCallback(
		async values => {
			const newItems = [...csvContent.items.map(item => [...item])]

			new InplaceBinning()
				.fixedBinCount(values.binCount, values.minValue, values.maxValue)
				.run(newItems, headerIndex)

			await clearGenerate()
			setCsvContent({
				...csvContent,
				items: newItems,
				// TEMP: this is temporary until we use DWC for binning
				table: fromRows([headers(csvContent), ...newItems], '\t'),
			})
		},
		[csvContent, headerIndex, clearGenerate, setCsvContent],
	)
}
