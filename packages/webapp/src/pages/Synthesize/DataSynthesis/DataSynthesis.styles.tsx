/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import styled from 'styled-components'

import { Flex } from '~components/Flexbox'

export const Container = styled(Flex)`
	margin-top: ${p => p.theme.spacing.s2};
	margin-left: ${p => p.theme.spacing.l1};
	margin-right: ${p => p.theme.spacing.l1};
`
