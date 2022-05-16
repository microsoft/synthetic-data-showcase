/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { memo, useCallback } from 'react'

import { StatefulAllSynthesisInfo } from '~components/AllSynthesisInfo'
import { useCanRun } from '~pages/hooks'
import {
	useGlobalErrorMessage,
	useSelectedSynthesisInfo,
	useSensitiveContentValue,
} from '~states'
import { IWasmSynthesizerWorkerStatus } from '~workers/types'

import { DataSynthesisParameter } from '../DataSynthesisParameters/DataSynthesisParameters'
import { DataSynthesisResult } from '../DataSynthesisResult'
import { useOnRunGenerateAndEvaluate } from './DataSynthesis.hooks'
import { Container } from './DataSynthesis.styles'

export const DataSynthesis: React.FC = memo(function DataSynthesis() {
	const canRun = useCanRun()
	const sensitiveContent = useSensitiveContentValue()
	const [selectedSynthesis] = useSelectedSynthesisInfo()
	const [, setGlobalErrorMessage] = useGlobalErrorMessage()

	const onRunGenerateAndEvaluate = useOnRunGenerateAndEvaluate()

	const onRun = useCallback(
		async rawParams => {
			try {
				await onRunGenerateAndEvaluate(rawParams)
				setGlobalErrorMessage(undefined)
			} catch (err) {
				setGlobalErrorMessage(`${err}`)
			}
		},
		[onRunGenerateAndEvaluate, setGlobalErrorMessage],
	)

	return (
		<Container vertical>
			<DataSynthesisParameter
				enableRun={canRun}
				sensitiveCsvContent={sensitiveContent}
				onRun={onRun}
			/>

			<h3>Results</h3>

			<StatefulAllSynthesisInfo />

			{selectedSynthesis?.status === IWasmSynthesizerWorkerStatus.FINISHED && (
				<DataSynthesisResult selectedSynthesis={selectedSynthesis} />
			)}
		</Container>
	)
})
