/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import type { FC } from 'react'
import { memo } from 'react'
import styled from 'styled-components'

import { Flex } from '~components/Flexbox'

import { AggregateStatistics } from './AggregateStatistics'
import { InfoBar } from './InfoBar'
import { SelectCommands } from './SelectCommands'
import { TablePreview } from './TablePreview'

export const SelectPage: FC = memo(function SelectPage() {
	return (
		<Container vertical>
			<SelectCommands />
			<MainContent vertical>
				<AggregateStatistics />
				<InfoBar />
				<TablePreview />
			</MainContent>
		</Container>
	)
})
SelectPage.displayName = 'SelectPage'

const Container = styled(Flex)`
	height: 100%;
	overflow-y: auto;
	&::-webkit-scrollbar {
		display: none;
	}
`

const MainContent = styled(Flex)`
	height: 100%;
	overflow-y: auto;
`
