/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { FlexContainer } from '@sds/components'
import type { FC } from 'react'
import { memo } from 'react'
import styled from 'styled-components'

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

const Container = styled(FlexContainer)`
	height: 100%;
	overflow-y: auto;
	&::-webkit-scrollbar {
		display: none;
	}
`

const MainContent = styled(FlexContainer)`
	height: 100%;
	overflow-y: auto;
`
