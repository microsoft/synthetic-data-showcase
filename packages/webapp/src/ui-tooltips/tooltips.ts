/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { fromMarkdownStr } from '~components/Markdown'

import ANALYSIS_LENGTH from './mds/ANALYSIS_LENGTH.md?raw'
import CACHE_SIZE from './mds/CACHE_SIZE.md?raw'
import COMBINATION_LOSS from './mds/COMBINATION_LOSS.md?raw'
import EVALUATE from './mds/EVALUATE.md?raw'
import NAVIGATE from './mds/NAVIGATE.md?raw'
import RARE_COMBS from './mds/RARE_COMBS.md?raw'
import RECORD_EXPANSION from './mds/RECORD_EXPANSION.md?raw'
import RECORD_LIMIT from './mds/RECORD_LIMIT.md?raw'
import RECORDS_WITH_RARE_COMBS from './mds/RECORDS_WITH_RARE_COMBS.md?raw'
import RECORDS_WITH_UNIQUE_COMBS from './mds/RECORDS_WITH_UNIQUE_COMBS.md?raw'
import RESOLUTION from './mds/RESOLUTION.md?raw'
import SENSITIVE_DATA_CHARTS from './mds/SENSITIVE_DATA_CHARTS.md?raw'
import SENSITIVE_FILE from './mds/SENSITIVE_FILE.md?raw'
import SYNTHESIS_MODE from './mds/SYNTHESIS_MODE.md?raw'
import SYNTHESIZE from './mds/SYNTHESIZE.md?raw'
import SYNTHETIC_DATA_CHARTS from './mds/SYNTHETIC_DATA_CHARTS.md?raw'
import TODO from './mds/TODO.md?raw'
import UNIQUE_COMBS from './mds/UNIQUE_COMBS.md?raw'

export const tooltips = {
	todo: fromMarkdownStr(TODO),
	sensitiveFile: fromMarkdownStr(SENSITIVE_FILE),
	resolution: fromMarkdownStr(RESOLUTION),
	recordLimit: fromMarkdownStr(RECORD_LIMIT),
	cacheSize: fromMarkdownStr(CACHE_SIZE),
	synthesisMode: fromMarkdownStr(SYNTHESIS_MODE),
	synthesize: fromMarkdownStr(SYNTHESIZE),
	analysisLength: fromMarkdownStr(ANALYSIS_LENGTH),
	evaluate: fromMarkdownStr(EVALUATE),
	sensitiveDataCharts: fromMarkdownStr(SENSITIVE_DATA_CHARTS),
	syntheticDataCharts: fromMarkdownStr(SYNTHETIC_DATA_CHARTS),
	recordsWithUniqueCombs: fromMarkdownStr(RECORDS_WITH_UNIQUE_COMBS),
	recordsWithRareCombs: fromMarkdownStr(RECORDS_WITH_RARE_COMBS),
	uniqueCombs: fromMarkdownStr(UNIQUE_COMBS),
	rareCombs: fromMarkdownStr(RARE_COMBS),
	recordExpansion: fromMarkdownStr(RECORD_EXPANSION),
	combinationLoss: fromMarkdownStr(COMBINATION_LOSS),
	navigate: fromMarkdownStr(NAVIGATE),
}
