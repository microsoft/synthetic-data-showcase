/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import {
	AttributeRows,
	AttributesInColumn,
	CsvRecord,
	IAggregatedCombinations,
	IAttributeRowsMap,
	IAttributesIntersectionValue,
	IEvaluatedResult,
	INavigateResult,
	ISelectedAttributes,
} from 'src/models'
import { v4 } from 'uuid'
import {
	SdsWasmGenerateMessage,
	SdsWasmGenerateResponse,
	SdsWasmInitMessage,
	SdsWasmMessage,
	SdsWasmMessageType,
	SdsWasmResponse,
	SdsWasmEvaluateMessage,
	SdsWasmNavigateMessage,
	SdsWasmIntersectSelectedAttributesMessage,
	SdsWasmIntersectSelectedAttributesResponse,
	ReportProgressCallback,
} from './types'
import {
	SdsWasmEvaluateResponse,
	SdsWasmIntersectAttributesInColumnsMessage,
	SdsWasmIntersectAttributesInColumnsResponse,
	SdsWasmNavigateResponse,
	SdsWasmReportProgressResponse,
} from '.'

type SdsWasmResponseCallback = ((value: SdsWasmResponse) => void) | undefined

interface ICallbackMapValue {
	resolver: SdsWasmResponseCallback
	reportProgress?: ReportProgressCallback
}

export class SdsWasmWorker {
	private _worker?: Worker
	private _callback_map: Map<string, ICallbackMapValue>

	constructor() {
		this._callback_map = new Map()
	}

	private responseReceived(event: MessageEvent) {
		if (event && event.data) {
			const response = event.data as SdsWasmResponse
			const callback = this._callback_map.get(response.id)

			if (callback) {
				if (response.type === SdsWasmMessageType.ReportProgress) {
					callback.reportProgress?.(
						(response as SdsWasmReportProgressResponse).progress,
					)
				} else {
					callback.resolver?.(response)
					this._callback_map.delete(response.id)
				}
			}
		}
	}

	private execute<T extends SdsWasmMessage>(
		message: T,
		reportProgress?: ReportProgressCallback,
	): Promise<SdsWasmResponse> {
		let resolver: SdsWasmResponseCallback = undefined
		const receivePromise = new Promise<SdsWasmResponse>(resolve => {
			resolver = resolve
		})

		this._callback_map.set(message.id, {
			resolver,
			reportProgress,
		})
		this._worker?.postMessage(message)

		return receivePromise
	}

	public async init(logLevel: string): Promise<boolean> {
		this._worker = new Worker((await import('./worker?url')).default)
		this._worker.onmessage = this.responseReceived.bind(this)

		const response = await this.execute({
			id: v4(),
			type: SdsWasmMessageType.Init,
			logLevel,
			wasmJsPath: (await import('sds-wasm/sds_wasm?url')).default,
			wasmPath: (await import('sds-wasm/sds_wasm_bg.wasm?url')).default,
		} as SdsWasmInitMessage)

		return response.type === SdsWasmMessageType.Init
	}

	public async generate(
		csvContent: CsvRecord[],
		useColumns: string[],
		sensitiveZeros: string[],
		recordLimit: number,
		resolution: number,
		cacheSize: number,
		reportProgress?: ReportProgressCallback,
	): Promise<CsvRecord[] | undefined> {
		const response = await this.execute(
			{
				id: v4(),
				type: SdsWasmMessageType.Generate,
				csvContent,
				useColumns,
				sensitiveZeros,
				recordLimit,
				resolution,
				cacheSize,
			} as SdsWasmGenerateMessage,
			reportProgress,
		)

		if (response.type === SdsWasmMessageType.Generate) {
			return (response as SdsWasmGenerateResponse).records
		}
		return undefined
	}

	public async evaluate(
		sensitiveCsvContent: CsvRecord[],
		syntheticCsvContent: CsvRecord[],
		useColumns: string[],
		sensitiveZeros: string[],
		recordLimit: number,
		reportingLength: number,
		resolution: number,
		reportProgress?: ReportProgressCallback,
	): Promise<IEvaluatedResult | undefined> {
		const response = await this.execute(
			{
				id: v4(),
				type: SdsWasmMessageType.Evaluate,
				sensitiveCsvContent,
				syntheticCsvContent,
				useColumns,
				sensitiveZeros,
				recordLimit,
				reportingLength,
				resolution,
			} as SdsWasmEvaluateMessage,
			reportProgress,
		)

		if (response.type === SdsWasmMessageType.Evaluate) {
			return (response as SdsWasmEvaluateResponse).evaluatedResult
		}
		return undefined
	}

	public async navigate(
		syntheticCsvContent: CsvRecord[],
	): Promise<INavigateResult | undefined> {
		const response = await this.execute({
			id: v4(),
			type: SdsWasmMessageType.Navigate,
			syntheticCsvContent,
		} as SdsWasmNavigateMessage)

		if (response.type === SdsWasmMessageType.Navigate) {
			return (response as SdsWasmNavigateResponse).navigateResult
		}
		return undefined
	}

	public async findColumnsWithZeros(items: CsvRecord[]): Promise<number[]> {
		const zeros = new Set<number>()

		items.forEach(line => {
			line.forEach((v, i) => {
				if (!zeros.has(i)) {
					if (v.trim() === '0') {
						zeros.add(i)
					}
				}
			})
		})
		return Array.from(zeros)
	}

	public async intersectSelectedAttributesWith(
		selectedAttributes: ISelectedAttributes,
		initialRows: AttributeRows,
		attrRowsMap: IAttributeRowsMap,
	): Promise<AttributeRows | undefined> {
		const response = await this.execute({
			id: v4(),
			type: SdsWasmMessageType.IntersectSelectedAttributes,
			selectedAttributes,
			initialRows,
			attrRowsMap,
		} as SdsWasmIntersectSelectedAttributesMessage)

		if (response.type === SdsWasmMessageType.IntersectSelectedAttributes) {
			return (response as SdsWasmIntersectSelectedAttributesResponse)
				.intersectionResult
		}
		return undefined
	}

	public async intersectAttributesInColumnsWith(
		headers: CsvRecord,
		initialRows: AttributeRows,
		attrsInColumn: AttributesInColumn,
		selectedAttributeRows: AttributeRows,
		selectedAttributes: ISelectedAttributes,
		attrRowsMap: IAttributeRowsMap,
		columnIndex: number,
		sensitiveAggregatedCombinations?: IAggregatedCombinations,
	): Promise<IAttributesIntersectionValue[] | undefined> {
		const response = await this.execute({
			id: v4(),
			type: SdsWasmMessageType.IntersectAttributesInColumns,
			headers,
			initialRows,
			attrsInColumn,
			selectedAttributeRows,
			selectedAttributes,
			attrRowsMap,
			columnIndex,
			sensitiveAggregatedCombinations,
		} as SdsWasmIntersectAttributesInColumnsMessage)

		if (response.type === SdsWasmMessageType.IntersectAttributesInColumns) {
			return (response as SdsWasmIntersectAttributesInColumnsResponse)
				.intersectionResult
		}
		return undefined
	}
}
