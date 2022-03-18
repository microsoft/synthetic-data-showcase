/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
export async function hash(contents: string): Promise<string> {
	const uint8Msg = new TextEncoder().encode(contents)
	const hashBuffer = await crypto.subtle.digest('SHA-1', uint8Msg)
	const hashArray = Array.from(new Uint8Array(hashBuffer))
	const hash = hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
	return hash
}
