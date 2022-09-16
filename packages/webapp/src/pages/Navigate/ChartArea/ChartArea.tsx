/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import type { FC } from 'react'
import { memo, useRef, useState } from 'react'
import styled from 'styled-components'

import { ColumnAttributeSelectorGrid } from '~components/AttributeSelector/index'
import {
	useHeaders,
	useSdsManagerInstance,
	useSelectedAttributesByColumn,
	useSelectedHeaders,
	useSelectedSynthesisInfo,
} from '~states'

import {
	useOnNewSelectedAttributesByColumn,
	useOnSetSelectedAttributes,
} from '../hooks/index.js'

export interface ChartAreaProps {
	isFullScreen: boolean
}

export const ChartArea: FC<ChartAreaProps> = memo(function ChartArea({
	isFullScreen,
}) {
	const [, setIsLoading] = useState(true)
	const [selectedAttributesByColumn, setSelectedAttributesByColumn] =
		useSelectedAttributesByColumn()
	const [manager] = useSdsManagerInstance()
	const isMounted = useRef(true)
	const [selectedSynthesis] = useSelectedSynthesisInfo()
	const [headers] = useHeaders()
	const [selectedHeaders] = useSelectedHeaders()
	const setNewSelectedAttributesByColumn = useOnNewSelectedAttributesByColumn(
		selectedSynthesis?.key,
		setIsLoading,
		isMounted,
		setSelectedAttributesByColumn,
		manager,
	)
	const onSetSelectedAttributes = useOnSetSelectedAttributes(
		setNewSelectedAttributesByColumn,
		selectedAttributesByColumn,
	)
	const viewHeight = isFullScreen
		? 'calc(100vh - 161px)'
		: 'calc(100vh - 278px)'
	const chartHeight = `calc((${viewHeight} / 2) - 25px)`

	return (
		<Container>
			<ColumnAttributeSelectorGrid
				contextKey={selectedSynthesis?.key ?? ''}
				viewHeight={viewHeight}
				headers={headers}
				selectedHeaders={selectedHeaders}
				chartHeight={chartHeight}
				chartWidth={400}
				chartBarHeight={40}
				chartMinHeight={150}
				selectedAttributesByColumn={selectedAttributesByColumn}
				onSetSelectedAttributes={onSetSelectedAttributes}
			/>
		</Container>
	)
})
ChartArea.displayName = 'ChartArea'

const Container = styled.div`
	height: 100%;
	width: 100%;
`
