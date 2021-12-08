/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { CsvRecord } from 'src/models/csv'
import {
	AttributeRows,
	AttributesInColumn,
	IAggregatedCombinations,
	IAttributeRowsMap,
	IAttributesIntersectionValue,
	IEvaluatedResult,
	INavigateResult,
	ISelectedAttributes,
} from '~models'

export enum SdsWasmMessageType {
	Init = 'Init',
	ReportProgress = 'ReportProgress',
	Generate = 'Generate',
	Evaluate = 'Evaluate',
	Navigate = 'Navigate',
	IntersectSelectedAttributes = 'IntersectSelectedAttributes',
	IntersectAttributesInColumns = 'IntersectAttributesInColumns',
}

export interface SdsWasmMessage {
	id: string
	type: SdsWasmMessageType
}

export interface SdsWasmInitMessage extends SdsWasmMessage {
	type: SdsWasmMessageType.Init
	logLevel: string
	wasmJsPath: string
	wasmPath: string
}

export interface SdsWasmGenerateMessage extends SdsWasmMessage {
	type: SdsWasmMessageType.Generate
	csvContent: CsvRecord[]
	useColumns: string[]
	sensitiveZeros: string[]
	recordLimit: number
	resolution: number
	cacheSize: number
}

export interface SdsWasmEvaluateMessage extends SdsWasmMessage {
	type: SdsWasmMessageType.Evaluate
	sensitiveCsvContent: CsvRecord[]
	syntheticCsvContent: CsvRecord[]
	useColumns: string[]
	sensitiveZeros: string[]
	recordLimit: number
	reportingLength: number
	resolution: number
}

export interface SdsWasmNavigateMessage extends SdsWasmMessage {
	type: SdsWasmMessageType.Navigate
	syntheticCsvContent: CsvRecord[]
}

export interface SdsWasmIntersectSelectedAttributesMessage
	extends SdsWasmMessage {
	type: SdsWasmMessageType.IntersectSelectedAttributes
	selectedAttributes: ISelectedAttributes
	initialRows: AttributeRows
	attrRowsMap: IAttributeRowsMap
}

export interface SdsWasmIntersectAttributesInColumnsMessage
	extends SdsWasmMessage {
	type: SdsWasmMessageType.IntersectAttributesInColumns
	headers: CsvRecord
	initialRows: AttributeRows
	attrsInColumn: AttributesInColumn
	selectedAttributeRows: AttributeRows
	selectedAttributes: ISelectedAttributes
	attrRowsMap: IAttributeRowsMap
	columnIndex: number
	sensitiveAggregatedCombinations?: IAggregatedCombinations
}

export interface SdsWasmResponse {
	type: SdsWasmMessageType
	id: string
}

export interface SdsWasmInitResponse extends SdsWasmResponse {
	type: SdsWasmMessageType.Init
}

export interface SdsWasmReportProgressResponse extends SdsWasmResponse {
	type: SdsWasmMessageType.ReportProgress
	progress: number
}

export interface SdsWasmGenerateResponse extends SdsWasmResponse {
	type: SdsWasmMessageType.Generate
	records?: CsvRecord[]
}

export interface SdsWasmEvaluateResponse extends SdsWasmResponse {
	type: SdsWasmMessageType.Evaluate
	evaluatedResult?: IEvaluatedResult
}

export interface SdsWasmNavigateResponse extends SdsWasmResponse {
	type: SdsWasmMessageType.Navigate
	navigateResult?: INavigateResult
}

export interface SdsWasmIntersectSelectedAttributesResponse
	extends SdsWasmResponse {
	type: SdsWasmMessageType.IntersectSelectedAttributes
	intersectionResult?: AttributeRows
}

export interface SdsWasmIntersectAttributesInColumnsResponse
	extends SdsWasmResponse {
	type: SdsWasmMessageType.IntersectAttributesInColumns
	intersectionResult?: IAttributesIntersectionValue[]
}

export type ReportProgressCallback = (progress: number) => void
