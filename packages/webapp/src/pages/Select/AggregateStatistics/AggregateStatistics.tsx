/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { Spinner } from '@fluentui/react'
import { FlexContainer, FlexItem } from '@sds/components'
import type { Remote } from 'comlink'
import type { FC } from 'react'
import { memo, useCallback, useEffect, useState } from 'react'
import type { IAggregateStatistics } from 'sds-wasm'

import {
	useGlobalErrorMessage,
	useRawSynthesisParameters,
	useSensitiveContent,
} from '~states'
import type { ICancelablePromise } from '~workers/types'

import {
	useAttributesWithRareCombinationsPercentage,
	useColumnsWithRareCombinationsPercentage,
	useGetAggregateStatistics,
} from './AggregateStatistics.hooks.js'
import { Container, StyledReport } from './AggregateStatistics.styles.js'
import { ColumnContributionChart } from './ColumnContributionChart.js'

interface IQueueExecution {
	execution?: Remote<ICancelablePromise<IAggregateStatistics | null>>
}

export const AggregateStatistics: FC = memo(function AggregateStatistics() {
	const [sensitiveContent] = useSensitiveContent()
	const [statistics, setStatistics] = useState<IAggregateStatistics | null>(
		null,
	)
	const [queuedExecution, setQueuedExecution] = useState<IQueueExecution>({})
	const [isLoading, setIsLoading] = useState(false)
	const [, setGlobalErrorMessage] = useGlobalErrorMessage()
	const [rawSynthesisParams] = useRawSynthesisParameters()
	const getAggregateStatistics = useGetAggregateStatistics()
	const columnWithRareCombinationsPercentage =
		useColumnsWithRareCombinationsPercentage(statistics)
	const attributesWithRareCombinationsPercentage =
		useAttributesWithRareCombinationsPercentage(statistics)
	const columnTooltipFormatter = useCallback(
		item => {
			return `Affecting ${
				statistics?.numberOfRecordsWithRareCombinationsPerColumn[item.label]
			}/${
				statistics?.numberOfRecordsWithRareCombinations
			} rare/linkable records (${item.raw}%)`
		},
		[statistics],
	)
	const attributeTooltipFormatter = useCallback(
		item => {
			return `Affecting ${
				statistics?.numberOfRecordsWithRareCombinationsPerAttribute[item.label]
			}/${
				statistics?.numberOfRecordsWithRareCombinations
			} rare/linkable records (${item.raw}%)`
		},
		[statistics],
	)

	useEffect(() => {
		getAggregateStatistics(
			sensitiveContent,
			rawSynthesisParams.recordLimit,
			rawSynthesisParams.reportingLength,
			rawSynthesisParams.resolution,
		).then(aggregateStatisticsGetter => {
			// cancel any queued execution to clear the way
			// for the new one
			setQueuedExecution(prev => {
				prev?.execution?.cancel()
				return {
					execution: aggregateStatisticsGetter,
				}
			})
		})
	}, [getAggregateStatistics, sensitiveContent, rawSynthesisParams.recordLimit, rawSynthesisParams.reportingLength, rawSynthesisParams.resolution, setQueuedExecution])

	useEffect(() => {
		async function awaitForStats() {
			try {
				setIsLoading(true)
				setGlobalErrorMessage(undefined)
				setStatistics((await await queuedExecution.execution?.promise) ?? null)
				setIsLoading(false)
			} catch (err) {
				if (err !== 'processing has been stopped') {
					setGlobalErrorMessage(err as string)
					setStatistics(null)
					setIsLoading(false)
				}
				console.error(err)
			}
		}
		awaitForStats()
	}, [queuedExecution, setStatistics, setIsLoading, setGlobalErrorMessage])

	useEffect(() => {
		return () => {
			// cancel any pending execution on unmount
			setQueuedExecution(prev => {
				prev?.execution?.cancel()
				return {}
			})
		}
	}, [setQueuedExecution])

	return (
		<Container vertical align="center">
			{isLoading ? (
				<Spinner />
			) : statistics && statistics.numberOfRecordsWithRareCombinations > 0 ? (
				<>
					<FlexItem align="center">{`Contribution to privacy risk (creating rare attribute combinations in ${
						statistics.numberOfRecordsWithRareCombinations
					}/${statistics.numberOfRecords} parsed records, ${(
						(statistics.numberOfRecordsWithRareCombinations * 100.0) /
						statistics.numberOfRecords
					).toFixed(0)}%)`}</FlexItem>
					<FlexContainer style={{ width: '100%' }} justify="space-between">
						<FlexItem style={{ width: '48%' }}>
							<ColumnContributionChart
								proportionPerColumn={columnWithRareCombinationsPercentage}
								label={'Selected columns'}
								containerHeight={220}
								barHeight={10}
								tooltipFormatter={columnTooltipFormatter}
							/>
						</FlexItem>
						<FlexItem style={{ width: '48%' }}>
							<ColumnContributionChart
								proportionPerColumn={attributesWithRareCombinationsPercentage}
								label={'Attributes'}
								containerHeight={220}
								barHeight={10}
								tooltipFormatter={attributeTooltipFormatter}
							/>
						</FlexItem>
					</FlexContainer>
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
