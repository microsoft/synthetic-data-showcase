/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import type { FC, LazyExoticComponent } from 'react'
import { lazy } from 'react'

export type PageDetails = {
	name: string
	component: LazyExoticComponent<FC<any>>
	path: string
	hideFromMenu: boolean
	useLayout: boolean
}

export const Pages: Record<string, PageDetails> = {
	Home: {
		name: 'Synthetic Data Showcase',
		path: '/',
		hideFromMenu: true,
		useLayout: true,
		component: lazy(
			async () =>
				/* webpackChunkName: "HomePage" */
				await import('./Prepare/index.js'),
		),
	},
	Prepare: {
		name: 'Prepare',
		path: '/',
		hideFromMenu: false,
		useLayout: true,
		component: lazy(
			async () =>
				/* webpackChunkName: "PreparePage" */
				await import('./Prepare/index.js'),
		),
	},
	Select: {
		name: 'Select',
		path: '/select',
		hideFromMenu: false,
		useLayout: true,
		component: lazy(
			async () =>
				/* webpackChunkName: "SelectPage" */
				await import('./Select/index.js'),
		),
	},
	Synthesize: {
		name: 'Synthesize',
		path: '/synthesize',
		hideFromMenu: false,
		useLayout: true,
		component: lazy(
			async () =>
				/* webpackChunkName: "SynthesizePage" */
				await import('./Synthesize/index.js'),
		),
	},
	Navigate: {
		name: 'Navigate',
		path: 'navigate',
		hideFromMenu: false,
		useLayout: true,
		component: lazy(
			async () =>
				/* webpackChunkName: "NavigatePage" */
				await import('./Navigate/index.js'),
		),
	},
}
