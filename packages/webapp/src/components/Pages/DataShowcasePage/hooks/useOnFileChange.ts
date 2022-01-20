/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { introspect } from '@data-wrangling-components/core'
import { from } from 'arquero'
import { parse } from 'papaparse'
import { useCallback, ChangeEvent } from 'react'
import { SetterOrUpdater } from 'recoil'
import { ICsvContent } from '~models'
import { DataClearer, useIsProcessingSetter } from '~states'
import { columnIndexesWithZeros, tableHeaders } from '~utils/arquero'
/**
 * When a file is opened, reset the data state and instantiate a new table to work with.
 * @param setIsProcessing
 * @param setSyntheticContent
 * @param clearSensitiveData
 * @returns
 */
export function useOnFileChange(
	setSensitiveContent: SetterOrUpdater<ICsvContent>,
	clearSensitiveData: DataClearer,
): (e: ChangeEvent<HTMLInputElement>) => Promise<void> {
	const setIsProcessing = useIsProcessingSetter()
	return useCallback(
		async (e: ChangeEvent<HTMLInputElement>) => {
			const f = e.target.files?.[0]
			if (f) {
				setIsProcessing(true)
				await clearSensitiveData()
				parse<Array<string>>(f, {
					dynamicTyping: true,
					skipEmptyLines: true,
					header: true,
					complete: async results => {
						const table = from(results.data)
						setIsProcessing(false)
						setSensitiveContent({
							headers: tableHeaders(table),
							columnsWithZeros: columnIndexesWithZeros(table),
							delimiter: results.meta.delimiter,
							table,
							metadata: introspect(table, true),
						})
						// allow the same file to be loaded again
						e.target.value = ''
					},
				})
			}
		},
		[setIsProcessing, clearSensitiveData, setSensitiveContent],
	)
}
