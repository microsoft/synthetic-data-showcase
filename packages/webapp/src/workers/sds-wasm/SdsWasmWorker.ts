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
	ReportProgressCallback,
} from 'sds-wasm'
import { v4 } from 'uuid'

import type {
	AggregateType,
	AllContextsParameters,
	IContextParameters,
} from '~models'

import type {
	SdsWasmAttributesIntersectionsByColumnMessage,
	SdsWasmAttributesIntersectionsByColumnResponse,
	SdsWasmClearContextsMessage,
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
	SdsWasmMessage,
	SdsWasmNavigateMessage,
	SdsWasmReportProgressResponse,
	SdsWasmResponse,
	SdsWasmSelectAttributesMessage,
} from './types'
import { SdsWasmMessageType } from './types'
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

	public async init(
		logLevel: string,
		maxContextCacheSize: number,
	): Promise<boolean> {
		this._worker = new Worker()
		this._worker.onmessage = this.responseReceived.bind(this)

		const response = await this.execute({
			id: v4(),
			type: SdsWasmMessageType.Init,
			logLevel,
			maxContextCacheSize,
			wasmJsPath: (await import('sds-wasm/sds_wasm?url')).default,
			wasmPath: (await import('sds-wasm/sds_wasm_bg.wasm?url')).default,
		} as SdsWasmInitMessage)

		return response.type === SdsWasmMessageType.Init
	}

	public async clearContexts(): Promise<boolean> {
		const response = await this.execute({
			id: v4(),
			type: SdsWasmMessageType.ClearContexts,
		} as SdsWasmClearContextsMessage)

		return response.type === SdsWasmMessageType.ClearContexts
	}

	public async generateAndEvaluate(
		contextKey: string,
		sensitiveCsvData: string,
		contextParameters: IContextParameters,
		reportProgress?: ReportProgressCallback,
	): Promise<AllContextsParameters | undefined> {
		const response = await this.execute(
			{
				id: v4(),
				type: SdsWasmMessageType.GenerateAndEvaluate,
				contextKey,
				sensitiveCsvData,
				contextParameters,
			} as SdsWasmGenerateAndEvaluateMessage,
			reportProgress,
		)

		if (response.type === SdsWasmMessageType.GenerateAndEvaluate) {
			return (response as SdsWasmGenerateAndEvaluateResponse)
				.allContextParameters
		}
		return undefined
	}

	public async navigate(contextKey: string): Promise<boolean> {
		const response = await this.execute({
			id: v4(),
			type: SdsWasmMessageType.Navigate,
			contextKey,
		} as SdsWasmNavigateMessage)

		return response.type === SdsWasmMessageType.Navigate
	}

	public async selectAttributes(
		contextKey: string,
		attributes: ISelectedAttributesByColumn,
	): Promise<boolean> {
		const response = await this.execute({
			id: v4(),
			type: SdsWasmMessageType.SelectAttributes,
			contextKey,
			attributes,
		} as SdsWasmSelectAttributesMessage)

		return response.type === SdsWasmMessageType.SelectAttributes
	}

	public async attributesIntersectionsByColumn(
		contextKey: string,
		columns: HeaderNames,
	): Promise<IAttributesIntersectionByColumn | undefined> {
		const response = await this.execute({
			id: v4(),
			type: SdsWasmMessageType.AttributesIntersectionsByColumn,
			contextKey,
			columns,
		} as SdsWasmAttributesIntersectionsByColumnMessage)

		if (response.type === SdsWasmMessageType.AttributesIntersectionsByColumn) {
			return (response as SdsWasmAttributesIntersectionsByColumnResponse)
				.attributesIntersectionByColumn
		}
		return undefined
	}

	public async getAggregateResult(
		contextKey: string,
		aggregateType: AggregateType,
		aggregatesDelimiter = ',',
		combinationDelimiter = ';',
	): Promise<IAggregateResult | undefined> {
		const response = await this.execute({
			id: v4(),
			type: SdsWasmMessageType.GetAggregateResult,
			contextKey,
			aggregatesDelimiter,
			combinationDelimiter,
			aggregateType,
		} as SdsWasmGetAggregateResultMessage)

		if (response.type === SdsWasmMessageType.GetAggregateResult) {
			return (response as SdsWasmGetAggregateResultResponse).aggregateResult
		}
		return undefined
	}

	public async getGenerateResult(
		contextKey: string,
	): Promise<IGenerateResult | undefined> {
		const response = await this.execute({
			id: v4(),
			type: SdsWasmMessageType.GetGenerateResult,
			contextKey,
		} as SdsWasmGetGenerateResultMessage)

		if (response.type === SdsWasmMessageType.GetGenerateResult) {
			return (response as SdsWasmGetGenerateResultResponse).generateResult
		}
		return undefined
	}

	public async getEvaluateResult(
		contextKey: string,
	): Promise<IEvaluateResult | undefined> {
		const response = await this.execute({
			id: v4(),
			type: SdsWasmMessageType.GetEvaluateResult,
			contextKey,
		} as SdsWasmGetEvaluateResultMessage)

		if (response.type === SdsWasmMessageType.GetEvaluateResult) {
			return (response as SdsWasmGetEvaluateResultResponse).evaluateResult
		}
		return undefined
	}
}
