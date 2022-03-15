/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

export type PageDetails = {
	name: string
	path: string
	hideFromMenu: boolean
}
export const Pages: Record<string, PageDetails> = {
	DataShowcase: {
		name: 'Synthetic Data Showcase',
		path: '/sds',
		hideFromMenu: false,
	},
}
