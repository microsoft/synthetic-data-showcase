/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { useMemo } from 'react'

import type { IContextParameters } from '~models'
import { OversamplingType, SynthesisMode } from '~models'

import type { IOnRunGenerateAndEvaluateParameters } from './useOnRunGenerateAndEvaluate'

export function useContextKey(
	params: IContextParameters | IOnRunGenerateAndEvaluateParameters,
): string {
	return useMemo(() => {
		switch (params.synthesisMode) {
			case SynthesisMode.Unseeded:
			case SynthesisMode.RowSeeded:
				return `K-Anon ${params.synthesisMode} (Resolution=${params.resolution}, ReportingLength=${params.reportingLength})`
			case SynthesisMode.ValueSeeded:
				return (
					`K-Anon ${params.synthesisMode} (Resolution=${params.resolution}, ReportingLength=${params.reportingLength}, Oversampling=${params.oversamplingType}` +
					(params.oversamplingType === OversamplingType.Unlimited
						? ')'
						: `, OversamplingRatio=${params.oversamplingRatio}, OversamplingTries=${params.oversamplingTries})`)
				)
			case SynthesisMode.AggregateSeeded:
				return `K-Anon ${params.synthesisMode} (Resolution=${params.resolution}, ReportingLength=${params.reportingLength}, UseSyntheticCounts=${params.useSyntheticCounts})`
			case SynthesisMode.DP:
				return `DP (Resolution=${params.resolution}, ReportingLength=${
					params.reportingLength
				}, UseSyntheticCounts=${params.useSyntheticCounts}, Percentile=${
					params.percentilePercentage
				}, PercentileEpsilonProp=${
					params.percentileEpsilonProportion
				}, Epsilon=${params.noiseEpsilon}, Delta=${
					params.noiseDelta
				}, Threshold=(${params.thresholdType}, [${Object.values(
					params.threshold,
				).join(',')}]), BudgetProfile=(${params.privacyBudgetProfile}))`
		}
	}, [params])
}
