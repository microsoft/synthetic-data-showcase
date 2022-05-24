/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { FlexContainer } from '@sds/components'
import styled from 'styled-components'

export const Container = styled(FlexContainer)`
	width: 100%;
	padding: ${p => p.theme.spacing.m};
	font-size: ${p => p.theme.fonts.large.fontSize};
`

export const StyledReport = styled.div`
	margin-bottom: ${p => p.theme.spacing.m};
`
