/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import type { MutableRefObject } from 'react'
import { useCallback } from 'react'

import type { IContextParameters, ICsvContent } from '~models'

import type { GetSyntheticCsvContentCallback } from './useGetSyntheticCsvContent'

export function useSelectedContextParametersOnChange(
	selectedContextParameters: IContextParameters | undefined,
	getSyntheticCsvContent: GetSyntheticCsvContentCallback,
	setSyntheticContent: (content: ICsvContent) => void,
	isMounted: MutableRefObject<boolean>,
): () => Promise<void> {
	return useCallback(async () => {
		if (selectedContextParameters) {
			const result = await getSyntheticCsvContent(selectedContextParameters)

			if (isMounted.current) {
				setSyntheticContent(result)
			}
		}
	}, [
		selectedContextParameters,
		getSyntheticCsvContent,
		setSyntheticContent,
		isMounted,
	])
}
