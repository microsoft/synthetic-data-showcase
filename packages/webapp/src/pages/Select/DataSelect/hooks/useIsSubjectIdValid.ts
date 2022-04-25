/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { useMemo } from 'react'

import type { ICsvContent } from '../../../../models'

export function useIsSubjectIdValid(content: ICsvContent): boolean | undefined {
	return useMemo(() => {
		if (content.table.totalRows() === 0) {
			return true
		}
		if (content.subjectId) {
			const stats = content.metadata?.columns[content.subjectId].stats
			if (stats) {
				return stats.count === stats.distinct
			}
			return false
		}
		return undefined
	}, [content])
}

export function useSubjectIdErrorMessage(
	content: ICsvContent,
): string | undefined {
	const isValid = useIsSubjectIdValid(content)

	return useMemo(() => {
		if (isValid === false) {
			return `Your subject ID "${content.subjectId}" has duplicated values`
		} else if (isValid === undefined) {
			return `Please select a subject ID`
		}
		return undefined
	}, [isValid, content])
}
