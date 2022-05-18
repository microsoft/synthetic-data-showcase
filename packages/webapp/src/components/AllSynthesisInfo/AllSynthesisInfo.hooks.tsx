/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import type { IColumn } from '@fluentui/react'
import { IconButton, Selection, SelectionMode } from '@fluentui/react'
import { useMemo } from 'react'

import type { ISynthesisInfo } from '~workers/types'
import { AtomicView } from '~workers/utils'

import { WrappedText } from './AllSynthesisInfo.styles'
import type {
	DeleteSynthesisInfoCallback,
	SelectSynthesisInfoCallback,
} from './AllSynthesisInfo.types'

export function useSynthesisInfoColumns(
	onDelete?: DeleteSynthesisInfoCallback,
): IColumn[] {
	return useMemo(
		() =>
			[
				{
					name: 'Parameters',
					onRender: (item: ISynthesisInfo) => {
						return <WrappedText>{item.key}</WrappedText>
					},
					key: 'key',
					minWidth: 100,
					isResizable: true,
				},
				{
					name: 'Error',
					onRender: (item: ISynthesisInfo) => {
						return <WrappedText>{item.errorMessage ?? '-'}</WrappedText>
					},
					key: 'errorMessage',
					minWidth: 100,
					isResizable: true,
				},
				{
					name: 'Status',
					onRender: (item: ISynthesisInfo) => {
						return <WrappedText>{item.status}</WrappedText>
					},
					key: 'status',
					minWidth: 100,
					isResizable: true,
				},
				{
					name: 'Executed in',
					onRender: (item: ISynthesisInfo) => {
						return (
							<WrappedText>
								{item.finishedAt
									? `${(
											(item.finishedAt.valueOf() - item.startedAt.valueOf()) /
											1000
									  ).toFixed(2)}s`
									: ''}
							</WrappedText>
						)
					},
					key: 'executedIn',
					minWidth: 100,
					isResizable: true,
				},
				{
					name: 'Progress',
					onRender: (item: ISynthesisInfo) => {
						return (
							<WrappedText>{`${new AtomicView(item.progress)
								.getNumber()
								.toFixed()}%`}</WrappedText>
						)
					},
					key: 'progress',
					minWidth: 100,
					isResizable: true,
				},
				{
					name: 'Delete',
					onRender: (item: ISynthesisInfo) => {
						return (
							<IconButton
								data-selection-disabled
								text="Delete/Terminate synthesis"
								iconProps={{ iconName: 'delete' }}
								title="Delete/Terminate synthesis"
								onClick={() => onDelete?.(item)}
							/>
						)
					},
					key: 'delete',
					minWidth: 100,
					isResizable: true,
				},
			] as IColumn[],
		[onDelete],
	)
}

export function useSynthesisInfoSelection(
	allSynthesisInfo: ISynthesisInfo[],
	onSelected?: SelectSynthesisInfoCallback,
): Selection {
	return useMemo(() => {
		const selection = new Selection({
			onSelectionChanged: () => {
				const selectedItems = selection.getSelection()

				selectedItems.length === 1 &&
					onSelected?.(selectedItems[0] as ISynthesisInfo)
			},
			items: allSynthesisInfo,
			selectionMode: SelectionMode.single,
		})
		return selection
	}, [allSynthesisInfo, onSelected])
}
