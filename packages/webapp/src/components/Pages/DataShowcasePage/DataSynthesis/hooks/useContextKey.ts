/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { useMemo } from 'react'

import type { IContextParameters } from '~models'
import { OversamplingType, SynthesisMode } from '~models'

import type { IOnRunGenerateParameters } from './useOnRunGenerate'

export function useContextKey(
	params: IContextParameters | IOnRunGenerateParameters,
): string {
	return useMemo(() => {
		switch (params.synthesisMode) {
			case SynthesisMode.Unseeded:
			case SynthesisMode.RowSeeded:
				return `${params.synthesisMode} (Resolution=${params.resolution})`
			case SynthesisMode.ValueSeeded:
				return (
					`${params.synthesisMode} (Resolution=${params.resolution}, ReportingLength=${params.reportingLength}, Oversampling=${params.oversamplingType}` +
					(params.oversamplingType === OversamplingType.Unlimited
						? ')'
						: `, OversamplingRatio=${params.oversamplingRatio}, OversamplingTries=${params.oversamplingTries})`)
				)
			case SynthesisMode.AggregateSeeded:
				return `${params.synthesisMode} (Resolution=${params.resolution}, ReportingLength=${params.reportingLength}, UseSyntheticCounts=${params.useSyntheticCounts})`
			case SynthesisMode.DP:
				return `${params.synthesisMode} (Resolution=${params.resolution}, ReportingLength=${params.reportingLength}, UseSyntheticCounts=${params.useSyntheticCounts}, PercentilePercentage=${params.percentilePercentage}, SensitivityFilterEpsilon=${params.sensitivityFilterEpsilon}, NoiseEpsilon=${params.noiseEpsilon}, NoiseDelta=${params.noiseDelta})`
		}
	}, [params])
}
