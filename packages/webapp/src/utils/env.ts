/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
export function getBaseUrl(): string {
	let base = (import.meta.env.VITE_BASE_URL as string) || ''

	if (!base.endsWith('/')) {
		base += '/'
	}
	return base
}

export function getSdsWasmLogLevel(): string {
	return (import.meta.env.VITE_SDS_WASM_LOG_LEVEL as string) || 'warn'
}
