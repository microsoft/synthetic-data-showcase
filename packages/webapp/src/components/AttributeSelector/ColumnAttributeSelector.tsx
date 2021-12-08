/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { Stack, Spinner, Label } from '@fluentui/react'
import _ from 'lodash'
import { memo, useCallback, useEffect, useRef, useState } from 'react'
import { useOnAttributeSelection } from './hooks'
import { AttributeIntersectionValueChart } from '~components/Charts/AttributeIntersectionValueChart'
import { useStopPropagation } from '~components/Charts/hooks'
import { CsvRecord, IAttributesIntersectionValue } from '~models'
import {
	useEvaluatedResultValue,
	useNavigateResultValue,
	useWasmWorkerValue,
} from '~states'
import {
	useSelectedAttributeRows,
	useSelectedAttributes,
} from '~states/dataShowcaseContext'

export interface ColumnAttributeSelectorProps {
	headers: CsvRecord
	headerName: string
	columnIndex: number
	height: string | number
	width: number | number
	chartHeight: number
	minHeight?: string | number
}

// fixed value for rough axis height so charts don't squish if selected down to 1
const AXIS_HEIGHT = 46

export const ColumnAttributeSelector: React.FC<ColumnAttributeSelectorProps> =
	memo(function ColumnAttributeSelector({
		headers,
		headerName,
		columnIndex,
		height,
		width,
		chartHeight,
		minHeight,
	}: ColumnAttributeSelectorProps) {
		const [selectedAttributeRows, setSelectedAttributeRows] =
			useSelectedAttributeRows()
		const [selectedAttributes, setSelectedAttributes] = useSelectedAttributes()
		const navigateResult = useNavigateResultValue()
		const [items, setItems] = useState<IAttributesIntersectionValue[]>([])
		const [isLoading, setIsLoading] = useState(false)
		const isMounted = useRef(true)
		const evaluatedResult = useEvaluatedResultValue()
		const worker = useWasmWorkerValue()
		const selectedAttribute = selectedAttributes[columnIndex]
		const maxCount =
			_.max([
				_.maxBy(items, item => item.estimatedCount)?.estimatedCount,
				_.maxBy(items, item => item.actualCount ?? 0)?.actualCount,
			]) ?? 1

		const onAttributeSelection = useOnAttributeSelection(
			setIsLoading,
			selectedAttributes,
			worker,
			navigateResult,
			isMounted,
			setSelectedAttributes,
			setSelectedAttributeRows,
		)

		const handleSelection = useCallback(
			(item: IAttributesIntersectionValue | undefined) => {
				const newValue = item?.value
				// toggle off with re-click
				if (newValue === selectedAttribute) {
					onAttributeSelection(columnIndex, undefined)
				} else {
					onAttributeSelection(columnIndex, newValue)
				}
			},
			[selectedAttribute, columnIndex, onAttributeSelection],
		)

		const stopPropagation = useStopPropagation()

		useEffect(() => {
			if (worker) {
				setIsLoading(true)
				worker
					.intersectAttributesInColumnsWith(
						headers,
						navigateResult.allRows,
						navigateResult.attrsInColumnsMap[columnIndex] ?? new Set(),
						selectedAttributeRows,
						selectedAttributes,
						navigateResult.attrRowsMap,
						columnIndex,
						evaluatedResult.sensitiveAggregatedResult?.aggregatedCombinations,
					)
					.then(newItems => {
						if (isMounted.current) {
							setItems(newItems ?? [])
							setIsLoading(false)
						}
					})
			}
		}, [
			worker,
			navigateResult,
			headers,
			selectedAttributeRows,
			selectedAttributes,
			columnIndex,
			evaluatedResult,
			setItems,
			setIsLoading,
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
							height={chartHeight * Math.max(items.length, 1) + AXIS_HEIGHT}
							selectedValue={selectedAttribute}
						/>
					</Stack.Item>
				)}
			</Stack>
		)
	})
