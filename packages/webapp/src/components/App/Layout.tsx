/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { Spinner, Stack } from '@fluentui/react'
import React, { memo, Suspense } from 'react'
import styled from 'styled-components'

import { NavBar } from '~components/NavBar'

import { Pages } from './Pages'

export const Layout: React.FC = memo(function Layout({ children }) {
	const menuItems = Object.values(Pages)
		.filter(page => !page.hideFromMenu)
		.map(({ name, path }) => ({
			key: name,
			text: name,
			pagePath: path,
		}))

	return (
		<Stack>
			<NavBar title="SDS" menuItems={menuItems} />
			<Suspense fallback={<StyledSpinner />}>{children}</Suspense>
		</Stack>
	)
})

const StyledSpinner = styled(Spinner)`
	margin-top: 20px;
`
