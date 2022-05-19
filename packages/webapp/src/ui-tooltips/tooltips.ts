/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { fromMarkdownStr } from '~components/Markdown'

/* eslint-disable */
import ACCURACY_MODE from './mds/ACCURACY_MODE.md?raw'
import ANALYSIS_LENGTH from './mds/ANALYSIS_LENGTH.md?raw'
import CACHE_SIZE from './mds/CACHE_SIZE.md?raw'
import COUNT_MEAN_AND_ERROR from './mds/COUNT_MEAN_AND_ERROR.md?raw'
import EVALUATE from './mds/EVALUATE.md?raw'
import FABRICATED_COMBINATIONS from './mds/FABRICATED_COMBINATIONS.md?raw'
import MEAN_PROPORTIONAL_ERROR from './mds/MEAN_PROPORTIONAL_ERROR.md?raw'
import N_COUNT_MEAN_AND_ERROR from './mds/N_COUNT_MEAN_AND_ERROR.md?raw'
import NAVIGATE from './mds/NAVIGATE.md?raw'
import NOISE_DELTA from './mds/NOISE_DELTA.md?raw'
import NOISE_EPSILON from './mds/NOISE_EPSILON.md?raw'
import OVERSAMPLING from './mds/OVERSAMPLING.md?raw'
import OVERSAMPLING_RATIO from './mds/OVERSAMPLING_RATIO.md?raw'
import OVERSAMPLING_TRIES from './mds/OVERSAMPLING_TRIES.md?raw'
import PERCENTILE_EPSILON_PROPORTION from './mds/PERCENTILE_EPSILON_PROPORTION.md?raw'
import PERCENTILE_PERCENTAGE from './mds/PERCENTILE_PERCENTAGE.md?raw'
import RARE_COMBS from './mds/RARE_COMBS.md?raw'
import RECORD_EXPANSION from './mds/RECORD_EXPANSION.md?raw'
import RECORD_LIMIT from './mds/RECORD_LIMIT.md?raw'
import RECORDS_WITH_RARE_COMBS from './mds/RECORDS_WITH_RARE_COMBS.md?raw'
import RECORDS_WITH_UNIQUE_COMBS from './mds/RECORDS_WITH_UNIQUE_COMBS.md?raw'
import REPORTING_LENGTH from './mds/REPORTING_LENGTH.md?raw'
import RESOLUTION from './mds/RESOLUTION.md?raw'
import SENSITIVE_FILE from './mds/SENSITIVE_FILE.md?raw'
import SUPPRESSED_COMBINATIONS from './mds/SUPPRESSED_COMBINATIONS.md?raw'
import SYNTHESIS_MODE from './mds/SYNTHESIS_MODE.md?raw'
import SYNTHESIZE from './mds/SYNTHESIZE.md?raw'
import THRESHOLD_TYPE from './mds/THRESHOLD_TYPE.md?raw'
import THRESHOLD_VALUE from './mds/THRESHOLD_VALUE.md?raw'
import UNIQUE_COMBS from './mds/UNIQUE_COMBS.md?raw'
import USE_SYNTHETIC_COUNTS from './mds/USE_SYNTHETIC_COUNTS.md?raw'
/* eslint-enable */

export const tooltips = {
	sensitiveFile: fromMarkdownStr(SENSITIVE_FILE),
	resolution: fromMarkdownStr(RESOLUTION),
	recordLimit: fromMarkdownStr(RECORD_LIMIT),
	cacheSize: fromMarkdownStr(CACHE_SIZE),
	synthesisMode: fromMarkdownStr(SYNTHESIS_MODE),
	synthesize: fromMarkdownStr(SYNTHESIZE),
	analysisLength: fromMarkdownStr(ANALYSIS_LENGTH),
	evaluate: fromMarkdownStr(EVALUATE),
	recordsWithUniqueCombs: fromMarkdownStr(RECORDS_WITH_UNIQUE_COMBS),
	recordsWithRareCombs: fromMarkdownStr(RECORDS_WITH_RARE_COMBS),
	uniqueCombs: fromMarkdownStr(UNIQUE_COMBS),
	rareCombs: fromMarkdownStr(RARE_COMBS),
	recordExpansion: fromMarkdownStr(RECORD_EXPANSION),
	navigate: fromMarkdownStr(NAVIGATE),
	noiseDelta: fromMarkdownStr(NOISE_DELTA),
	noiseEpsilon: fromMarkdownStr(NOISE_EPSILON),
	oversamplingRatio: fromMarkdownStr(OVERSAMPLING_RATIO),
	oversamplingTries: fromMarkdownStr(OVERSAMPLING_TRIES),
	oversampling: fromMarkdownStr(OVERSAMPLING),
	percentilePercentage: fromMarkdownStr(PERCENTILE_PERCENTAGE),
	reportingLength: fromMarkdownStr(REPORTING_LENGTH),
	percentileEpsilonProportion: fromMarkdownStr(PERCENTILE_EPSILON_PROPORTION),
	useSyntheticCounts: fromMarkdownStr(USE_SYNTHETIC_COUNTS),
	suppressedCombinations: fromMarkdownStr(SUPPRESSED_COMBINATIONS),
	fabricatedCombinations: fromMarkdownStr(FABRICATED_COMBINATIONS),
	nCountMeanAndError: fromMarkdownStr(N_COUNT_MEAN_AND_ERROR),
	countMeanAndError: fromMarkdownStr(COUNT_MEAN_AND_ERROR),
	meanProportionalError: fromMarkdownStr(MEAN_PROPORTIONAL_ERROR),
	thresholdType: fromMarkdownStr(THRESHOLD_TYPE),
	thresholdValue: fromMarkdownStr(THRESHOLD_VALUE),
	accuracyMode: fromMarkdownStr(ACCURACY_MODE),
}
