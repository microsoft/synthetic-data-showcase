/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import type { ISynthesisInfo } from './SynthesisInfo'

export type SynthesisCallback = (synthesisInfo: ISynthesisInfo) => Promise<void>

export interface ISdsManagerSynthesisCallbacks {
	started?: SynthesisCallback
	finished?: SynthesisCallback
	progressUpdated?: SynthesisCallback
	terminated?: SynthesisCallback
}
