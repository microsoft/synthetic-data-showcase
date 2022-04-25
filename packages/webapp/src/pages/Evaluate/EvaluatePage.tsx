/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import type { FC } from 'react'
import { memo } from 'react'
import styled from 'styled-components'

import { DataEvaluation } from './DataEvaluation'

export const EvaluatePage: FC = memo(function EvaluatePage() {
	return (
		<Container>
			<DataEvaluation />
		</Container>
	)
})
EvaluatePage.displayName = 'EvaluatePage'

const Container = styled.div`
	height: 100%;
	overflow-y: scroll;
`
