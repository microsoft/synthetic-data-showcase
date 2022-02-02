/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { useMemo } from 'react'
import { useIsSubjectIdValid } from '.'
import { useIsProcessingValue, useSensitiveContentValue } from '~states'

export function useCanRun(): boolean {
	const content = useSensitiveContentValue()
	const isProcessing = useIsProcessingValue()
	const isValid = useIsSubjectIdValid(content)

	return useMemo(() => {
		return content.table.totalRows() > 0 && !isProcessing && isValid === true
	}, [content, isProcessing, isValid])
}
