/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import type { RefObject } from 'react'
import { useCallback } from 'react'

import type { DownloadInfo } from './DownloadInfo.js'

export function useDownloadOnClick(
	downloadAnchorRef: RefObject<HTMLAnchorElement>,
	getDownloadInfo: () => Promise<DownloadInfo | undefined>,
): () => void {
	return useCallback(async () => {
		if (downloadAnchorRef.current) {
			const info = await getDownloadInfo()

			if (info) {
				downloadAnchorRef.current.href = info.url
				downloadAnchorRef.current.download = info.alias
				downloadAnchorRef.current.click()
			}
		}
	}, [downloadAnchorRef, getDownloadInfo])
}
