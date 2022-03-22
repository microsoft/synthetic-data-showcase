/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import { useCallback } from 'react'

import type { IContextParameters, ICsvContent } from '~models'

import type { GetSyntheticCsvContentCallback } from './useGetSyntheticCsvContent'

export function useSelectedContextParametersOnChange(
	selectedContextParameters: IContextParameters | undefined,
	getSyntheticCsvContent: GetSyntheticCsvContentCallback,
	setSyntheticContent: (content: ICsvContent) => void
): () => Promise<void> {
	return useCallback(async () => {
		if (selectedContextParameters) {
			setSyntheticContent(await getSyntheticCsvContent(selectedContextParameters))
		}
	}, [selectedContextParameters, getSyntheticCsvContent, setSyntheticContent])
}