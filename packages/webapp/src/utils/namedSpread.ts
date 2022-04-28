/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { escape } from 'arquero'
import type ColumnTable from 'arquero/dist/types/table/column-table'
import _ from 'lodash'

export interface IColumnToSpread {
	name: string
	delimiter: string
}

export interface INamedSpreadResult {
	resultTable: ColumnTable
	newColumnNames: string[]
}

export function namedSpread(
	table: ColumnTable,
	columnsToSpread: IColumnToSpread[],
): INamedSpreadResult {
	let resultTable = table
	const newColumnNames: string[] = []

	for (const column of columnsToSpread) {
		const uniqueValues = _(table.array(column.name))
			.flatMap(v =>
				(v?.toString() || '').split(column.delimiter).filter(s => s.length > 0),
			)
			.uniq()
			.sort()
			.reverse()
			.value()

		for (const val of uniqueValues) {
			const newColumnName = `${column.name}_${val}`

			newColumnNames.push(newColumnName)
			resultTable = resultTable.derive(
				{
					[newColumnName]: escape(d => {
						if (d !== undefined) {
							return (d[column.name]?.toString() ?? '')
								.split(column.delimiter)
								.includes(val)
								? '1'
								: '0'
						}
						return ''
					}),
				},
				{
					after: column.name,
				},
			)
		}
	}

	return {
		resultTable,
		newColumnNames,
	}
}
