/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import type { HeaderNames, IInputNumberByLength } from 'sds-wasm'

import type { NoisyCountThresholdType, PrivacyBudgetProfile } from '~models'
import type { SynthesisMode } from '~workers/types'

import type { OversamplingType } from './OversamplingType'
import type { UseSyntheticCounts } from './UseSyntheticCounts'

export interface IContextParameters {
	key: string
	delimiter: string
	useColumns: HeaderNames
	sensitiveZeros: HeaderNames
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
	emptyValue: string
	isEvaluated: boolean
}

export type AllContextsParameters = IContextParameters[]

export const defaultThreshold = 1.0
