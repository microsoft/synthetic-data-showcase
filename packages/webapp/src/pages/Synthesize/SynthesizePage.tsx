/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import type { FC } from 'react'
import { memo } from 'react'
import styled from 'styled-components'

import { DataSynthesis } from './DataSynthesis/index.js'

export const SynthesizePage: FC = memo(function SynthesizePage() {
	return (
		<Container>
			<DataSynthesis />
		</Container>
	)
})
SynthesizePage.displayName = 'SynthesizePage'

const Container = styled.div`
	height: 100%;
	overflow-y: scroll;
`
