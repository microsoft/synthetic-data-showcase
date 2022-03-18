/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import init, { init_logger, SDSContext } from 'sds-wasm'

import {
	AggregateType,
	OversamplingType,
	SynthesisMode,
	UseSyntheticCounts,
} from '../../models'
import type {
	SdsWasmAttributesIntersectionsByColumnMessage,
	SdsWasmAttributesIntersectionsByColumnResponse,
	SdsWasmClearEvaluateMessage,
	SdsWasmClearEvaluateResponse,
	SdsWasmClearGenerateMessage,
	SdsWasmClearGenerateResponse,
	SdsWasmClearNavigateMessage,
	SdsWasmClearNavigateResponse,
	SdsWasmClearSensitiveDataMessage,
	SdsWasmClearSensitiveDataResponse,
	SdsWasmErrorResponse,
	SdsWasmEvaluateMessage,
	SdsWasmEvaluateResponse,
	SdsWasmGenerateMessage,
	SdsWasmGenerateResponse,
	SdsWasmGetAggregateResultMessage,
	SdsWasmGetAggregateResultResponse,
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

let CONTEXT: SDSContext

const HANDLERS = {
	[SdsWasmMessageType.Init]: handleInit,
	[SdsWasmMessageType.ClearSensitiveData]: handleClearSensitiveData,
	[SdsWasmMessageType.ClearGenerate]: handleClearGenerate,
	[SdsWasmMessageType.ClearEvaluate]: handleClearEvaluate,
	[SdsWasmMessageType.ClearNavigate]: handleClearNavigate,
	[SdsWasmMessageType.Generate]: handleGenerate,
	[SdsWasmMessageType.Evaluate]: handleEvaluate,
	[SdsWasmMessageType.Navigate]: handleNavigate,
	[SdsWasmMessageType.SelectAttributes]: handleSelectAttributes,
	[SdsWasmMessageType.AttributesIntersectionsByColumn]:
		handleAttributesIntersectionsByColumn,
	[SdsWasmMessageType.GetAggregateResult]: handleGetAggregateResult,
}

function postProgress(id: string, progress: number) {
	postMessage({
		id,
		type: SdsWasmMessageType.ReportProgress,
		progress,
	} as SdsWasmReportProgressResponse)
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
	await init(message.wasmPath)

	init_logger(message.logLevel)

	CONTEXT = new SDSContext()

	return {
		id: message.id,
		type: message.type,
	}
}

async function handleClearSensitiveData(
	message: SdsWasmClearSensitiveDataMessage,
): Promise<SdsWasmClearSensitiveDataResponse> {
	CONTEXT.clearSensitiveData()
	return {
		id: message.id,
		type: message.type,
	}
}

async function handleClearGenerate(
	message: SdsWasmClearGenerateMessage,
): Promise<SdsWasmClearGenerateResponse> {
	CONTEXT.clearGenerate()
	return {
		id: message.id,
		type: message.type,
	}
}

async function handleClearEvaluate(
	message: SdsWasmClearEvaluateMessage,
): Promise<SdsWasmClearEvaluateResponse> {
	CONTEXT.clearEvaluate()
	return {
		id: message.id,
		type: message.type,
	}
}

async function handleClearNavigate(
	message: SdsWasmClearNavigateMessage,
): Promise<SdsWasmClearNavigateResponse> {
	CONTEXT.clearNavigate()
	return {
		id: message.id,
		type: message.type,
	}
}

async function handleGenerate(
	message: SdsWasmGenerateMessage,
): Promise<SdsWasmGenerateResponse> {
	CONTEXT.setSensitiveData(
		message.sensitiveCsvData,
		message.delimiter,
		message.useColumns,
		message.sensitiveZeros,
		message.recordLimit,
	)

	console.log('message', message)

	switch (message.synthesisParameters.synthesisMode) {
		case SynthesisMode.Unseeded:
			CONTEXT.generateUnseeded(
				message.synthesisParameters.cacheSize,
				message.synthesisParameters.resolution,
				message.synthesisParameters.emptyValue,
				p => {
					postProgress(message.id, p)
				},
			)
			break
		case SynthesisMode.RowSeeded:
			CONTEXT.generateRowSeeded(
				message.synthesisParameters.cacheSize,
				message.synthesisParameters.resolution,
				message.synthesisParameters.emptyValue,
				p => {
					postProgress(message.id, p)
				},
			)
			break
		case SynthesisMode.ValueSeeded:
			CONTEXT.generateValueSeeded(
				message.synthesisParameters.cacheSize,
				message.synthesisParameters.resolution,
				message.synthesisParameters.emptyValue,
				message.synthesisParameters.reportingLength,
				message.synthesisParameters.oversamplingType === OversamplingType.Controlled
					? message.synthesisParameters.oversamplingRatio
					: undefined,
				message.synthesisParameters.oversamplingType === OversamplingType.Controlled
					? message.synthesisParameters.oversamplingTries
					: undefined,
				p => {
					postProgress(message.id, 0.5 * p)
				},
				p => {
					postProgress(message.id, 50.0 + 0.5 * p)
				},
			)
			break
		case SynthesisMode.AggregateSeeded:
			CONTEXT.generateAggregateSeeded(
				message.synthesisParameters.cacheSize,
				message.synthesisParameters.resolution,
				message.synthesisParameters.emptyValue,
				message.synthesisParameters.reportingLength,
				message.synthesisParameters.useSyntheticCounts === UseSyntheticCounts.Yes,
				p => {
					postProgress(message.id, 0.5 * p)
				},
				p => {
					postProgress(message.id, 50.0 + 0.5 * p)
				},
			)
			break
		case SynthesisMode.DP:
			CONTEXT.generateDp(
				message.synthesisParameters.cacheSize,
				message.synthesisParameters.resolution,
				message.synthesisParameters.emptyValue,
				message.synthesisParameters.reportingLength,
				message.synthesisParameters.percentilePercentage,
				message.synthesisParameters.sensitivityFilterEpsilon,
				message.synthesisParameters.noiseEpsilon,
				message.synthesisParameters.noiseDelta,
				message.synthesisParameters.useSyntheticCounts === UseSyntheticCounts.Yes,
				p => {
					postProgress(message.id, 0.5 * p)
				},
				p => {
					postProgress(message.id, 50.0 + 0.5 * p)
				},
			)
			break
	}

	return {
		id: message.id,
		type: message.type,
		syntheticCsvData: CONTEXT.generateResultToJs().syntheticData,
	}
}

async function handleEvaluate(
	message: SdsWasmEvaluateMessage,
): Promise<SdsWasmEvaluateResponse> {
	CONTEXT.evaluate(
		message.reportingLength,
		p => {
			postProgress(message.id, 0.5 * p)
		},
		p => {
			postProgress(message.id, 50.0 + 0.5 * p)
		},
	)

	return {
		id: message.id,
		type: message.type,
		evaluateResult: CONTEXT.evaluateResultToJs(),
	}
}

async function handleNavigate(
	message: SdsWasmNavigateMessage,
): Promise<SdsWasmNavigateResponse> {
	CONTEXT.navigate()

	return {
		id: message.id,
		type: message.type,
	}
}

async function handleSelectAttributes(
	message: SdsWasmSelectAttributesMessage,
): Promise<SdsWasmSelectAttributesResponse> {
	CONTEXT.selectAttributes(message.attributes)

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
		attributesIntersectionByColumn: CONTEXT.attributesIntersectionsByColumn(
			message.columns,
		),
	}
}

async function handleGetAggregateResult(
	message: SdsWasmGetAggregateResultMessage,
): Promise<SdsWasmGetAggregateResultResponse> {
	let aggregateResult

	switch (message.aggregateType) {
		case AggregateType.Sensitive:
			aggregateResult = CONTEXT.sensitiveAggregateResultToJs(
				message.aggregatesDelimiter,
				message.combinationDelimiter,
			)
			break
		case AggregateType.Reportable:
			aggregateResult = CONTEXT.reportableAggregateResultToJs(
				message.aggregatesDelimiter,
				message.combinationDelimiter,
			)
			break
		case AggregateType.Synthetic:
			aggregateResult = CONTEXT.syntheticAggregateResultToJs(
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
