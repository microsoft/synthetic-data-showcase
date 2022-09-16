/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { FlexContainer } from '@sds/components'
import type { FC } from 'react'
import { memo } from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

import { Pages } from '~pages'

export const NavBar: FC = memo(function NavBar() {
	const links = Object.values(Pages)
		.filter(page => !page.hideFromMenu)
		.map((page, idx) => {
			return (
				<StyledLink
					className={idx === 0 ? 'first' : ''}
					key={page.path}
					to={page.path}
				>
					{page.name}
				</StyledLink>
			)
		})

	return (
		<Container>
			<FlexContainer align="center">{links}</FlexContainer>
		</Container>
	)
})

const Container = styled.div`
	background: ${p => p.theme.palette.neutralSecondary};
`

const StyledLink = styled(NavLink)`
	position: relative;
	height: 24px;
	line-height: 24px;
	color: ${p => p.theme.palette.neutralLight};
	background: ${p => p.theme.palette.neutralSecondary};
	font-size: ${p => p.theme.fonts.small.fontSize};
	/* margin-right: 1px; */
	/* font-weight: bold; */
	letter-spacing: 1.75px;
	padding: 0 ${p => p.theme.spacing.l2};
	text-decoration: none;

	&.first {
		padding-left: ${p => p.theme.spacing.m};
		&:before {
			display: none;
		}
	}
	&:hover {
		color: ${p => p.theme.palette.white};
		background: ${p => p.theme.palette.neutralPrimary};
		&:after {
			border-left: 10px solid ${p => p.theme.palette.neutralPrimary};
		}
	}
	&.active {
		color: ${p => p.theme.palette.black};
		font-weight: bold;
		background: ${p => p.theme.palette.neutralLighterAlt};
		&:after {
			border-left: 10px solid ${p => p.theme.palette.neutralLighterAlt};
		}
	}

	&:after {
		content: '';
		position: absolute;
		right: -10px;
		bottom: 0;
		width: 0;
		height: 0;
		z-index: 1;
		border-left: 10px solid ${p => p.theme.palette.neutralSecondary};
		border-top: 12px solid transparent;
		border-bottom: 12px solid transparent;
	}

	&:before {
		content: '';
		position: absolute;
		left: 0px;
		bottom: 0;
		width: 0;
		height: 0;
		border-left: 10px solid ${p => p.theme.palette.neutralSecondary};
		border-top: 12px solid transparent;
		border-bottom: 12px solid transparent;
	}
`
