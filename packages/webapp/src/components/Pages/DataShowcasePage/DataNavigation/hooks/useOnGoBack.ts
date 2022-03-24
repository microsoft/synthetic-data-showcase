/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { useCallback } from 'react'
import type { SetterOrUpdater } from 'recoil'

import type { PipelineStep } from '~models'

export function useOnGoBack(
	setSelectedPipelineStep: SetterOrUpdater<string>,
	pipelineStep: PipelineStep,
): () => void {
	return useCallback(() => {
		setSelectedPipelineStep(pipelineStep)
	}, [setSelectedPipelineStep, pipelineStep])
}
