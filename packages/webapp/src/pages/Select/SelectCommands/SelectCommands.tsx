/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { FlexContainer } from '@sds/components'
import type { FC } from 'react'
import { memo } from 'react'
import styled from 'styled-components'

import { MultiValueColumns } from './MultiValueColumns/index.js'
import { SelectColumns } from './SelectColumns/index.js'
import { SensitiveZeros } from './SensitiveZeros/index.js'
import { SubjectId } from './SubjectId/index.js'

export const SelectCommands: FC = memo(function SelectCommand() {
	return (
		<Container justify="center" align="center">
			<SelectColumns />
			<Divider>|</Divider>
			<SubjectId />
			<Divider>|</Divider>
			<SensitiveZeros />
			<Divider>|</Divider>
			<MultiValueColumns />
		</Container>
	)
})
SelectCommands.displayName = 'SelectCommands'

const Container = styled(FlexContainer)`
	border-bottom: 1px solid ${p => p.theme.palette.neutralLight};
	box-shadow: ${p => p.theme.effects.elevation4};
`

const Divider = styled.span`
	font-size: ${p => p.theme.fonts.smallPlus.fontSize};
	color: ${p => p.theme.palette.neutralTertiary};
`
