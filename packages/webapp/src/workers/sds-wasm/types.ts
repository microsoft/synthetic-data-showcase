/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import type {
	HeaderNames,
	IAggregateResult,
	IAttributesIntersectionByColumn,
	IEvaluateResult,
	IGenerateResult,
	ISelectedAttributesByColumn,
} from 'sds-wasm'

import type {
	AggregateType,
	AllContextsParameters,
	IContextParameters,
} from '~models'

export enum SdsWasmMessageType {
	Init = 'Init',
	Error = 'Error',
	ClearContexts = 'ClearContexts',
	ReportProgress = 'ReportProgress',
	GenerateAndEvaluate = 'GenerateAndEvaluate',
	Navigate = 'Navigate',
	SelectAttributes = 'SelectAttributes',
	AttributesIntersectionsByColumn = 'AttributesIntersectionsByColumn',
	GetAggregateResult = 'GetAggregateResult',
	GetGenerateResult = 'GetGenerateResult',
	GetEvaluateResult = 'GetEvaluateResult',
}

export interface SdsWasmMessage {
	id: string
	type: SdsWasmMessageType
}

export interface SdsWasmResponse {
	type: SdsWasmMessageType
	id: string
}

export interface SdsWasmInitMessage extends SdsWasmMessage {
	type: SdsWasmMessageType.Init
	logLevel: string
	maxContextCacheSize: number
	wasmJsPath: string
	wasmPath: string
}

export interface SdsWasmInitResponse extends SdsWasmResponse {
	type: SdsWasmMessageType.Init
}

export interface SdsWasmErrorResponse extends SdsWasmResponse {
	type: SdsWasmMessageType.Error
	errorMessage: string
}

export interface SdsWasmClearContextsMessage extends SdsWasmMessage {
	type: SdsWasmMessageType.ClearContexts
}

export interface SdsWasmClearContextsResponse extends SdsWasmResponse {
	type: SdsWasmMessageType.ClearContexts
}

export interface SdsWasmReportProgressResponse extends SdsWasmResponse {
	type: SdsWasmMessageType.ReportProgress
	progress: number
}

export interface SdsWasmGenerateAndEvaluateMessage extends SdsWasmMessage {
	type: SdsWasmMessageType.GenerateAndEvaluate
	contextKey: string
	sensitiveCsvData: string
	contextParameters: IContextParameters
}

export interface SdsWasmGenerateAndEvaluateResponse extends SdsWasmResponse {
	type: SdsWasmMessageType.GenerateAndEvaluate
	allContextParameters: AllContextsParameters
}

export interface SdsWasmNavigateMessage extends SdsWasmMessage {
	type: SdsWasmMessageType.Navigate
	contextKey: string
}

export interface SdsWasmNavigateResponse extends SdsWasmResponse {
	type: SdsWasmMessageType.Navigate
}

export interface SdsWasmSelectAttributesMessage extends SdsWasmMessage {
	type: SdsWasmMessageType.SelectAttributes
	contextKey: string
	attributes: ISelectedAttributesByColumn
}

export interface SdsWasmSelectAttributesResponse extends SdsWasmResponse {
	type: SdsWasmMessageType.SelectAttributes
}

export interface SdsWasmAttributesIntersectionsByColumnMessage
	extends SdsWasmMessage {
	type: SdsWasmMessageType.AttributesIntersectionsByColumn
	contextKey: string
	columns: HeaderNames
}

export interface SdsWasmAttributesIntersectionsByColumnResponse
	extends SdsWasmResponse {
	type: SdsWasmMessageType.AttributesIntersectionsByColumn
	attributesIntersectionByColumn: IAttributesIntersectionByColumn
}

export interface SdsWasmGetAggregateResultMessage extends SdsWasmMessage {
	type: SdsWasmMessageType.GetAggregateResult
	contextKey: string
	aggregateType: AggregateType
	aggregatesDelimiter: string
	combinationDelimiter: string
}

export interface SdsWasmGetAggregateResultResponse extends SdsWasmResponse {
	type: SdsWasmMessageType.GetAggregateResult
	aggregateResult: IAggregateResult
}

export interface SdsWasmGetGenerateResultMessage extends SdsWasmMessage {
	type: SdsWasmMessageType.GetGenerateResult
	contextKey: string
}

export interface SdsWasmGetGenerateResultResponse extends SdsWasmResponse {
	type: SdsWasmMessageType.GetGenerateResult
	generateResult: IGenerateResult
}

export interface SdsWasmGetEvaluateResultMessage extends SdsWasmMessage {
	type: SdsWasmMessageType.GetEvaluateResult
	contextKey: string
}

export interface SdsWasmGetEvaluateResultResponse extends SdsWasmResponse {
	type: SdsWasmMessageType.GetEvaluateResult
	evaluateResult: IEvaluateResult
}
