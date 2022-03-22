/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { Label, Spinner, Stack } from '@fluentui/react'
import { memo, useCallback, useEffect, useRef, useState } from 'react'
import type { IAttributesIntersection } from 'sds-wasm'

import { AttributeIntersectionValueChart } from '~components/Charts/AttributeIntersectionValueChart'
import { useStopPropagation } from '~components/Charts/hooks'
import type { SetSelectedAttributesCallback } from '~components/Pages/DataShowcasePage/DataNavigation'
import { useWasmWorkerValue } from '~states'

import { useMaxCount } from './hooks'

export interface ColumnAttributeSelectorProps {
	contextKey: string
	headerName: string
	columnIndex: number
	height: string | number
	width: string | number
	chartBarHeight: number
	minHeight?: string | number
	selectedAttributes: Set<string>
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
		onSetSelectedAttributes,
	}: ColumnAttributeSelectorProps) {
		const [items, setItems] = useState<IAttributesIntersection[]>([])
		const [isLoading, setIsLoading] = useState(false)
		const worker = useWasmWorkerValue()
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
			if (worker) {
				setIsLoading(true)
				worker
					.attributesIntersectionsByColumn(contextKey, [headerName])
					.then(intersections => {
						if (!isMounted.current || !intersections) {
							return
						}
						setItems(intersections[columnIndex] ?? [])
						setIsLoading(false)
					})
			}
		}, [worker, setIsLoading, setItems, headerName, columnIndex, contextKey])

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
				{isLoading ? (
					<Spinner />
				) : (
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
				)}
			</Stack>
		)
	})
