/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import type { FC } from 'react'
import { memo } from 'react'

import { Flex } from '~components/Flexbox'

import { ErrorBar } from './ErrorBar'
import { NavBar } from './NavBar'
import { TitleBar } from './TitleBar'

export const Header: FC = memo(function Header() {
	return (
		<Flex vertical>
			<TitleBar />
			<NavBar />
			<ErrorBar />
		</Flex>
	)
})
Header.displayName = 'Header'
