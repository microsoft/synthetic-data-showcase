/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { Spinner } from '@fluentui/react'
import type { Remote } from 'comlink'
import type { FC } from 'react'
import { memo, useEffect, useState } from 'react'
import type { IAggregateStatistics } from 'sds-wasm'
import styled from 'styled-components'

import { Flex } from '~components/Flexbox'
import { useRawSynthesisParameters, useSensitiveContent } from '~states'
import type { ICancelablePromise } from '~workers/types'

import { useGetAggregateStatistics } from './hooks'

interface IQueueExecution {
	execution?: Remote<ICancelablePromise<IAggregateStatistics>>
}

export const AggregateStatistics: FC = memo(function AggregateStatistics() {
	const [sensitiveContent] = useSensitiveContent()
	const [statistics, setStatistics] = useState<IAggregateStatistics | null>(
		null,
	)
	const [queuedExecution, setQueuedExecution] = useState<IQueueExecution>({})
	const [isLoading, setIsLoading] = useState(false)
	const [rawSynthesisParams] = useRawSynthesisParameters()
	const getAggregateStatistics = useGetAggregateStatistics()

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
		<Container justify="center">
			{isLoading ? (
				<Spinner />
			) : statistics ? (
				JSON.stringify(statistics, null, 4)
			) : null}
		</Container>
	)
})
AggregateStatistics.displayName = 'TablePreview'

const Container = styled(Flex)`
	padding: ${p => p.theme.spacing.m};
	font-size: ${p => p.theme.fonts.large.fontSize};
`
