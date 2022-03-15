/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import type {
	HeaderNames,
	IAggregateResult,
	IAttributesIntersectionByColumn,
	IEvaluateResult,
	ISelectedAttributesByColumn,
} from 'sds-wasm'

export enum SdsWasmMessageType {
	Init = 'Init',
	Error = 'Error',
	ClearSensitiveData = 'ClearSensitiveData',
	ClearGenerate = 'ClearGenerate',
	ClearEvaluate = 'ClearEvaluate',
	ClearNavigate = 'ClearNavigate',
	ReportProgress = 'ReportProgress',
	Generate = 'Generate',
	Evaluate = 'Evaluate',
	Navigate = 'Navigate',
	SelectAttributes = 'SelectAttributes',
	AttributesIntersectionsByColumn = 'AttributesIntersectionsByColumn',
	GetSensitiveAggregateResult = 'GetSensitiveAggregateResult',
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

export interface SdsWasmClearSensitiveDataMessage extends SdsWasmMessage {
	type: SdsWasmMessageType.ClearSensitiveData
}

export interface SdsWasmClearSensitiveDataResponse extends SdsWasmResponse {
	type: SdsWasmMessageType.ClearSensitiveData
}

export interface SdsWasmClearGenerateMessage extends SdsWasmMessage {
	type: SdsWasmMessageType.ClearGenerate
}

export interface SdsWasmClearGenerateResponse extends SdsWasmResponse {
	type: SdsWasmMessageType.ClearGenerate
}

export interface SdsWasmClearEvaluateMessage extends SdsWasmMessage {
	type: SdsWasmMessageType.ClearEvaluate
}

export interface SdsWasmClearEvaluateResponse extends SdsWasmResponse {
	type: SdsWasmMessageType.ClearEvaluate
}

export interface SdsWasmClearNavigateMessage extends SdsWasmMessage {
	type: SdsWasmMessageType.ClearNavigate
}

export interface SdsWasmClearNavigateResponse extends SdsWasmResponse {
	type: SdsWasmMessageType.ClearNavigate
}

export interface SdsWasmReportProgressResponse extends SdsWasmResponse {
	type: SdsWasmMessageType.ReportProgress
	progress: number
}

export interface SdsWasmGenerateMessage extends SdsWasmMessage {
	type: SdsWasmMessageType.Generate
	sensitiveCsvData: string
	delimiter: string
	useColumns: HeaderNames
	sensitiveZeros: HeaderNames
	recordLimit: number
	resolution: number
	emptyValue: string
	cacheSize: number
	seeded: boolean
}

export interface SdsWasmGenerateResponse extends SdsWasmResponse {
	type: SdsWasmMessageType.Generate
	syntheticCsvData: string
}

export interface SdsWasmEvaluateMessage extends SdsWasmMessage {
	type: SdsWasmMessageType.Evaluate
	reportingLength: number
	sensitivityThreshold: number
	aggregatesDelimiter: string
	combinationDelimiter: string
	includeAggregatesData: boolean
}

export interface SdsWasmEvaluateResponse extends SdsWasmResponse {
	type: SdsWasmMessageType.Evaluate
	evaluateResult: IEvaluateResult
}

export interface SdsWasmNavigateMessage extends SdsWasmMessage {
	type: SdsWasmMessageType.Navigate
}

export interface SdsWasmNavigateResponse extends SdsWasmResponse {
	type: SdsWasmMessageType.Navigate
}

export interface SdsWasmSelectAttributesMessage extends SdsWasmMessage {
	type: SdsWasmMessageType.SelectAttributes
	attributes: ISelectedAttributesByColumn
}

export interface SdsWasmSelectAttributesResponse extends SdsWasmResponse {
	type: SdsWasmMessageType.SelectAttributes
}

export interface SdsWasmAttributesIntersectionsByColumnMessage
	extends SdsWasmMessage {
	type: SdsWasmMessageType.AttributesIntersectionsByColumn
	columns: HeaderNames
}

export interface SdsWasmAttributesIntersectionsByColumnResponse
	extends SdsWasmResponse {
	type: SdsWasmMessageType.AttributesIntersectionsByColumn
	attributesIntersectionByColumn: IAttributesIntersectionByColumn
}

export interface SdsWasmGetSensitiveAggregateResultMessage
	extends SdsWasmMessage {
	type: SdsWasmMessageType.GetSensitiveAggregateResult
	aggregatesDelimiter: string
	combinationDelimiter: string
	includeAggregatesData: boolean
}

export interface SdsWasmGetSensitiveAggregateResultResponse
	extends SdsWasmResponse {
	type: SdsWasmMessageType.GetSensitiveAggregateResult
	aggregateResult: IAggregateResult
}
