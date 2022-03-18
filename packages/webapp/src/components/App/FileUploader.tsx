/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { container, introspect } from '@data-wrangling-components/core'
import { fromCSV, table } from 'arquero'
import _ from 'lodash'
import type { FC } from 'react'
import { memo, useCallback, useEffect } from 'react'
import type { FileRejection } from 'react-dropzone'

import { FileDrop } from '~components/FileDrop'
import { defaultSubjectID } from '~models'
import {
	useClearSensitiveData,
	useFileUploadErrorMessage,
	useIsProcessingSetter,
	usePreparedTable,
	useRecordLimitSetter,
	useSensitiveContent,
	useTables,
} from '~states'
import { columnIndexesWithZeros, tableHeaders } from '~utils'

export const FileUploader: FC = memo(function FileUploader({ children }) {
	const [, setFileUploadErrorMessage] = useFileUploadErrorMessage()
	const [, updateTables] = useTables()
	const [preparedTable] = usePreparedTable()
	const [, setSensitiveContent] = useSensitiveContent()
	const setIsProcessing = useIsProcessingSetter()
	const clearSensitiveData = useClearSensitiveData()
	const setRecordLimit = useRecordLimitSetter()

	const handleDrop = useCallback(
		async (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
			if (rejectedFiles.length > 0) {
				setFileUploadErrorMessage('Files must end with .csv or .tsv')
			} else {
				setFileUploadErrorMessage(undefined)
			}
			const tableContainers = await Promise.all(
				acceptedFiles.map(async file => {
					// const fileHash = await hash(await file.text())
					// eslint-disable-next-line @essex/adjacent-await
					const arqueroTable = fromCSV(await file.text(), {
						delimiter: /\.tsv$/.test(file.name) ? '\t' : ',',
						autoType: false,
					})
					return container(file.name, arqueroTable, {
						name: file.name,
					})
				}),
			)
			updateTables(tableContainers)
		},
		[updateTables, setFileUploadErrorMessage],
	)

	useEffect(() => {
		async function run() {
			if (preparedTable !== undefined) {
				let t = preparedTable.table!
				setIsProcessing(true)
				await clearSensitiveData()

				if (!t.column(defaultSubjectID)) {
					t = table({ RowID: _.range(1, t.totalRows() + 1) }).assign(t)
				}

				setSensitiveContent({
					table: t,
					headers: tableHeaders(t),
					columnsWithZeros: columnIndexesWithZeros(t),
					delimiter: ',',
					metadata: introspect(t, true),
					subjectId: defaultSubjectID,
				})
				setRecordLimit(t.numRows())
				setIsProcessing(false)
			}
		}
		void run()
	}, [preparedTable, setSensitiveContent, setIsProcessing, clearSensitiveData, setRecordLimit])

	return (
		<FileDrop accept=".csv,.tsv" noClick onDrop={handleDrop}>
			{children}
		</FileDrop>
	)
})
