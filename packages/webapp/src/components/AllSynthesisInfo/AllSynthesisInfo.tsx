/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { ActionButton, DetailsList, SelectionMode } from '@fluentui/react'
import { memo } from 'react'

import { Flex } from '~components/Flexbox'

import {
	useSynthesisInfoColumns,
	useSynthesisInfoSelection,
} from './AllSynthesisInfo.hooks'
import { Container } from './AllSynthesisInfo.styles'
import type { AllSynthesisInfoProps } from './AllSynthesisInfo.types'

export const AllSynthesisInfo: React.FC<AllSynthesisInfoProps> = memo(
	function AllSynthesisInfo({
		allSynthesisInfo,
		selectedSynthesisInfo,
		onSelected,
		onDelete,
	}) {
		const columns = useSynthesisInfoColumns()
		const selection = useSynthesisInfoSelection(
			allSynthesisInfo,
			selectedSynthesisInfo,
			onSelected,
		)

		return (
			<Container>
				<Flex vertical>
					<Flex.Box grow={1}>
						<DetailsList
							items={allSynthesisInfo}
							columns={columns}
							compact
							setKey={'none'}
							selection={selection}
							selectionMode={SelectionMode.single}
						/>
					</Flex.Box>
					<Flex.Box align="flex-start">
						<ActionButton
							text="Delete"
							disabled={!selectedSynthesisInfo || !onDelete}
							iconProps={{ iconName: 'delete' }}
							title="Delete selection"
							onClick={() =>
								selectedSynthesisInfo && onDelete?.(selectedSynthesisInfo)
							}
						/>
					</Flex.Box>
				</Flex>
			</Container>
		)
	},
)
