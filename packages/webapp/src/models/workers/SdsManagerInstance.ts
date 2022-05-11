/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import type { Remote } from 'comlink'

import type { SdsManager } from '~workers/SdsManager'
import type { IWorkerProxy } from '~workers/utils'

export interface ISdsManagerInstance {
	instance: Remote<SdsManager>
	workerProxy: IWorkerProxy<typeof SdsManager>
}
