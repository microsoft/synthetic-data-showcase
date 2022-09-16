/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { FlexContainer } from '@sds/components'
import type { FC } from 'react'
import { memo } from 'react'
import styled from 'styled-components'

import { PageDescription, Pages } from '~pages'

import { AggregateStatistics } from './AggregateStatistics/index.js'
import { InfoBar } from './InfoBar/index.js'
import { SelectCommands } from './SelectCommands/index.js'
import { TablePreview } from './TablePreview/index.js'

export const SelectPage: FC = memo(function SelectPage() {
	return (
		<Container vertical>
			<PageDescription>{Pages.Select.description}</PageDescription>
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
