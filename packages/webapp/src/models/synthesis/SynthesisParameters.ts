/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import type { OversamplingType } from './OversamplingType'
import type { SynthesisMode } from './SynthesisMode'
import type { UseSyntheticCounts } from './UseSyntheticCounts'

export interface SynthesisParameters {
	synthesisMode: SynthesisMode
	resolution: number
	cacheSize: number
	reportingLength: number
	oversamplingType: OversamplingType
	oversamplingRatio: number
	oversamplingTries: number
	useSyntheticCounts: UseSyntheticCounts
	percentilePercentage: number
	sensitivityFilterEpsilon: number
	noiseEpsilon: number
	noiseDelta: number
	emptyValue: string
}