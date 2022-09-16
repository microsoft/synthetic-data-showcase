/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import { Label } from '@fluentui/react'
import type { FC, LazyExoticComponent } from 'react'
import { lazy } from 'react'
import styled from 'styled-components'

export type PageDetails = {
	name: string
	component: LazyExoticComponent<FC<any>>
	path: string
	hideFromMenu: boolean
	useLayout: boolean
	description: string
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
		description: 'Home page.',
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
		description:
			'Prepare the sensitive data behind your synthetic dataset. Transform until each individual is represented by a single row of discrete attribute values. All data and processing remain local to your web browser.',
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
		description:
			'Select sensitive columns to release. Assess privacy risk of small groups (below Privacy Resolution) being linkable via short attribute combinations (up to Aggregation Limit). Remove linkable columns for accuracy.',
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
		description:
			'Generate synthetic data that captures the structure of your sensitive data while preserving privacy. Choose privacy guarantees of k-anonymity or differential privacy. Compare utility across multiple synthesis runs.',
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
		description:
			'Explore the synthetic dataset by selecting combinations of attributes and viewing counts of matching individuals. Evaluate accuracy of synthetic counts relative to sensitive aggregate counts. Download and share.',
	},
}

export const PageDescription = styled(Label)`
	text-align: center;
	color: ${p => p.theme.palette.black};
	background: ${p => p.theme.palette.neutralLighterAlt};
	font-size: ${p => p.theme.fonts.small.fontSize};
	letter-spacing: 1.75px;
	text-decoration: none;
`
