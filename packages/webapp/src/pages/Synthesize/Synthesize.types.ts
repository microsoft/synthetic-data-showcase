/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import type { IInputNumberByLength } from 'sds-wasm'

import type {
	NoisyCountThresholdType,
	OversamplingType,
	PrivacyBudgetProfile,
	UseSyntheticCounts,
} from '~models'
import type { SynthesisMode } from '~workers/types'

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
