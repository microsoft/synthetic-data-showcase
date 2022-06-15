/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import type { HeaderNames } from '@essex/sds-core'
import type { MutableRefObject } from 'react'
import { useCallback } from 'react'

import type { ISdsManagerInstance } from '~models'

import { calcInitiallySelectedHeaders } from './useInitiallySelectedHeaders.js'

export function useOnRunNavigate(
	contextKey: string | undefined,
	setIsLoading: (value: boolean) => void,
	isMounted: MutableRefObject<boolean>,
	setHeaders: (value: HeaderNames) => void,
	setSelectedHeaders: (value: boolean[]) => void,
	manager: ISdsManagerInstance | null,
): () => Promise<void> {
	return useCallback(async () => {
		if (manager && contextKey) {
			setIsLoading(true)

			try {
				await manager.instance.navigate(contextKey)
				// eslint-disable-next-line @essex/adjacent-await
				const navigateResult = await manager.instance.getNavigateResult(
					contextKey,
				)
				if (isMounted.current) {
					setHeaders(navigateResult.headerNames)
					setSelectedHeaders(
						calcInitiallySelectedHeaders(navigateResult.headerNames),
					)
					setIsLoading(false)
				}
			} catch {
				if (isMounted.current) {
					setIsLoading(false)
				}
			}
		} else {
			setIsLoading(false)
		}
	}, [
		setIsLoading,
		manager,
		isMounted,
		setHeaders,
		setSelectedHeaders,
		contextKey,
	])
}
