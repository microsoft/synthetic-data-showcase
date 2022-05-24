/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import type { Remote } from 'comlink'

import type { AtomicView, IWorkerProxy } from '~workers/utils'
import type { WasmSynthesizer } from '~workers/WasmSynthesizer'

import type { ISynthesisInfo } from './SynthesisInfo.js'

export interface IWasmSynthesizerWorkerInfo {
	synthesisInfo: ISynthesisInfo
	synthesizerWorkerProxy: IWorkerProxy<typeof WasmSynthesizer>
	synthesizer: Remote<WasmSynthesizer>
	shouldRun: AtomicView
}
