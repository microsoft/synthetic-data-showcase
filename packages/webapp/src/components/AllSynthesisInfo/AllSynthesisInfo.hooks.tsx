/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import type { IColumn } from '@fluentui/react'
import { IconButton, Selection, SelectionMode } from '@fluentui/react'
import { useMemo } from 'react'

import type { ISynthesisInfo } from '~workers/types'
import { IWasmSynthesizerWorkerStatus } from '~workers/types'

import { StyledSpinner, WrappedText } from './AllSynthesisInfo.styles.js'
import type {
	DeleteSynthesisInfoCallback,
	SelectSynthesisInfoCallback,
} from './AllSynthesisInfo.types.js'

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
						return <WrappedText>{`${item.progress.toFixed()}%`}</WrappedText>
					},
					key: 'progress',
					minWidth: 100,
					isResizable: true,
				},
				{
					name: 'Delete',
					onRender: (item: ISynthesisInfo) => {
						return item.status !== IWasmSynthesizerWorkerStatus.TERMINATING ? (
							<IconButton
								data-selection-disabled
								text="Delete/Terminate synthesis"
								iconProps={{ iconName: 'delete' }}
								title="Delete/Terminate synthesis"
								onClick={() => onDelete?.(item)}
							/>
						) : (
							<StyledSpinner />
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
	onSelected?: SelectSynthesisInfoCallback,
): Selection {
	return useMemo(() => {
		const selection = new Selection({
			onSelectionChanged: () => {
				const selectedItems = selection.getSelection()

				selectedItems.length === 1 &&
					onSelected?.(selectedItems[0] as ISynthesisInfo)
			},
			selectionMode: SelectionMode.single,
		})
		return selection
	}, [onSelected])
}
