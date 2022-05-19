/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import type { FC } from 'react'
import { memo } from 'react'
import styled from 'styled-components'

import { DataNavigation } from './DataNavigation/index.js'

export const NavigatePage: FC = memo(function NavigatePage() {
	return (
		<Container>
			<DataNavigation />
		</Container>
	)
})
NavigatePage.displayName = 'NavigatePage'

const Container = styled.div`
	height: 100%;
	overflow-y: scroll;
`
