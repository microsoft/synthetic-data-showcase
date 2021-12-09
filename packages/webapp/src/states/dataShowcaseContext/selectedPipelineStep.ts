/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import {
	atom,
	SetterOrUpdater,
	useRecoilState,
	useRecoilValue,
	useSetRecoilState,
} from 'recoil'
import { PipelineStep } from '~models'

const state = atom<string>({
	key: 'selected-pipeline-step',
	default: PipelineStep.Prepare,
})

export function useSelectedPipelineStep(): [string, SetterOrUpdater<string>] {
	return useRecoilState(state)
}

export function useSelectedPipelineStepValue(): string {
	return useRecoilValue(state)
}

export function useSelectedPipelineStepSetter(): SetterOrUpdater<string> {
	return useSetRecoilState(state)
}
