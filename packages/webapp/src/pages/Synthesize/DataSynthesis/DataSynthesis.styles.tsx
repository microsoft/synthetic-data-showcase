/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import { FlexContainer } from '@sds/components'
import styled from 'styled-components'

export const Container = styled(FlexContainer)`
	margin-top: ${p => p.theme.spacing.s2};
	margin-left: ${p => p.theme.spacing.l1};
	margin-right: ${p => p.theme.spacing.l1};
`
