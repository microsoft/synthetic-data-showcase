/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import type { FC } from 'react'
import { memo } from 'react'
import styled from 'styled-components'

import { DataInput } from './DataInput'

export const PreparePage: FC = memo(function PreparePage() {
	return (
		<Container>
			<DataInput />
		</Container>
	)
})
PreparePage.displayName = 'PreparePage'

const Container = styled.div`
	height: 100%;
	overflow-y: scroll;
`
