/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { useMemo } from 'react'
import { ICsvContent } from '~models'

export function useIsMicrodataIdValid(content: ICsvContent): boolean {
	return useMemo(() => {
		if (content.microdataId) {
			const stats = content.metadata?.columns[content.microdataId].stats
			if (stats) {
				return stats.count === stats.distinct
			}
		}
		return true
	}, [content])
}
