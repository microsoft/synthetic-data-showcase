/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { introspect } from '@data-wrangling-components/core'
import ColumnTable from 'arquero/dist/types/table/column-table'
import { useCallback, ChangeEvent } from 'react'
import { SetterOrUpdater } from 'recoil'
import { ICsvContent } from '~models'
/**
 * When a table is updated, recompute it's metadata and place in state
 * @param setSyntheticContent
 * @returns
 */
export function useOnTableChange(
	setter: SetterOrUpdater<ICsvContent>,
): (e: ChangeEvent<HTMLInputElement>) => Promise<void> {
	return useCallback(
		(table: ColumnTable) => {
			// TODO: we may want to recompute the sensitive zeros in case the new column has them?
			setter(prev => ({
				...prev,
				table,
				metadata: introspect(table, true),
			}))
		},
		[setter],
	)
}
