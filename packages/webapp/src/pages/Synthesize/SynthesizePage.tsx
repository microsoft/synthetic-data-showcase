/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import type { FC } from 'react'
import { memo } from 'react'
import styled from 'styled-components'

import { PageDescription, Pages } from '~pages'

import { DataSynthesis } from './DataSynthesis/index.js'

export const SynthesizePage: FC = memo(function SynthesizePage() {
	return (
		<Container>
			<PageDescription>{Pages.Synthesize.description}</PageDescription>
			<DataSynthesis />
		</Container>
	)
})
SynthesizePage.displayName = 'SynthesizePage'

const Container = styled.div`
	height: 100%;
	overflow-y: auto;
`
