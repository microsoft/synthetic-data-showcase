/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { introspect } from '@data-wrangling-components/core'
import ColumnTable from 'arquero/dist/types/table/column-table'
import { useCallback } from 'react'
import { SetterOrUpdater } from 'recoil'
import { ICsvContent, ICsvTableHeader } from '~models'
import { tableHeaders } from '~utils/arquero'
/**
 * When a table is updated, recompute it's metadata and place in state
 * @param setSyntheticContent
 * @returns
 */
export function useOnTableChange(
	setter: SetterOrUpdater<ICsvContent>,
): (table: ColumnTable) => void {
	return useCallback(
		(table: ColumnTable) => {
			setter(prev => {
				const { headers } = prev
				// make we we capture any new headers if table columns were added
				const newHeaders = tableHeaders(table, headers)
				return {
				...prev,
				table,
				headers: newHeaders,
				metadata: introspect(table, true),
			}})
		},
		[setter],
	)
}

