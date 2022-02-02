/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { useMemo } from 'react'
import { ICsvContent } from '~models'

export function useVisibleColumnNames(content: ICsvContent): string[] {
	return useMemo(() => {
		return content.headers.filter(h => h.use).map(h => h.name)
	}, [content])
}
