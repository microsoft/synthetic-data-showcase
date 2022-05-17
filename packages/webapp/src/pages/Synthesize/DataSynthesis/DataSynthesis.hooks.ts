/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { useCallback, useMemo } from 'react'

import type { ICsvContent } from '~models'
import {
	OversamplingType,
	PrivacyBudgetProfile,
	UseSyntheticCounts,
} from '~models'
import { useSdsManagerInstance, useSensitiveContentValue } from '~states'
import { namedSpread, spreadableHeaders, usableHeaders } from '~utils'
import type {
	IAggregateSeededSynthesisParameters,
	IDpSynthesisParameters,
	ISynthesisParameters,
	IValueSeededSynthesisParameters,
} from '~workers/types'
import { SynthesisMode } from '~workers/types'

import type { IRawSynthesisParameters } from '../Synthesize.types'

export function generateContextKey(params: IRawSynthesisParameters): string {
	switch (params.synthesisMode) {
		case SynthesisMode.Unseeded:
		case SynthesisMode.RowSeeded:
			return `K-Anon ${params.synthesisMode} (RecordLimit=${params.recordLimit}, Resolution=${params.resolution}, ReportingLength=${params.reportingLength})`
		case SynthesisMode.ValueSeeded:
			return (
				`K-Anon ${params.synthesisMode} (RecordLimit=${params.recordLimit}, Resolution=${params.resolution}, ReportingLength=${params.reportingLength}, Oversampling=${params.oversamplingType}` +
				(params.oversamplingType === OversamplingType.Unlimited
					? ')'
					: `, OversamplingRatio=${params.oversamplingRatio}, OversamplingTries=${params.oversamplingTries})`)
			)
		case SynthesisMode.AggregateSeeded:
			return `K-Anon ${params.synthesisMode} (RecordLimit=${params.recordLimit}, Resolution=${params.resolution}, ReportingLength=${params.reportingLength}, UseSyntheticCounts=${params.useSyntheticCounts})`
		case SynthesisMode.DP:
			return `DP (RecordLimit=${params.recordLimit}, Resolution=${
				params.resolution
			}, ReportingLength=${params.reportingLength}, UseSyntheticCounts=${
				params.useSyntheticCounts
			}, Percentile=${params.percentilePercentage}, PercentileEpsilonProp=${
				params.percentileEpsilonProportion
			}, Epsilon=${params.noiseEpsilon}, Delta=${
				params.noiseDelta
			}, Threshold=(${params.thresholdType}, [${Object.values(
				params.threshold,
			).join(',')}]), BudgetProfile=(${params.privacyBudgetProfile}))`
	}
}

function generateSigmaProportions(
	reportingLength: number,
	privacyBudgetProfile: PrivacyBudgetProfile,
): number[] {
	const sigmaProportions: number[] = []

	for (let i = 0; i < reportingLength; i++) {
		let p
		switch (privacyBudgetProfile) {
			case PrivacyBudgetProfile.Flat:
				p = 1.0
				break
			case PrivacyBudgetProfile.ProportionallyIncreasing:
				p = 1.0 / (i + 1)
				break
			case PrivacyBudgetProfile.ProportionallyDecreasing:
				p = 1.0 / (reportingLength - i)
				break
		}
		sigmaProportions.push(p)
	}
	return sigmaProportions
}

function convertRawToSynthesisParameters(
	rawParams: IRawSynthesisParameters,
	useColumns: string[],
	sensitiveCsvContent: ICsvContent,
): ISynthesisParameters {
	let ret: ISynthesisParameters = {
		mode: rawParams.synthesisMode,
		csvDataParameters: {
			delimiter: sensitiveCsvContent.delimiter,
			useColumns,
			sensitiveZeros: sensitiveCsvContent.headers
				.filter(h => h.hasSensitiveZeros)
				.map(h => h.name),
			recordLimit: rawParams.recordLimit,
		},
		baseSynthesisParameters: {
			resolution: rawParams.resolution,
			cacheMaxSize: rawParams.cacheSize,
			emptyValue: '',
		},
		reportingLength: rawParams.reportingLength,
	}

	switch (rawParams.synthesisMode) {
		case SynthesisMode.Unseeded:
			break
		case SynthesisMode.RowSeeded:
			break
		case SynthesisMode.ValueSeeded:
			ret = {
				...ret,
				oversampling:
					rawParams.oversamplingType === OversamplingType.Controlled
						? {
								oversamplingRatio: rawParams.oversamplingRatio,
								oversamplingTries: rawParams.oversamplingTries,
						  }
						: undefined,
			} as IValueSeededSynthesisParameters
			break
		case SynthesisMode.AggregateSeeded:
			ret = {
				...ret,
				useSyntheticCounts:
					rawParams.useSyntheticCounts === UseSyntheticCounts.Yes,
			} as IAggregateSeededSynthesisParameters
			break
		case SynthesisMode.DP:
			ret = {
				...ret,
				dpParameters: {
					epsilon: rawParams.noiseEpsilon,
					delta: rawParams.noiseDelta,
					percentilePercentage: rawParams.percentilePercentage,
					percentileEpsilonProportion: rawParams.percentileEpsilonProportion,
					sigmaProportions: generateSigmaProportions(
						rawParams.reportingLength,
						rawParams.privacyBudgetProfile,
					),
				},
				noiseThreshold: {
					type: rawParams.thresholdType,
					valuesByLen: rawParams.threshold,
				},
				useSyntheticCounts:
					rawParams.useSyntheticCounts === UseSyntheticCounts.Yes,
			} as IDpSynthesisParameters
			break
	}
	return ret
}

export function useOnRunGenerateAndEvaluate(): (
	rawParams: IRawSynthesisParameters,
) => Promise<void> {
	const sensitiveContent = useSensitiveContentValue()
	const manager = useSdsManagerInstance()[0]?.instance

	const { resultTable: sensitiveTable, newColumnNames } = useMemo(
		() =>
			namedSpread(
				sensitiveContent.table,
				spreadableHeaders(sensitiveContent).map(h => ({
					name: h.name,
					delimiter: h.spreadWithDelimiter!,
				})),
			),
		[sensitiveContent],
	)

	return useCallback(
		async (rawParams: IRawSynthesisParameters) => {
			const columnsToUse = new Set([
				...usableHeaders(sensitiveContent).map(h => h.name),
				...newColumnNames,
			])
			const synthesisParams = convertRawToSynthesisParameters(
				rawParams,
				sensitiveTable.columnNames().filter(c => columnsToUse.has(c)),
				sensitiveContent,
			)

			await manager?.startGenerateAndEvaluate(
				generateContextKey(rawParams),
				sensitiveTable.toCSV({ delimiter: sensitiveContent.delimiter }),
				synthesisParams,
			)
		},
		[sensitiveContent, manager, newColumnNames, sensitiveTable],
	)
}
