/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
export function stringToNumber(value: string): number | null {
	if (value !== '') {
		const n = +value

		if (!isNaN(n)) {
			return n
		}
	}
	return null
}
