/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import {
	CsvData,
	HeaderNames,
	IAttributesIntersectionByColumn,
	IEvaluateResult,
	ISelectedAttributesByColumn,
	ReportProgressCallback,
} from 'sds-wasm'
import { v4 } from 'uuid'
import {
	SdsWasmAttributesIntersectionsByColumnMessage,
	SdsWasmAttributesIntersectionsByColumnResponse,
	SdsWasmClearEvaluateMessage,
	SdsWasmClearGenerateMessage,
	SdsWasmClearNavigateMessage,
	SdsWasmClearSensitiveDataMessage,
	SdsWasmErrorResponse,
	SdsWasmEvaluateMessage,
	SdsWasmEvaluateResponse,
	SdsWasmGenerateMessage,
	SdsWasmGenerateResponse,
	SdsWasmInitMessage,
	SdsWasmMessage,
	SdsWasmMessageType,
	SdsWasmNavigateMessage,
	SdsWasmReportProgressResponse,
	SdsWasmResponse,
	SdsWasmSelectAttributesMessage,
} from './types'
import Worker from './worker?worker'

type SdsWasmResponseCallback = ((value: SdsWasmResponse) => void) | undefined

type SdsWasmErrorCallback = ((reason?: string) => void) | undefined

interface ICallbackMapValue {
	resolver: SdsWasmResponseCallback
	rejector: SdsWasmErrorCallback
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
				} else if (response.type === SdsWasmMessageType.Error) {
					callback.rejector?.((response as SdsWasmErrorResponse).errorMessage)
					this._callback_map.delete(response.id)
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
		let rejector: SdsWasmErrorCallback = undefined

		const receivePromise = new Promise<SdsWasmResponse>((resolve, reject) => {
			resolver = resolve
			rejector = reject
		})

		this._callback_map.set(message.id, {
			resolver,
			rejector,
			reportProgress,
		})
		this._worker?.postMessage(message)

		return receivePromise
	}

	public async init(logLevel: string): Promise<boolean> {
		this._worker = new Worker()
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

	public async clearSensitiveData(): Promise<boolean> {
		const response = await this.execute({
			id: v4(),
			type: SdsWasmMessageType.ClearSensitiveData,
		} as SdsWasmClearSensitiveDataMessage)

		return response.type === SdsWasmMessageType.ClearSensitiveData
	}

	public async clearGenerate(): Promise<boolean> {
		const response = await this.execute({
			id: v4(),
			type: SdsWasmMessageType.ClearGenerate,
		} as SdsWasmClearGenerateMessage)

		return response.type === SdsWasmMessageType.ClearGenerate
	}

	public async clearEvaluate(): Promise<boolean> {
		const response = await this.execute({
			id: v4(),
			type: SdsWasmMessageType.ClearEvaluate,
		} as SdsWasmClearEvaluateMessage)

		return response.type === SdsWasmMessageType.ClearEvaluate
	}

	public async clearNavigate(): Promise<boolean> {
		const response = await this.execute({
			id: v4(),
			type: SdsWasmMessageType.ClearNavigate,
		} as SdsWasmClearNavigateMessage)

		return response.type === SdsWasmMessageType.ClearNavigate
	}

	public async generate(
		sensitiveCsvData: CsvData,
		useColumns: string[],
		sensitiveZeros: string[],
		recordLimit: number,
		resolution: number,
		cacheSize: number,
		reportProgress?: ReportProgressCallback,
		emptyValue = '',
		seeded = true,
	): Promise<CsvData | undefined> {
		const response = await this.execute(
			{
				id: v4(),
				type: SdsWasmMessageType.Generate,
				sensitiveCsvData,
				useColumns,
				sensitiveZeros,
				recordLimit,
				resolution,
				emptyValue,
				cacheSize,
				seeded,
			} as SdsWasmGenerateMessage,
			reportProgress,
		)

		if (response.type === SdsWasmMessageType.Generate) {
			return (response as SdsWasmGenerateResponse).syntheticCsvData
		}
		return undefined
	}

	public async evaluate(
		reportingLength: number,
		sensitivityThreshold = 0,
		combinationDelimiter = ';',
		includeAggregatesCount = false,
		reportProgress?: ReportProgressCallback,
	): Promise<IEvaluateResult | undefined> {
		const response = await this.execute(
			{
				id: v4(),
				type: SdsWasmMessageType.Evaluate,
				reportingLength,
				sensitivityThreshold,
				combinationDelimiter,
				includeAggregatesCount,
			} as SdsWasmEvaluateMessage,
			reportProgress,
		)

		if (response.type === SdsWasmMessageType.Evaluate) {
			return (response as SdsWasmEvaluateResponse).evaluateResult
		}
		return undefined
	}

	public async navigate(): Promise<boolean> {
		const response = await this.execute({
			id: v4(),
			type: SdsWasmMessageType.Navigate,
		} as SdsWasmNavigateMessage)

		return response.type === SdsWasmMessageType.Navigate
	}

	public async selectAttributes(
		attributes: ISelectedAttributesByColumn,
	): Promise<boolean> {
		const response = await this.execute({
			id: v4(),
			type: SdsWasmMessageType.SelectAttributes,
			attributes,
		} as SdsWasmSelectAttributesMessage)

		return response.type === SdsWasmMessageType.SelectAttributes
	}

	public async attributesIntersectionsByColumn(
		columns: HeaderNames,
	): Promise<IAttributesIntersectionByColumn | undefined> {
		const response = await this.execute({
			id: v4(),
			type: SdsWasmMessageType.AttributesIntersectionsByColumn,
			columns,
		} as SdsWasmAttributesIntersectionsByColumnMessage)

		if (response.type === SdsWasmMessageType.AttributesIntersectionsByColumn) {
			return (response as SdsWasmAttributesIntersectionsByColumnResponse)
				.attributesIntersectionByColumn
		}
		return undefined
	}
}
