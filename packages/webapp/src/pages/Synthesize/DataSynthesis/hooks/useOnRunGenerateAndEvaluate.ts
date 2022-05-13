/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { useCallback, useMemo } from 'react'
import type { IInputNumberByLength } from 'sds-wasm'

import type {
	IContextParameters,
	NoisyCountThresholdType,
	OversamplingType,
	PrivacyBudgetProfile,
	UseSyntheticCounts,
} from '~models'
import {
	useAllContextsParametersSetter,
	useIsProcessingSetter,
	useProcessingProgressSetter,
	useSelectedContextParametersSetter,
	useSensitiveContentValue,
	useWasmWorkerValue,
} from '~states'
import { namedSpread, spreadableHeaders, usableHeaders } from '~utils'
import type { SynthesisMode } from '~workers/types'

import { useContextKey } from './useContextKey'

export interface IOnRunGenerateAndEvaluateParameters {
	recordLimit: number
	synthesisMode: SynthesisMode
	resolution: number
	cacheSize: number
	reportingLength: number
	oversamplingType: OversamplingType
	oversamplingRatio: number
	oversamplingTries: number
	useSyntheticCounts: UseSyntheticCounts
	percentilePercentage: number
	percentileEpsilonProportion: number
	noiseEpsilon: number
	noiseDelta: number
	thresholdType: NoisyCountThresholdType
	threshold: IInputNumberByLength
	privacyBudgetProfile: PrivacyBudgetProfile
}

export function useOnRunGenerateAndEvaluate(
	params: IOnRunGenerateAndEvaluateParameters,
): () => Promise<void> {
	const setIsProcessing = useIsProcessingSetter()
	const worker = useWasmWorkerValue()
	const setProcessingProgress = useProcessingProgressSetter()
	const sensitiveContent = useSensitiveContentValue()
	const contextKey = useContextKey(params)
	const setAllContextsParameters = useAllContextsParametersSetter()
	const setSelectedContext = useSelectedContextParametersSetter()

	const { resultTable: sensitiveTable, newColumnNames } = useMemo(
		() =>
			namedSpread(
				sensitiveContent.table,
				spreadableHeaders(sensitiveContent).map(h => ({
					name: h.name,
					delimiter: h.spreadWithDelimiter!,
				})),
			),
		[sensitiveContent],
	)

	return useCallback(async () => {
		setIsProcessing(true)
		setProcessingProgress(0.0)

		const columnsToUse = new Set([
			...usableHeaders(sensitiveContent).map(h => h.name),
			...newColumnNames,
		])
		const contextParameters: IContextParameters = {
			...params,
			key: contextKey,
			delimiter: sensitiveContent.delimiter,
			useColumns: sensitiveTable.columnNames().filter(c => columnsToUse.has(c)),
			sensitiveZeros: sensitiveContent.headers
				.filter(h => h.hasSensitiveZeros)
				.map(h => h.name),
			emptyValue: '',
			isEvaluated: false,
		}

		const allContextParameters =
			(await worker?.generateAndEvaluate(
				contextKey,
				sensitiveTable.toCSV({ delimiter: sensitiveContent.delimiter }),
				contextParameters,
				p => {
					setProcessingProgress(p)
				},
			)) ?? []

		setIsProcessing(false)
		setAllContextsParameters(allContextParameters)
		setSelectedContext(allContextParameters[allContextParameters.length - 1])
	}, [
		setIsProcessing,
		setProcessingProgress,
		params,
		contextKey,
		sensitiveContent,
		worker,
		setAllContextsParameters,
		setSelectedContext,
		sensitiveTable,
		newColumnNames,
	])
}
