/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import type { TableContainer } from '@essex/arquero'
import { useCallback } from 'react'
import type { SetterOrUpdater } from 'recoil'
import { atom, useRecoilState } from 'recoil'

const tablesState = atom<TableContainer[]>({
	key: 'tables',
	default: [],
	dangerouslyAllowMutability: true,
})

const preparedTableState = atom<TableContainer | undefined>({
	key: 'prepared-table',
	default: undefined,
	dangerouslyAllowMutability: true,
})

const selectedTableState = atom<TableContainer | undefined>({
	key: 'currently-selected-table',
	default: undefined,
	dangerouslyAllowMutability: true,
})

export function useTables(): [
	TableContainer[],
	(tables: TableContainer[]) => void,
] {
	const [tables, setTables] = useRecoilState(tablesState)

	const updateTables = useCallback(
		(newTables: TableContainer[]) => {
			setTables([...tables, ...newTables])
		},
		[tables, setTables],
	)

	return [tables, updateTables]
}

export function usePreparedTable(): [
	TableContainer | undefined,
	(table: TableContainer | undefined) => void,
] {
	const [preparedTable, setPreparedTable] = useRecoilState(preparedTableState)

	const updatePrepared = useCallback(
		(table: TableContainer | undefined) => {
			if (preparedTable?.id !== table?.id) setPreparedTable(table)
		},
		[setPreparedTable, preparedTable],
	)

	return [preparedTable, updatePrepared]
}

export function useSelectedTable(): [
	TableContainer | undefined,
	SetterOrUpdater<TableContainer | undefined>,
] {
	return useRecoilState(selectedTableState)
}
