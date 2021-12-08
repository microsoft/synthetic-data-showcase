/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { Spinner, Stack } from '@fluentui/react'
import React, { memo, Suspense } from 'react'
import styled from 'styled-components'
import { Pages } from './Pages'
import { NavBar } from '~components/NavBar'

export const Layout: React.FC = memo(function Layout({ children }) {
	const menuItems = Object.keys(Pages)
		.filter(k => !Pages[k].hideFromMenu)
		.map(k => ({
			key: Pages[k].name,
			text: Pages[k].name,
			pagePath: Pages[k].path,
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
