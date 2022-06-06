/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { useMemo } from 'react'

import { useIsProcessingValue, useSensitiveContentValue } from '~states'

export function useCanRun(): boolean {
	const content = useSensitiveContentValue()
	const isProcessing = useIsProcessingValue()

	return useMemo(() => {
		return content.table.totalRows() > 0 && !isProcessing
	}, [content, isProcessing])
}
