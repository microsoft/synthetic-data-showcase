/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { useCallback } from 'react'
import { SetterOrUpdater } from 'recoil'
import { ICsvContent } from '~models'
import { DataClearer } from '~states'
import { ICustomBin, InplaceBinning } from '~utils'
import { fromRows, headers } from '~utils/arquero'

export function useCustomDataBinning(
	bins: ICustomBin[],
	csvContent: ICsvContent,
	headerIndex: number,
	setCsvContent: SetterOrUpdater<ICsvContent>,
	clearGenerate: DataClearer,
): () => Promise<void> {
	return useCallback(async () => {
		if (bins.length > 0) {
			const newItems = [...csvContent.items.map(item => [...item])]

			new InplaceBinning().customBins(bins).run(newItems, headerIndex)

			await clearGenerate()
			setCsvContent({
				...csvContent,
				items: newItems,
				// TEMP: this is temporary until we use DWC for binning
				table: fromRows([headers(csvContent), ...newItems], '\t'),
			})
		}
	}, [bins, csvContent, headerIndex, clearGenerate, setCsvContent])
}
