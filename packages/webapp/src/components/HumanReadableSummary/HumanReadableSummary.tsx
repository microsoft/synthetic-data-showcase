/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import type { IColumn, IDetailsRowStyles } from '@fluentui/react'
import {
	DetailsList,
	DetailsListLayoutMode,
	DetailsRow,
	SelectionMode,
	useTheme,
} from '@fluentui/react'
import { memo, useCallback } from 'react'
import type { IEvaluateResult } from 'sds-wasm'
import styled from 'styled-components'

import type { ISynthesisInfo } from '~workers/types'

import { useHumanReadableSummaryItems } from './HumanReadableSummary.hooks'

export interface HumanReadableSummaryProps {
	evaluateResult: IEvaluateResult
	synthesisInfo: ISynthesisInfo
}

export const HumanReadableSummary: React.FC<HumanReadableSummaryProps> = memo(
	function HumanReadableSummary({
		evaluateResult,
		synthesisInfo,
	}: HumanReadableSummaryProps) {
		const theme = useTheme()
		const columns: IColumn[] = [
			{
				key: 'name',
				name: 'Name',
				fieldName: 'name',
				minWidth: 130,
				maxWidth: 130,
				isResizable: true,
				onRender: item => <b>{item.name}</b>,
			},
			{
				key: 'text',
				name: 'Text',
				fieldName: 'text',
				minWidth: 100,
				isResizable: true,
				onRender: item => <WrappedText>{item.text}</WrappedText>,
			},
		]
		const items = useHumanReadableSummaryItems(evaluateResult, synthesisInfo)
		const onRenderRow = useCallback(
			props => {
				const customStyles: Partial<IDetailsRowStyles> = {}
				if (props) {
					if (props.itemIndex % 2 === 0) {
						customStyles.root = { backgroundColor: theme.palette.neutralLight }
					}
					return <DetailsRow {...props} styles={customStyles} />
				}
				return null
			},
			[theme],
		)

		return (
			<DetailsList
				selectionMode={SelectionMode.none}
				layoutMode={DetailsListLayoutMode.justified}
				isHeaderVisible={false}
				columns={columns}
				items={items}
				onRenderRow={onRenderRow}
			/>
		)
	},
)

const WrappedText = styled.span`
	white-space: normal;
`
