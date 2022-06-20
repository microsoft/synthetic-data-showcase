/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import type { IIconProps } from '@fluentui/react'
import { PrimaryButton } from '@fluentui/react'
import { FlexContainer } from '@sds/components'
import type { FC } from 'react'
import { memo, useCallback, useRef } from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

import { Pages } from '~pages'
import { useCanRun, useOnGetAllAssetsDownloadInfo } from '~pages/hooks'

const downloadIcon: IIconProps = { iconName: 'Download' }

export const TitleBar: FC = memo(function TitleBar() {
	const canRun = useCanRun()
	const downloadAnchorRef = useRef<HTMLAnchorElement>(null)
	const onGetAllAssetsDownloadInfo = useOnGetAllAssetsDownloadInfo()

	const handleDownload = useCallback(async () => {
		if (downloadAnchorRef.current) {
			const info = await onGetAllAssetsDownloadInfo()

			if (info) {
				downloadAnchorRef.current.href = info.url
				downloadAnchorRef.current.download = info.alias
				downloadAnchorRef.current.click()
			}
		}
	}, [downloadAnchorRef, onGetAllAssetsDownloadInfo])
	return (
		<Container align="center" justify="space-between">
			<StyledLink to={Pages.Home.path}>{Pages.Home.name}</StyledLink>
			{canRun && (
				<StyledSpan>
					<StyledDownload iconProps={downloadIcon} onClick={handleDownload}>
						Download assets
					</StyledDownload>
					<DownloadAnchor style={{ display: 'none' }} ref={downloadAnchorRef} />
				</StyledSpan>
			)}
		</Container>
	)
})
TitleBar.displayName = 'TitleBar'

const Container = styled(FlexContainer)`
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

	&:hover,
	&.active {
		/* text-decoration: underline; */
	}
`

const StyledSpan = styled.span`
	margin-right: ${p => p.theme.spacing.m};
`

const StyledDownload = styled(PrimaryButton as any)`
	font-size: ${p => p.theme.fonts.mediumPlus.fontSize};
`

const DownloadAnchor = styled.a`
	display: none;
`
