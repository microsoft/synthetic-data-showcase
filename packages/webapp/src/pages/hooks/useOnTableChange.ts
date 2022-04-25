/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { introspect } from '@data-wrangling-components/core'
import { op } from 'arquero'
import { useEffect } from 'react'

import { defaultSubjectID } from '~models'
import {
	useClearSensitiveData,
	useIsProcessingSetter,
	useNoiseDeltaSetter,
	usePreparedTable,
	useRecordLimitSetter,
	useSensitiveContent,
} from '~states'
import { columnIndexesWithZeros, tableHeaders } from '~utils'

export function useOnTableChange(): void {
	const [preparedTable] = usePreparedTable()
	const [, setSensitiveContent] = useSensitiveContent()
	const setIsProcessing = useIsProcessingSetter()
	const clearSensitiveData = useClearSensitiveData()
	const setRecordLimit = useRecordLimitSetter()
	const setNoiseDelta = useNoiseDeltaSetter()
	useEffect(() => {
		async function run() {
			if (preparedTable !== undefined) {
				let t = preparedTable.table!
				setIsProcessing(true)
				await clearSensitiveData()

				if (!t.column(defaultSubjectID)) {
					t = t.derive({ [defaultSubjectID]: op.row_number() }, { before: 0 })
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
				if (t.numRows() > 0) {
					setNoiseDelta(1 / (2 * t.numRows()))
				}
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
		setNoiseDelta,
	])
}
