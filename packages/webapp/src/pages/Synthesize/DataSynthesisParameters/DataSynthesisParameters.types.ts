/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import type { ICsvContent, IRawSynthesisParameters } from '~models'

export interface DataSynthesisParametersProps {
	enableRun: boolean
	sensitiveCsvContent: ICsvContent
	onRun: (rawParameters: IRawSynthesisParameters) => Promise<void>
}
