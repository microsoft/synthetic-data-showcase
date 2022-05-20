/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { FlexItem } from '@sds/components'
import styled from 'styled-components'

export const ChartContainer = styled(FlexItem)`
	overflow-y: auto;
	padding: ${p => p.theme.spacing.s1};
	direction: ltr;
	& > div {
		direction: ltr;
	}
	&::-webkit-scrollbar {
		width: 4px;
		background: ${p => p.theme.palette.neutralLight};
	}
	&::-webkit-scrollbar-thumb {
		background-color: ${p => p.theme.palette.themePrimary};
		border-radius: 20px;
	}
`
