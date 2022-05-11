/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import init, { init_logger, WasmSdsContext } from 'sds-wasm'

import {
	AggregateType,
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
		context: new WasmSdsContext(),
		contextParameters: message.contextParameters,
	})
	const sigmaProportions: number[] = []

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
		sigmaProportions.push(p)
	}

	value.context.setSensitiveData(message.sensitiveCsvData, {
		delimiter: message.contextParameters.delimiter,
		useColumns: message.contextParameters.useColumns,
		sensitiveZeros: message.contextParameters.sensitiveZeros,
		recordLimit: message.contextParameters.recordLimit,
	})

	switch (message.contextParameters.synthesisMode) {
		case SynthesisMode.Unseeded:
			value.context.generateUnseeded(
				{
					resolution: message.contextParameters.resolution,
					cacheMaxSize: message.contextParameters.cacheSize,
					emptyValue: message.contextParameters.emptyValue,
				},
				p => postProgress(message.id, 0.5 * p),
			)
			break
		case SynthesisMode.RowSeeded:
			value.context.generateRowSeeded(
				{
					resolution: message.contextParameters.resolution,
					cacheMaxSize: message.contextParameters.cacheSize,
					emptyValue: message.contextParameters.emptyValue,
				},
				p => postProgress(message.id, 0.5 * p),
			)
			break
		case SynthesisMode.ValueSeeded:
			value.context.generateValueSeeded(
				{
					resolution: message.contextParameters.resolution,
					cacheMaxSize: message.contextParameters.cacheSize,
					emptyValue: message.contextParameters.emptyValue,
				},
				message.contextParameters.reportingLength,
				message.contextParameters.oversamplingType ===
					OversamplingType.Controlled
					? {
							oversamplingRatio: message.contextParameters.oversamplingRatio,
							oversamplingTries: message.contextParameters.oversamplingTries,
					  }
					: undefined,
				p => postProgress(message.id, 0.5 * p),
			)
			break
		case SynthesisMode.AggregateSeeded:
			value.context.generateAggregateSeeded(
				{
					resolution: message.contextParameters.resolution,
					cacheMaxSize: message.contextParameters.cacheSize,
					emptyValue: message.contextParameters.emptyValue,
				},
				message.contextParameters.reportingLength,
				message.contextParameters.useSyntheticCounts === UseSyntheticCounts.Yes,
				p => postProgress(message.id, 0.5 * p),
			)
			break
		case SynthesisMode.DP:
			value.context.generateDp(
				{
					resolution: message.contextParameters.resolution,
					cacheMaxSize: message.contextParameters.cacheSize,
					emptyValue: message.contextParameters.emptyValue,
				},
				message.contextParameters.reportingLength,
				{
					epsilon: message.contextParameters.noiseEpsilon,
					delta: message.contextParameters.noiseDelta,
					percentilePercentage: message.contextParameters.percentilePercentage,
					percentileEpsilonProportion:
						message.contextParameters.percentileEpsilonProportion,
					sigmaProportions: sigmaProportions,
				},
				{
					type: message.contextParameters.thresholdType,
					valuesByLen: message.contextParameters.threshold,
				},
				message.contextParameters.useSyntheticCounts === UseSyntheticCounts.Yes,
				p => postProgress(message.id, 0.5 * p),
			)
			break
	}

	value.context.evaluate(message.contextParameters.reportingLength, p =>
		postProgress(message.id, 50.0 + 0.5 * p),
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
