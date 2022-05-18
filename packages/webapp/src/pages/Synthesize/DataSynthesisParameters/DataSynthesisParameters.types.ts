/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import type { ICsvContent } from '~models'

import type { IRawSynthesisParameters } from '../Synthesize.types'

export interface DataSynthesisParametersProps {
	enableRun: boolean
	sensitiveCsvContent: ICsvContent
	onRun: (rawParameters: IRawSynthesisParameters) => Promise<void>
}
