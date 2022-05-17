/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import type { IColumn } from '@fluentui/react'
import { Selection } from '@fluentui/react'
import { useMemo } from 'react'

import type { ISynthesisInfo } from '~workers/types'
import { AtomicView } from '~workers/utils'

import { WrappedText } from './AllSynthesisInfo.styles'
import type { SelectSynthesisInfoCallback } from './AllSynthesisInfo.types'

export function useSynthesisInfoColumns(): IColumn[] {
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
			] as IColumn[],
		[],
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

				onSelected?.(
					selectedItems.length === 1
						? (selectedItems[0] as ISynthesisInfo)
						: null,
				)
			},
			items: allSynthesisInfo,
		})
		return selection
	}, [allSynthesisInfo, onSelected])
}
