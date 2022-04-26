/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { Spinner } from '@fluentui/react'
import type { FC, ReactNode } from 'react'
import { memo, Suspense } from 'react'
import { Route, Routes as Switch } from 'react-router-dom'
import styled from 'styled-components'

import type { PageDetails } from '~pages'
import { Pages } from '~pages'

import { Layout } from './Layout'

function toRoute(page: PageDetails): ReactNode {
	const Component = page.component
	return (
		<Route
			key={page.name}
			path={page.path}
			element={
				<Suspense fallback={<StyledSpinner />}>
					<Component />
				</Suspense>
			}
		/>
	)
}

export const Routes: FC = memo(function Routes() {
	const layoutRoutes = Object.values(Pages)
		.filter(page => page.useLayout)
		.map(toRoute)

	const independentRoutes = Object.values(Pages)
		.filter(page => !page.useLayout)
		.map(toRoute)

	return (
		<Switch>
			<Route path="/" element={<Layout />}>
				{layoutRoutes}
			</Route>
			{independentRoutes}
		</Switch>
	)
})

const StyledSpinner = styled(Spinner)`
	margin-top: 20px;
`
