/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { useCallback } from 'react'

import type {
	IContextParameters,
	NoisyCountThresholdType,
	OversamplingType,
	SynthesisMode,
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

import { useContextKey } from './useContextKey'

export interface IOnRunGenerateParameters {
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
	thresholdValue: number
}

export function useOnRunGenerate(
	params: IOnRunGenerateParameters,
): () => Promise<void> {
	const setIsProcessing = useIsProcessingSetter()
	const worker = useWasmWorkerValue()
	const setProcessingProgress = useProcessingProgressSetter()
	const sensitiveContent = useSensitiveContentValue()
	const contextKey = useContextKey(params)
	const setAllContextsParameters = useAllContextsParametersSetter()
	const setSelectedContext = useSelectedContextParametersSetter()

	return useCallback(async () => {
		setIsProcessing(true)
		setProcessingProgress(0.0)

		const contextParameters: IContextParameters = {
			...params,
			key: contextKey,
			delimiter: sensitiveContent.delimiter,
			useColumns: sensitiveContent.headers
				.filter(h => h.use && h.name !== sensitiveContent.subjectId)
				.map(h => h.name),
			sensitiveZeros: sensitiveContent.headers
				.filter(h => h.hasSensitiveZeros)
				.map(h => h.name),
			emptyValue: '',
			isEvaluated: false,
		}

		const allContextParameters =
			(await worker?.generate(
				contextKey,
				sensitiveContent.table.toCSV({ delimiter: sensitiveContent.delimiter }),
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
	])
}
