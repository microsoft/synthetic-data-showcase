/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import type { FC } from 'react'
import { memo } from 'react'
import styled from 'styled-components'

import { DataSelect } from './DataSelect'

export const SelectPage: FC = memo(function SelectPage() {
	return (
		<Container>
			<DataSelect />
		</Container>
	)
})
SelectPage.displayName = 'SelectPage'

const Container = styled.div`
	height: 100%;
	overflow-y: scroll;
`
