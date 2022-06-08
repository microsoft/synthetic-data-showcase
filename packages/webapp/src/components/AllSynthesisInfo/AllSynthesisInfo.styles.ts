/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { Spinner } from '@fluentui/react'
import styled from 'styled-components'

export const WrappedText = styled.span`
	white-space: normal;
`

export const Container = styled.div`
	.ms-DetailsHeader {
		padding-top: 0px;
	}

	.ms-DetailsRow-cell {
		margin: auto;
	}
`

export const StyledSpinner = styled(Spinner)`
	align-items: baseline;
`
