/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { container } from '@data-wrangling-components/core'
import { fromCSV } from 'arquero'
import type { FC } from 'react'
import { memo, useCallback } from 'react'
import type { FileRejection } from 'react-dropzone'

import { FileDrop } from '~components/FileDrop'
import { useFileUploadErrorMessage, useTables } from '~states'

export const FileUploader: FC = memo(function FileUploader({ children }) {
	const [, setFileUploadErrorMessage] = useFileUploadErrorMessage()
	const [, updateTables] = useTables()

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

	return (
		<FileDrop accept=".csv,.tsv" noClick onDrop={handleDrop}>
			{children}
		</FileDrop>
	)
})
