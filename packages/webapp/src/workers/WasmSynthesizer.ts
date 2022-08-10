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
	INavigateResult,
	ISelectedAttributesByColumn,
	ReportProgressCallback,
} from '@essex/sds-core'
import { expose } from 'comlink'

/* eslint-disable */
import { BaseSdsWasmWorker } from './BaseSdsWasmWorker'
import type {
	IAggregateSeededSynthesisParameters,
	IDpSynthesisParameters,
	IRowSeededSynthesisParameters,
	ISynthesisParameters,
	IUnseededSynthesisParameters,
	IValueSeededSynthesisParameters,
	Proxy,
	WorkerProgressCallback,
} from './types'
import { AggregateType, SynthesisMode } from './types'
/* eslint-enable */

export class WasmSynthesizer extends BaseSdsWasmWorker {
	public async generateAndEvaluate(
		csvData: string,
		parameters: ISynthesisParameters,
		progressCallback?: Proxy<WorkerProgressCallback>,
	): Promise<void> {
		const context = this.getContext()

		// this initial call is necessary for
		// this to work on firefox without
		// having to await inside generateProgressCallback
		// and evaluateProgressCallback
		await progressCallback?.(0)

		const generateProgressCallback = p => {
			progressCallback?.(0.5 * p)
			return true
		}
		const evaluateProgressCallback = p => {
			progressCallback?.(50.0 + 0.5 * p)
			return true
		}

		context.setSensitiveData(csvData, parameters.csvDataParameters)

		switch (parameters.mode) {
			case SynthesisMode.Unseeded:
				this.generateUnseeded(
					parameters as IUnseededSynthesisParameters,
					generateProgressCallback,
				)
				break
			case SynthesisMode.RowSeeded:
				this.generateRowSeeded(
					parameters as IRowSeededSynthesisParameters,
					generateProgressCallback,
				)
				break
			case SynthesisMode.ValueSeeded:
				this.generateValueSeeded(
					parameters as IValueSeededSynthesisParameters,
					generateProgressCallback,
				)
				break
			case SynthesisMode.AggregateSeeded:
				this.generateAggregateSeeded(
					parameters as IAggregateSeededSynthesisParameters,
					generateProgressCallback,
				)
				break
			case SynthesisMode.DP:
				this.generateDp(
					parameters as IDpSynthesisParameters,
					generateProgressCallback,
				)
				break
		}

		context.evaluate(parameters.reportingLength, evaluateProgressCallback)
	}

	public async navigate(): Promise<void> {
		return this.getContext().navigate()
	}

	public async selectAttributes(
		attributes: ISelectedAttributesByColumn,
	): Promise<void> {
		this.getContext().selectAttributes(attributes)
	}

	public async attributesIntersectionsByColumn(
		columns: HeaderNames,
	): Promise<IAttributesIntersectionByColumn> {
		return this.getContext().attributesIntersectionsByColumn(columns)
	}

	public async getAggregateResult(
		aggregateType: AggregateType,
		aggregatesDelimiter: string,
		combinationDelimiter: string,
	): Promise<IAggregateResult> {
		const context = this.getContext()

		switch (aggregateType) {
			case AggregateType.Sensitive:
				return context.sensitiveAggregateResultToJs(
					aggregatesDelimiter,
					combinationDelimiter,
				)
			case AggregateType.Aggregated:
				return context.reportableAggregateResultToJs(
					aggregatesDelimiter,
					combinationDelimiter,
				)
			case AggregateType.Synthetic:
				return context.syntheticAggregateResultToJs(
					aggregatesDelimiter,
					combinationDelimiter,
				)
		}
	}

	public async getGenerateResult(
		joinMultiValueColumns: boolean,
		longForm = false,
	): Promise<IGenerateResult> {
		return this.getContext().generateResultToJs(joinMultiValueColumns, longForm)
	}

	public async getEvaluateResult(): Promise<IEvaluateResult> {
		return this.getContext().evaluateResultToJs()
	}

	public async getNavigateResult(): Promise<INavigateResult> {
		return this.getContext().navigateResultToJs()
	}

	private generateUnseeded(
		parameters: IUnseededSynthesisParameters,
		progressCallback: ReportProgressCallback,
	): void {
		this.getContext().generateUnseeded(
			parameters.baseSynthesisParameters,
			progressCallback,
		)
	}

	private generateRowSeeded(
		parameters: IRowSeededSynthesisParameters,
		progressCallback: ReportProgressCallback,
	): void {
		this.getContext().generateRowSeeded(
			parameters.baseSynthesisParameters,
			progressCallback,
		)
	}

	private generateValueSeeded(
		parameters: IValueSeededSynthesisParameters,
		progressCallback: ReportProgressCallback,
	): void {
		this.getContext().generateValueSeeded(
			parameters.baseSynthesisParameters,
			parameters.reportingLength,
			parameters.oversampling,
			progressCallback,
		)
	}

	private generateAggregateSeeded(
		parameters: IAggregateSeededSynthesisParameters,
		progressCallback: ReportProgressCallback,
	): void {
		this.getContext().generateAggregateSeeded(
			parameters.baseSynthesisParameters,
			parameters.reportingLength,
			parameters.useSyntheticCounts,
			parameters.weightSelectionPercentile,
			progressCallback,
		)
	}

	private generateDp(
		parameters: IDpSynthesisParameters,
		progressCallback: ReportProgressCallback,
	): void {
		this.getContext().generateDp(
			parameters.baseSynthesisParameters,
			parameters.reportingLength,
			parameters.dpParameters,
			parameters.noiseThreshold,
			parameters.useSyntheticCounts,
			parameters.weightSelectionPercentile,
			progressCallback,
		)
	}
}

expose(WasmSynthesizer)
