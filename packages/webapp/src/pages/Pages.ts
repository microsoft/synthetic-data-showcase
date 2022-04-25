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
}

export const Pages: Record<string, PageDetails> = {
	Home: {
		name: 'Synthetic Data Showcase',
		path: '/',
		hideFromMenu: true,
		component: lazy(
			async () =>
				/* webpackChunkName: "HomePage" */
				await import('./Prepare'),
		),
	},
	Prepare: {
		name: 'Prepare',
		path: '/',
		hideFromMenu: false,
		component: lazy(
			async () =>
				/* webpackChunkName: "PreparePage" */
				await import('./Prepare'),
		),
	},
	Select: {
		name: 'Select',
		path: '/select',
		hideFromMenu: false,
		component: lazy(
			async () =>
				/* webpackChunkName: "SelectPage" */
				await import('./Select'),
		),
	},
	Synthesize: {
		name: 'Synthesize',
		path: '/synthesize',
		hideFromMenu: false,
		component: lazy(
			async () =>
				/* webpackChunkName: "SynthesizePage" */
				await import('./Synthesize'),
		),
	},
	Evaluate: {
		name: 'Evaluate',
		path: '/evaluate',
		hideFromMenu: false,
		component: lazy(
			async () =>
				/* webpackChunkName: "EvaluatePage" */
				await import('./Evaluate'),
		),
	},
	Navigate: {
		name: 'Navigate',
		path: 'navigate',
		hideFromMenu: false,
		component: lazy(
			async () =>
				/* webpackChunkName: "NavigatePage" */
				await import('./Navigate'),
		),
	},
}
