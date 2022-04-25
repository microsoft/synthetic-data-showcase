/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { Spinner } from '@fluentui/react'
import type { FC } from 'react'
import { memo, Suspense } from 'react'
import { Route, Routes as Switch } from 'react-router-dom'
import styled from 'styled-components'

import { Pages } from '../Pages'
import { Layout } from './Layout'

export const Routes: FC = memo(function Routes() {
	const routes = Object.values(Pages).map(page => {
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
	})

	return (
		<Switch>
			<Route path="/" element={<Layout />}>
				{routes}
			</Route>
		</Switch>
	)
})

const StyledSpinner = styled(Spinner)`
	margin-top: 20px;
`
