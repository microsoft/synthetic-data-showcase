/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { Spinner, useTheme } from '@fluentui/react'
import { FlexContainer, FlexItem } from '@sds/components'
import type { Remote } from 'comlink'
import type { FC } from 'react'
import { memo, useCallback, useEffect, useState } from 'react'
import type { IAggregateStatistics } from 'sds-wasm'

import { useRawSynthesisParameters, useSensitiveContent } from '~states'
import type { ICancelablePromise } from '~workers/types'

import {
	useColumnsWithRareCombinationsPercentage,
	useGetAggregateStatistics,
} from './AggregateStatistics.hooks.js'
import { Container, StyledReport } from './AggregateStatistics.styles.js'
import { ColumnContributionChart } from './ColumnContributionChart.js'

interface IQueueExecution {
	execution?: Remote<ICancelablePromise<IAggregateStatistics>>
}

export const AggregateStatistics: FC = memo(function AggregateStatistics() {
	const theme = useTheme()
	const [sensitiveContent] = useSensitiveContent()
	const [statistics, setStatistics] = useState<IAggregateStatistics | null>(
		null,
	)
	const [queuedExecution, setQueuedExecution] = useState<IQueueExecution>({})
	const [isLoading, setIsLoading] = useState(false)
	const [rawSynthesisParams] = useRawSynthesisParameters()
	const getAggregateStatistics = useGetAggregateStatistics()
	const columnWithRareCombinationsPercentage =
		useColumnsWithRareCombinationsPercentage(statistics)
	const tooltipFormatter = useCallback(
		item => {
			return `Affecting ${
				statistics?.numberOfRecordsWithRareCombinationsPerColumn[item.label]
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
				setStatistics((await await queuedExecution.execution?.promise) ?? null)
				setIsLoading(false)
			} catch (err) {
				console.error(err)
			}
		}
		awaitForStats()
	}, [queuedExecution, setStatistics, setIsLoading])

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
				<FlexContainer gap={theme.spacing.s1} style={{ width: '100%' }}>
					<FlexItem grow={1}>
						<ColumnContributionChart
							proportionPerColumn={columnWithRareCombinationsPercentage}
							label={`Selected columns contributing to privacy risk from small linkable groups (affecting ${
								statistics.numberOfRecordsWithRareCombinations
							}/${rawSynthesisParams.recordLimit} records, ${(
								(statistics.numberOfRecordsWithRareCombinations * 100.0) /
								rawSynthesisParams.recordLimit
							).toFixed(0)}%)`}
							containerHeight={220}
							barHeight={5}
							tooltipFormatter={tooltipFormatter}
						/>
					</FlexItem>
				</FlexContainer>
			) : (
				<StyledReport>
					No small groups found based on the privacy resolution and aggregation
					limit
				</StyledReport>
			)}
		</Container>
	)
})
AggregateStatistics.displayName = 'AggregateStatistics'
