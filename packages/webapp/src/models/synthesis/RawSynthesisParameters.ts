/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import type { IInputNumberByLength } from 'sds-wasm'

import { SynthesisMode } from '~workers/types'

import { AccuracyMode } from './AccuracyMode.js'
import { FabricationMode } from './FabricationMode.js'
import { OversamplingType } from './OversamplingType.js'
import { UseSyntheticCounts } from './UseSyntheticCounts.js'

export interface IRawSynthesisParameters {
	recordLimit: number
	synthesisMode: SynthesisMode
	resolution: number
	cacheSize: number
	reportingLength: number
	oversamplingType: OversamplingType
	oversamplingRatio: number
	oversamplingTries: number
	aggregateSeededUseSyntheticCounts: UseSyntheticCounts
	dpAggregateSeededUseSyntheticCounts: UseSyntheticCounts
	percentilePercentage: number
	percentileEpsilonProportion: number
	noiseEpsilon: number
	deltaFactor: number
	fabricationMode: FabricationMode
	threshold: IInputNumberByLength
	accuracyMode: AccuracyMode
}

export const defaultRawSynthesisParameters: IRawSynthesisParameters = {
	recordLimit: 0,
	synthesisMode: SynthesisMode.RowSeeded,
	resolution: 10,
	cacheSize: 100000,
	reportingLength: 3,
	oversamplingType: OversamplingType.Controlled,
	oversamplingRatio: 0.1,
	oversamplingTries: 10,
	aggregateSeededUseSyntheticCounts: UseSyntheticCounts.Yes,
	dpAggregateSeededUseSyntheticCounts: UseSyntheticCounts.No,
	percentilePercentage: 99,
	percentileEpsilonProportion: 0.1,
	noiseEpsilon: 6.0,
	deltaFactor: 2,
	fabricationMode: FabricationMode.Balanced,
	threshold: {},
	accuracyMode: AccuracyMode.PrioritizeLargeCounts,
}
