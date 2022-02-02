/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { introspect } from '@data-wrangling-components/core'
import { from, table } from 'arquero'
import _ from 'lodash'
import { parse } from 'papaparse'
import { useCallback, ChangeEvent } from 'react'
import { SetterOrUpdater } from 'recoil'
import { defaultSubjectID, ICsvContent } from '~models'
import {
	useClearSensitiveData,
	useIsProcessingSetter,
	useRecordLimitSetter,
} from '~states'
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
): (e: ChangeEvent<HTMLInputElement>) => Promise<void> {
	const setIsProcessing = useIsProcessingSetter()
	const clearSensitiveData = useClearSensitiveData()
	const setRecordLimit = useRecordLimitSetter()

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
						let t = from(results.data)

						/// assign RowID to the table if not in there
						if (!t.column(defaultSubjectID)) {
							t = table({ RowID: _.range(1, t.totalRows() + 1) }).assign(t)
						}

						setIsProcessing(false)
						setSensitiveContent({
							headers: tableHeaders(t),
							columnsWithZeros: columnIndexesWithZeros(t),
							delimiter: results.meta.delimiter,
							table: t,
							metadata: introspect(t, true),
							subjectId: defaultSubjectID,
						})
						setRecordLimit(t.numRows())
						// allow the same file to be loaded again
						e.target.value = ''
					},
				})
			}
		},
		[setIsProcessing, clearSensitiveData, setSensitiveContent, setRecordLimit],
	)
}
