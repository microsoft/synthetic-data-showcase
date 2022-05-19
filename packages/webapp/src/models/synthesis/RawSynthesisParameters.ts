/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import type { IInputNumberByLength } from 'sds-wasm'

import { SynthesisMode } from '~workers/types'

import { NoisyCountThresholdType } from './NoisyCountThresholdType.js'
import { OversamplingType } from './OversamplingType.js'
import { PrivacyBudgetProfile } from './PrivacyBudgetProfile.js'
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
	useSyntheticCounts: UseSyntheticCounts
	percentilePercentage: number
	percentileEpsilonProportion: number
	noiseEpsilon: number
	noiseDelta: number
	thresholdType: NoisyCountThresholdType
	threshold: IInputNumberByLength
	privacyBudgetProfile: PrivacyBudgetProfile
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
	useSyntheticCounts: UseSyntheticCounts.Yes,
	percentilePercentage: 99,
	percentileEpsilonProportion: 0.1,
	noiseEpsilon: 6.0,
	noiseDelta: 0.0001,
	thresholdType: NoisyCountThresholdType.Adaptive,
	threshold: {},
	privacyBudgetProfile: PrivacyBudgetProfile.ProportionallyIncreasing,
}
