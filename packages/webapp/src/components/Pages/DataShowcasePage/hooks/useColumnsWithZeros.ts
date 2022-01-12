/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { useMemo } from 'react'
import { ICsvContent } from '~models'

export function useColumnsWithZeros(
	content: ICsvContent,
): string[] | undefined {
	return useMemo(
		() =>
			content.columnsWithZeros
				?.map(i => content.headers[i])
				.filter(h => h.use)
				.map(h => h.name),
		[content],
	)
}
