/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import type { FC } from 'react'
import { memo } from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

import { Flex } from '../../../components/Flexbox'
import { Pages } from '../../Pages'
import { ErrorBar } from './ErrorBar'
import { NavBar } from './NavBar'

export const Header: FC = memo(function Header() {
	return (
		<>
			<TitleBar>
				<StyledLink to={Pages.Home.path}>{Pages.Home.name}</StyledLink>
			</TitleBar>
			<NavBar />
			<ErrorBar />
		</>
	)
})
Header.displayName = 'Header'

const TitleBar = styled.div`
	z-index: 5;
	background: ${p => p.theme.palette.themePrimary};
	border-bottom: 1px solid ${p => p.theme.palette.themeSecondary};
	box-shadow: ${p => p.theme.effects.elevation4};
`

const StyledLink = styled(NavLink)`
	display: inline-block;
	color: ${p => p.theme.palette.neutralLight};
	font-size: ${p => p.theme.fonts.xLarge.fontSize};
	/* font-weight: bold; */
	letter-spacing: 1.5px;
	text-decoration: none;
	padding: ${p => p.theme.spacing.m};
	font-style: italic;

	&:hover,
	&.active {
		/* text-decoration: underline; */
	}
`
