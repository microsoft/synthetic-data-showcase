/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import type { IAggregateStatistics } from '@essex/sds-core'
import { Spinner } from '@fluentui/react'
import type { FC } from 'react'
import { memo, useCallback, useEffect, useRef, useState } from 'react'

import {
	useGlobalErrorMessage,
	useRawSynthesisParameters,
	useSdsManagerInstance,
	useSensitiveContent,
} from '~states'

import { useGetAggregateStatistics } from './AggregateStatistics.hooks.js'
import {
	ChartItem,
	ChartsContainer,
	Container,
	StyledReport,
} from './AggregateStatistics.styles.js'
import { ContributionChart } from './ContributionChart.js'

export const AggregateStatistics: FC = memo(function AggregateStatistics() {
	const currentAggregationId = useRef<string | undefined>('')
	const [managerInstance] = useSdsManagerInstance()
	const [sensitiveContent] = useSensitiveContent()
	const [statistics, setStatistics] = useState<IAggregateStatistics | null>(
		null,
	)
	const [isLoading, setIsLoading] = useState(false)
	const [, setGlobalErrorMessage] = useGlobalErrorMessage()
	const [rawSynthesisParams] = useRawSynthesisParameters()
	const getAggregateStatistics = useGetAggregateStatistics()
	const columnTooltipFormatter = useCallback(
		item => {
			return `The attributes of this column make ${statistics?.percentageOfRecordsWithRareCombinationsPerColumn[
				item.label
			].toFixed(2)}% of their containing records linkable, on average`
		},
		[statistics],
	)
	const attributeTooltipFormatter = useCallback(
		item => {
			return `This attribute makes ${statistics?.percentageOfRecordsWithRareCombinationsPerAttribute[
				item.label
			].toFixed(2)}% of its containing records linkable`
		},
		[statistics],
	)

	useEffect(() => {
		setIsLoading(true)
		setGlobalErrorMessage(undefined)

		getAggregateStatistics(
			sensitiveContent,
			rawSynthesisParams.recordLimit,
			rawSynthesisParams.reportingLength,
			rawSynthesisParams.resolution,
		).then(async aggregateStatisticsGetter => {
			const id = await aggregateStatisticsGetter?.id

			currentAggregationId.current = id

			try {
				const result = (await await aggregateStatisticsGetter?.promise) ?? null

				// only update if this was the last request made
				if (id === currentAggregationId.current) {
					setStatistics(result)
				}
			} catch (err) {
				if (currentAggregationId.current !== '') {
					setGlobalErrorMessage(err as string)
					setStatistics(null)
				}
			} finally {
				if (currentAggregationId.current !== '') {
					setIsLoading(false)
				}
			}
		})
	}, [getAggregateStatistics, sensitiveContent, rawSynthesisParams.recordLimit, rawSynthesisParams.reportingLength, rawSynthesisParams.resolution, setStatistics, setIsLoading, setGlobalErrorMessage])

	useEffect(() => {
		return () => {
			// cancel any pending execution on unmount
			managerInstance?.instance.forceAggregateStatisticsWorkerToTerminate()
			currentAggregationId.current = ''
		}
	}, [managerInstance])

	return (
		<Container vertical align="center">
			{isLoading ? (
				<Spinner />
			) : statistics && statistics.numberOfRecordsWithRareCombinations > 0 ? (
				<>
					<StyledReport>
						<b>{`Considering all combinations of attributes up to length ${
							rawSynthesisParams.reportingLength
						} (Aggregation Limit), ${(
							(statistics.numberOfRecordsWithRareCombinations * 100.0) /
							statistics.numberOfRecords
						).toFixed(0)}% of subjects (${
							statistics.numberOfRecordsWithRareCombinations
						}/${
							statistics.numberOfRecords
						}) are linkable via rare attribute combinations below ${
							rawSynthesisParams.resolution
						} (Privacy Resolution)`}</b>
					</StyledReport>
					<ChartsContainer justify="space-between">
						<ChartItem>
							<ContributionChart
								valuePerKey={
									statistics.percentageOfRecordsWithRareCombinationsPerColumn
								}
								label={'Most linkable columns'}
								containerHeight={220}
								barHeight={10}
								tooltipFormatter={columnTooltipFormatter}
							/>
						</ChartItem>
						<ChartItem>
							<ContributionChart
								valuePerKey={
									statistics.percentageOfRecordsWithRareCombinationsPerAttribute
								}
								label={'Most linkable attributes'}
								containerHeight={220}
								barHeight={10}
								tooltipFormatter={attributeTooltipFormatter}
							/>
						</ChartItem>
					</ChartsContainer>
				</>
			) : (
				<StyledReport>
					No rare attribute combinations (below the privacy resolution) based on
					the current parameters
				</StyledReport>
			)}
		</Container>
	)
})
AggregateStatistics.displayName = 'AggregateStatistics'
