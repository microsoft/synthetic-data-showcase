/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { FlexContainer } from '@sds/components'
import type { FC } from 'react'
import { memo, useCallback, useState } from 'react'
import styled from 'styled-components'

import { PageDescription, Pages } from '~pages'

import { ChartArea } from './ChartArea/ChartArea.js'
import { Commands } from './Commands/Commands.js'

export const NavigatePage: FC = memo(function NavigatePage() {
	const [isFullScreen, setIsFullScreen] = useState(false)
	const handleOnFullScreen = useCallback(
		(fullscreen: boolean) => {
			setIsFullScreen(fullscreen)
		},
		[setIsFullScreen],
	)

	return (
		<Container vertical className={isFullScreen ? 'fullScreen' : ''}>
			<PageDescription>{Pages.Navigate.description}</PageDescription>
			<Commands onFullScreenToggle={handleOnFullScreen} />
			<MainContent>
				<ChartArea isFullScreen={isFullScreen} />
			</MainContent>
		</Container>
	)
})
NavigatePage.displayName = 'NavigatePage'

const Container = styled(FlexContainer)`
	height: 100%;
	width: 100%;
	background: white;
	overflow-y: auto;
	&::-webkit-scrollbar {
		display: none;
	}

	&.fullScreen {
		position: fixed;
		height: 100vh;
		width: 100vw;
		top: 0;
		left: 0;
		z-index: 10000;
	}
`

const MainContent = styled(FlexContainer)`
	height: 100%;
	overflow-y: auto;
`
