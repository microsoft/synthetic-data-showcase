/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { useMemo } from 'react'
import type { HeaderNames } from 'sds-wasm'

const initiallySelectedHeaders = 6

export function calcInitiallySelectedHeaders(headers: HeaderNames): boolean[] {
	return headers.map((_, i) => i < initiallySelectedHeaders)
}

export function useInitiallySelectedHeaders(headers: HeaderNames): boolean[] {
	return useMemo(() => calcInitiallySelectedHeaders(headers), [headers])
}
