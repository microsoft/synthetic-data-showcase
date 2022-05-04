/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import init, { init_logger, SDSContext } from 'sds-wasm'

import {
	AggregateType,
	NoisyCountThresholdType,
	OversamplingType,
	PrivacyBudgetProfile,
	SynthesisMode,
	UseSyntheticCounts,
} from '../../models'
import { SDSContextCache } from './SDSContextCache'
import type {
	SdsWasmAttributesIntersectionsByColumnMessage,
	SdsWasmAttributesIntersectionsByColumnResponse,
	SdsWasmClearContextsMessage,
	SdsWasmClearContextsResponse,
	SdsWasmErrorResponse,
	SdsWasmGenerateAndEvaluateMessage,
	SdsWasmGenerateAndEvaluateResponse,
	SdsWasmGetAggregateResultMessage,
	SdsWasmGetAggregateResultResponse,
	SdsWasmGetEvaluateResultMessage,
	SdsWasmGetEvaluateResultResponse,
	SdsWasmGetGenerateResultMessage,
	SdsWasmGetGenerateResultResponse,
	SdsWasmInitMessage,
	SdsWasmInitResponse,
	SdsWasmMessage,
	SdsWasmNavigateMessage,
	SdsWasmNavigateResponse,
	SdsWasmReportProgressResponse,
	SdsWasmSelectAttributesMessage,
	SdsWasmSelectAttributesResponse,
} from './types'
import { SdsWasmMessageType } from './types'

let CONTEXT_CACHE: SDSContextCache

const HANDLERS = {
	[SdsWasmMessageType.Init]: handleInit,
	[SdsWasmMessageType.ClearContexts]: handleClearContexts,
	[SdsWasmMessageType.GenerateAndEvaluate]: handleGenerateAndEvaluate,
	[SdsWasmMessageType.Navigate]: handleNavigate,
	[SdsWasmMessageType.SelectAttributes]: handleSelectAttributes,
	[SdsWasmMessageType.AttributesIntersectionsByColumn]:
		handleAttributesIntersectionsByColumn,
	[SdsWasmMessageType.GetAggregateResult]: handleGetAggregateResult,
	[SdsWasmMessageType.GetGenerateResult]: handleGetGenerateResult,
	[SdsWasmMessageType.GetEvaluateResult]: handleGetEvaluateResult,
}

function postProgress(id: string, progress: number): boolean {
	postMessage({
		id,
		type: SdsWasmMessageType.ReportProgress,
		progress,
	} as SdsWasmReportProgressResponse)
	return true
}

function postError(id: string, errorMessage: string) {
	postMessage({
		id,
		type: SdsWasmMessageType.Error,
		errorMessage,
	} as SdsWasmErrorResponse)
}

async function handleInit(
	message: SdsWasmInitMessage,
): Promise<SdsWasmInitResponse> {
	CONTEXT_CACHE = new SDSContextCache(message.maxContextCacheSize)

	await init(message.wasmPath)

	init_logger(message.logLevel)

	return {
		id: message.id,
		type: message.type,
	}
}

async function handleClearContexts(
	message: SdsWasmClearContextsMessage,
): Promise<SdsWasmClearContextsResponse> {
	CONTEXT_CACHE.clear()
	return {
		id: message.id,
		type: message.type,
	}
}

async function handleGenerateAndEvaluate(
	message: SdsWasmGenerateAndEvaluateMessage,
): Promise<SdsWasmGenerateAndEvaluateResponse> {
	const value = CONTEXT_CACHE.set(message.contextKey, {
		context: new SDSContext(),
		contextParameters: message.contextParameters,
	})
	const sigmaProportions = new Float64Array(
		message.contextParameters.reportingLength,
	)

	for (let i = 0; i < message.contextParameters.reportingLength; i++) {
		let p
		switch (message.contextParameters.privacyBudgetProfile) {
			case PrivacyBudgetProfile.Flat:
				p = 1.0
				break
			case PrivacyBudgetProfile.ProportionallyIncreasing:
				p = 1.0 / (i + 1)
				break
			case PrivacyBudgetProfile.ProportionallyDecreasing:
				p = 1.0 / (message.contextParameters.reportingLength - i)
				break
		}
		sigmaProportions[i] = p
	}

	value.context.setSensitiveData(
		message.sensitiveCsvData,
		message.contextParameters.delimiter,
		message.contextParameters.useColumns,
		message.contextParameters.sensitiveZeros,
		message.contextParameters.recordLimit,
	)

	switch (message.contextParameters.synthesisMode) {
		case SynthesisMode.Unseeded:
			value.context.generateUnseeded(
				message.contextParameters.cacheSize,
				message.contextParameters.resolution,
				message.contextParameters.emptyValue,
				p => postProgress(message.id, 0.5 * p),
			)
			break
		case SynthesisMode.RowSeeded:
			value.context.generateRowSeeded(
				message.contextParameters.cacheSize,
				message.contextParameters.resolution,
				message.contextParameters.emptyValue,
				p => postProgress(message.id, 0.5 * p),
			)
			break
		case SynthesisMode.ValueSeeded:
			value.context.generateValueSeeded(
				message.contextParameters.cacheSize,
				message.contextParameters.resolution,
				message.contextParameters.emptyValue,
				message.contextParameters.reportingLength,
				message.contextParameters.oversamplingType ===
					OversamplingType.Controlled
					? message.contextParameters.oversamplingRatio
					: undefined,
				message.contextParameters.oversamplingType ===
					OversamplingType.Controlled
					? message.contextParameters.oversamplingTries
					: undefined,
				p => postProgress(message.id, 0.5 * (0.5 * p)),
				p => postProgress(message.id, 0.5 * (50.0 + 0.5 * p)),
			)
			break
		case SynthesisMode.AggregateSeeded:
			value.context.generateAggregateSeeded(
				message.contextParameters.resolution,
				message.contextParameters.emptyValue,
				message.contextParameters.reportingLength,
				message.contextParameters.useSyntheticCounts === UseSyntheticCounts.Yes,
				p => postProgress(message.id, 0.5 * (0.5 * p)),
				p => postProgress(message.id, 0.5 * (50.0 + 0.5 * p)),
			)
			break
		case SynthesisMode.DP:
			switch (message.contextParameters.thresholdType) {
				case NoisyCountThresholdType.Fixed:
					value.context.generateDpFixedThreshold(
						message.contextParameters.resolution,
						message.contextParameters.emptyValue,
						message.contextParameters.reportingLength,
						message.contextParameters.noiseEpsilon,
						message.contextParameters.noiseDelta,
						message.contextParameters.percentilePercentage,
						message.contextParameters.percentileEpsilonProportion,
						sigmaProportions,
						message.contextParameters.threshold,
						message.contextParameters.useSyntheticCounts ===
							UseSyntheticCounts.Yes,
						p => postProgress(message.id, 0.5 * 0.25 * p),
						p => postProgress(message.id, 0.5 * (25.0 + 0.25 * p)),
						p => postProgress(message.id, 0.5 * (50.0 + 0.5 * p)),
					)
					break
				case NoisyCountThresholdType.Adaptive:
					value.context.generateDpAdaptiveThreshold(
						message.contextParameters.resolution,
						message.contextParameters.emptyValue,
						message.contextParameters.reportingLength,
						message.contextParameters.noiseEpsilon,
						message.contextParameters.noiseDelta,
						message.contextParameters.percentilePercentage,
						message.contextParameters.percentileEpsilonProportion,
						sigmaProportions,
						message.contextParameters.threshold,
						message.contextParameters.useSyntheticCounts ===
							UseSyntheticCounts.Yes,
						p => postProgress(message.id, 0.5 * (0.25 * p)),
						p => postProgress(message.id, 0.5 * (25.0 + 0.25 * p)),
						p => postProgress(message.id, 0.5 * (50.0 + 0.5 * p)),
					)
					break
			}
			break
	}

	value.context.evaluate(
		message.contextParameters.reportingLength,
		p => postProgress(message.id, 50.0 + 0.5 * 0.5 * p),
		p => postProgress(message.id, 75.0 + 0.5 * 0.5 * p),
	)

	value.contextParameters.isEvaluated = true

	// sets context again, so it is the latest one used
	CONTEXT_CACHE.set(message.contextKey, value)

	return {
		id: message.id,
		type: message.type,
		allContextParameters: CONTEXT_CACHE.allContextParameters(),
	}
}

async function handleNavigate(
	message: SdsWasmNavigateMessage,
): Promise<SdsWasmNavigateResponse> {
	CONTEXT_CACHE.getOrThrow(message.contextKey).context.navigate()

	return {
		id: message.id,
		type: message.type,
	}
}

async function handleSelectAttributes(
	message: SdsWasmSelectAttributesMessage,
): Promise<SdsWasmSelectAttributesResponse> {
	CONTEXT_CACHE.getOrThrow(message.contextKey).context.selectAttributes(
		message.attributes,
	)

	return {
		id: message.id,
		type: message.type,
	}
}

async function handleAttributesIntersectionsByColumn(
	message: SdsWasmAttributesIntersectionsByColumnMessage,
): Promise<SdsWasmAttributesIntersectionsByColumnResponse> {
	return {
		id: message.id,
		type: message.type,
		attributesIntersectionByColumn: CONTEXT_CACHE.getOrThrow(
			message.contextKey,
		).context.attributesIntersectionsByColumn(message.columns),
	}
}

async function handleGetAggregateResult(
	message: SdsWasmGetAggregateResultMessage,
): Promise<SdsWasmGetAggregateResultResponse> {
	const context = CONTEXT_CACHE.getOrThrow(message.contextKey).context
	let aggregateResult

	switch (message.aggregateType) {
		case AggregateType.Sensitive:
			aggregateResult = context.sensitiveAggregateResultToJs(
				message.aggregatesDelimiter,
				message.combinationDelimiter,
			)
			break
		case AggregateType.Aggregated:
			aggregateResult = context.reportableAggregateResultToJs(
				message.aggregatesDelimiter,
				message.combinationDelimiter,
			)
			break
		case AggregateType.Synthetic:
			aggregateResult = context.syntheticAggregateResultToJs(
				message.aggregatesDelimiter,
				message.combinationDelimiter,
			)
			break
	}

	return {
		id: message.id,
		type: message.type,
		aggregateResult,
	}
}

async function handleGetGenerateResult(
	message: SdsWasmGetGenerateResultMessage,
): Promise<SdsWasmGetGenerateResultResponse> {
	const context = CONTEXT_CACHE.getOrThrow(message.contextKey).context

	return {
		id: message.id,
		type: message.type,
		generateResult: context.generateResultToJs(),
	}
}

async function handleGetEvaluateResult(
	message: SdsWasmGetEvaluateResultMessage,
): Promise<SdsWasmGetEvaluateResultResponse> {
	const context = CONTEXT_CACHE.getOrThrow(message.contextKey).context

	return {
		id: message.id,
		type: message.type,
		evaluateResult: context.evaluateResultToJs(),
	}
}

onmessage = async event => {
	const message = event?.data as SdsWasmMessage | undefined

	if (message) {
		try {
			const response = HANDLERS[message.type]?.(message)

			if (response) {
				postMessage(await response)
			}
		} catch (err) {
			const msg = `wasm worker: ${err}`
			console.error(msg)
			postError(message.type, msg)
		}
	}
}
