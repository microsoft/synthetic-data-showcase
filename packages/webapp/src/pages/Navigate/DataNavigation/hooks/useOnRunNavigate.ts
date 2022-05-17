/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import type { MutableRefObject } from 'react'
import { useCallback } from 'react'

import type { ISdsManagerInstance } from '~models'

export function useOnRunNavigate(
	contextKey: string | undefined,
	setIsLoading: (value: boolean) => void,
	isMounted: MutableRefObject<boolean>,
	setSelectedHeaders: (value: boolean[]) => void,
	initiallySelectedHeaders: boolean[],
	manager: ISdsManagerInstance | null,
): () => Promise<void> {
	return useCallback(async () => {
		if (manager && contextKey) {
			setIsLoading(true)

			try {
				await manager.instance.navigate(contextKey)

				if (isMounted.current) {
					setSelectedHeaders(initiallySelectedHeaders)
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
		setSelectedHeaders,
		initiallySelectedHeaders,
		contextKey,
	])
}
