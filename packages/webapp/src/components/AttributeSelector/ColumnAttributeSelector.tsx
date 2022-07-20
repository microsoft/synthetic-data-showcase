/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import type {
	IAttributesIntersection,
	ISelectedAttributesByColumn,
} from '@essex/sds-core'
import { Label, Stack } from '@fluentui/react'
import { memo, useCallback, useEffect, useRef, useState } from 'react'

import { AttributeIntersectionValueChart } from '~components/Charts/AttributeIntersectionValueChart'
import { useStopPropagation } from '~components/Charts/hooks'
import { useSdsManagerInstance } from '~states'

import { useMaxCount } from './hooks.js'
import type { SetSelectedAttributesCallback } from './SelectedAttributes.js'

export interface ColumnAttributeSelectorProps {
	contextKey: string
	headerName: string
	columnIndex: number
	height: string | number
	width: string | number
	chartBarHeight: number
	minHeight?: string | number
	selectedAttributes: Set<string>
	selectedAttributesByColumn: ISelectedAttributesByColumn
	onSetSelectedAttributes: SetSelectedAttributesCallback
}

// fixed value for rough axis height so charts don't squish if selected down to 1
const AXIS_HEIGHT = 16

export const ColumnAttributeSelector: React.FC<ColumnAttributeSelectorProps> =
	memo(function ColumnAttributeSelector({
		contextKey,
		headerName,
		columnIndex,
		height,
		width,
		chartBarHeight,
		minHeight,
		selectedAttributes,
		selectedAttributesByColumn,
		onSetSelectedAttributes,
	}: ColumnAttributeSelectorProps) {
		const [items, setItems] = useState<IAttributesIntersection[]>([])
		const [manager] = useSdsManagerInstance()
		const maxCount = useMaxCount(items)
		const isMounted = useRef(true)
		const stopPropagation = useStopPropagation()

		const handleSelection = useCallback(
			async (item: IAttributesIntersection | undefined) => {
				const newValue = item?.value
				// toggle off with re-click
				if (newValue === undefined || selectedAttributes.has(newValue)) {
					await onSetSelectedAttributes(columnIndex, undefined)
				} else {
					await onSetSelectedAttributes(columnIndex, item)
				}
			},
			[selectedAttributes, onSetSelectedAttributes, columnIndex],
		)

		useEffect(() => {
			if (manager) {
				manager.instance
					.attributesIntersectionsByColumn(contextKey, [headerName])
					.then(intersections => {
						if (!isMounted.current || !intersections) {
							return
						}
						setItems(intersections[columnIndex] ?? [])
					})
					.catch(() => {
						if (!isMounted.current) {
							return
						}
					})
			}
		}, [
			manager,
			setItems,
			headerName,
			columnIndex,
			contextKey,
			selectedAttributesByColumn,
		])

		useEffect(() => {
			return () => {
				isMounted.current = false
			}
		}, [])

		return (
			<Stack
				styles={{
					root: {
						height: height,
						minHeight: minHeight,
						width: width,
					},
				}}
			>
				<Stack.Item>
					<Label styles={{ root: { fontWeight: 'bold' } }}>{headerName}</Label>
				</Stack.Item>
				<Stack.Item
					styles={{
						root: {
							overflowY: 'auto',
							paddingRight: '20px',
						},
					}}
					onWheel={stopPropagation}
				>
					<AttributeIntersectionValueChart
						items={items}
						onClick={handleSelection}
						maxCount={maxCount}
						height={chartBarHeight * Math.max(items.length, 1) + AXIS_HEIGHT}
						selectedAttributes={selectedAttributes}
					/>
				</Stack.Item>
			</Stack>
		)
	})
