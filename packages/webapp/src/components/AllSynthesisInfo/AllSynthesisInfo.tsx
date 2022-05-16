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
		selectedKey,
		onSelected,
		onDelete,
	}) {
		const columns = useSynthesisInfoColumns()
		const selection = useSynthesisInfoSelection(selectedKey, onSelected)

		return (
			<Container>
				<Flex vertical>
					{onDelete && (
						<Flex.Box align="flex-end">
							<ActionButton
								text="Delete"
								disabled={selectedKey === undefined}
								iconProps={{ iconName: 'delete' }}
								title="Delete selection"
								onClick={() => selectedKey && onDelete?.(selectedKey)}
							/>
						</Flex.Box>
					)}
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
				</Flex>
			</Container>
		)
	},
)