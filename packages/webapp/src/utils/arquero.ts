/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { fromCSV, table } from 'arquero'
import ColumnTable from 'arquero/dist/types/table/column-table'
import { CsvData } from 'sds-wasm'
import { ICsvContent, ICsvTableHeader } from '~models'

/**
 * Create a table from a set of compute results.
 * This comes from either papaparse or the worker
 * @param rows
 * @returns
 */
export function fromRows(rows?: CsvData, delimiter = ','): ColumnTable {
	// TEMP: we're re-creating the raw text so arquero can auto-detect types
	// we should have at least the header + rows
	if (rows && rows.length > 1) {
		const csv = rows.map(d => d.join(delimiter)).join('\n')
		return fromCSV(csv, { delimiter })
	}
	return table({})
}

/**
 * Returns a list of column indices that contain at least one 0.
 * @param table
 */
export function columnIndexesWithZeros(table: ColumnTable): number[] {
	return table.columnNames().reduce((acc, name, idx) => {
		const values = table.array(name)
		if (values.some(v => v === 0)) {
			acc.push(idx)
		}
		return acc
	}, [] as number[])
}

/**
 * Creates a default set of header config based on the table
 * @param table
 * @param existing - optional existing headers to check for completion
 * @returns
 */
export function tableHeaders(
	table: ColumnTable,
	existing?: ICsvTableHeader[],
): ICsvTableHeader[] {
	const hash = (existing || []).reduce((acc, cur) => {
		acc[cur.name] = cur
		return acc
	}, {} as Record<string, ICsvTableHeader>)
	return table.columnNames().map((h, i) =>
		hash[h]
			? hash[h]
			: ({
					name: h,
					fieldName: i.toString(),
					use: true,
					hasSensitiveZeros: false,
			  } as ICsvTableHeader),
	)
}

/**
 * Get a list of column names from the table
 * @param table
 * @param onlyUsed
 */
export function headers(data: ICsvContent, onlyUsed = false): string[] {
	const filtered = onlyUsed ? data.headers.filter(h => h.use) : data.headers
	return filtered.map(h => h.name)
}

/**
 * Get a list of column names that contains sensitive zeros
 * @param data
 */
export function sensitiveZeros(data: ICsvContent): string[] {
	return data.headers.filter(h => h.hasSensitiveZeros).map(h => h.name)
}

/**
 * Creates a set of csv-compatible rows from the table.
 * This is a bit inefficient because arquero is columnar.
 * TODO: Note that we are also turning all values into strings to comply with worker interface.
 * TODO: there are many ways to manipulate this data in arquero, experiment to find the most efficient
 * @param table
 */
export function rows(table: ColumnTable, includeHeader = false): CsvData {
	const rows = includeHeader ? [table.columnNames()] : []
	table.scan(idx => {
		const row: string[] = []
		for (let i = 0; i < table.numCols(); i++) {
			const value = table.columnAt(i)?.get(idx)
			if (value !== null) {
				row.push(`${value}`)
			} else {
				row.push('')
			}
		}
		rows.push(row)
	})
	return rows
}
