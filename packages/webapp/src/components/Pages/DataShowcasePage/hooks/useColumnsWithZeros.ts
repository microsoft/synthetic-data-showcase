/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { useMemo } from 'react'
import { ICsvContent } from '~models'

export function useColumnsWithZeros(
	content: ICsvContent,
): number[] | undefined {
	return useMemo(
		() => content.columnsWithZeros?.filter(i => content.headers[i].use),
		[content],
	)
}
