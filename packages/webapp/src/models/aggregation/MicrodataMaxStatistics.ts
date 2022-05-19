/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import type { IMicrodataStatistics } from 'sds-wasm'

export type IMicrodataMaxStatistics = Partial<{
	[k in keyof IMicrodataStatistics]: number
}>
