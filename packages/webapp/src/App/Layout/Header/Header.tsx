/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { FlexContainer } from '@sds/components'
import type { FC } from 'react'
import { memo } from 'react'

import { ErrorBar } from './ErrorBar/index.js'
import { NavBar } from './NavBar/index.js'
import { TitleBar } from './TitleBar/index.js'

export const Header: FC = memo(function Header() {
	return (
		<FlexContainer vertical>
			<TitleBar />
			<NavBar />
			<ErrorBar />
		</FlexContainer>
	)
})
Header.displayName = 'Header'
