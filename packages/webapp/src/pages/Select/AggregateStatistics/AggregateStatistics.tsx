/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { Spinner, useTheme } from '@fluentui/react'
import { FlexContainer, FlexItem } from '@sds/components'
import type { Remote } from 'comlink'
import type { FC } from 'react'
import { memo, useEffect, useState } from 'react'
import type { IAggregateStatistics } from 'sds-wasm'

import { useRawSynthesisParameters, useSensitiveContent } from '~states'
import type { ICancelablePromise } from '~workers/types'

import {
	useColumnsWithRareCombinationsPercentage,
	useColumnsWithUniqueCombinationsPercentage,
	useGetAggregateStatistics,
	useOnRemoveColumn,
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
	const columnWithUniqueCombinationsPercentage =
		useColumnsWithUniqueCombinationsPercentage(statistics)
	const columnWithRareCombinationsPercentage =
		useColumnsWithRareCombinationsPercentage(statistics)
	const onRemoveColumn = useOnRemoveColumn()

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
			) : statistics ? (
				<>
					<StyledReport>
						Records with unique combinations:{' '}
						{statistics.numberOfRecordsWithUniqueCombinations}.
					</StyledReport>
					<StyledReport>
						Records with rare combinations (less than{' '}
						{rawSynthesisParams.reportingLength} entries):{' '}
						{statistics.numberOfRecordsWithRareCombinations}
					</StyledReport>
					<FlexContainer gap={theme.spacing.s1} style={{ width: '100%' }}>
						<FlexItem grow={1} basis="50%">
							<ColumnContributionChart
								proportionPerColumn={columnWithUniqueCombinationsPercentage}
								label="Column contribution % to unique records"
								containerHeight={220}
								barHeight={10}
								// onClick={onRemoveColumn}
							/>
						</FlexItem>
						<FlexItem grow={1} basis="50%">
							<ColumnContributionChart
								proportionPerColumn={columnWithRareCombinationsPercentage}
								label="Column contribution % to rare records"
								containerHeight={220}
								barHeight={10}
								// onClick={onRemoveColumn}
							/>
						</FlexItem>
					</FlexContainer>
				</>
			) : null}
		</Container>
	)
})
AggregateStatistics.displayName = 'AggregateStatistics'
