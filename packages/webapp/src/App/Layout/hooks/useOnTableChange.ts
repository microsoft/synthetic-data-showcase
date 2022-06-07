/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { introspect } from '@data-wrangling-components/core'
import { useEffect } from 'react'

import {
	useClearSensitiveData,
	useIsProcessingSetter,
	usePreparedTable,
	useRawSynthesisParametersPropertySetter,
	useSensitiveContent,
} from '~states'
import { columnIndexesWithZeros, tableHeaders } from '~utils'

export function useOnTableChange(): void {
	const [preparedTable] = usePreparedTable()
	const [, setSensitiveContent] = useSensitiveContent()
	const setIsProcessing = useIsProcessingSetter()
	const clearSensitiveData = useClearSensitiveData()
	const setRecordLimit = useRawSynthesisParametersPropertySetter('recordLimit')

	useEffect(() => {
		async function run() {
			if (preparedTable !== undefined) {
				const t = preparedTable.table!
				setIsProcessing(true)
				await clearSensitiveData()

				setSensitiveContent({
					table: t,
					headers: tableHeaders(t),
					columnsWithZeros: columnIndexesWithZeros(t),
					delimiter: ',',
					metadata: introspect(t, true),
				})
				setRecordLimit(t.numRows())
				setIsProcessing(false)
			}
		}
		void run()
	}, [
		preparedTable,
		setSensitiveContent,
		setIsProcessing,
		clearSensitiveData,
		setRecordLimit,
	])
}
