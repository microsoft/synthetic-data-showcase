/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import ColumnTable from 'arquero/dist/types/table/column-table'
import { RefObject, useCallback, useMemo } from 'react'
import { ICsvContent } from '~models'
import { headers } from '~utils/arquero'

const downloadExtensions = {
	',': 'csv',
	'\t': 'tsv',
}

function getCsvContentDownloadUrl(
	content: ICsvContent,
	nItems: number,
	delimiter: string,
): string {
	const extension = downloadExtensions[delimiter]
	const selection = headers(content, true)
	const output = content.table.select(selection).toCSV({
		delimiter,
		limit: nItems,
	})

	return URL.createObjectURL(
		new Blob([output], {
			type: extension ? `text/${extension}` : 'text/plain',
		}),
	)
}

function getCsvContentDownloadExtension(delimiter: string): string {
	return downloadExtensions[delimiter] ?? 'txt'
}

export function useOnDownloadCsvContent(
	downloadAnchorRef: RefObject<HTMLAnchorElement>,
	content: ICsvContent,
	nItems: number,
	downloadAlias: string,
): () => void {
	return useCallback(() => {
		if (downloadAnchorRef.current) {
			downloadAnchorRef.current.href = getCsvContentDownloadUrl(
				content,
				nItems,
				content.delimiter,
			)
			downloadAnchorRef.current.download = `${downloadAlias}.${getCsvContentDownloadExtension(
				content.delimiter,
			)}`
			downloadAnchorRef.current.click()
		}
	}, [downloadAnchorRef, content, nItems, downloadAlias])
}

export function useLimit(table: ColumnTable, takeFirstItems?: number): number {
	return useMemo(
		() =>
			takeFirstItems ? Math.min(table.numRows(), takeFirstItems) : Infinity,
		[table, takeFirstItems],
	)
}
