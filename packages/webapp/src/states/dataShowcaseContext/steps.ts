/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import type { Step } from '@data-wrangling-components/core'
import type { SetterOrUpdater } from 'recoil'
import { atom, useRecoilState } from 'recoil'

const stepsState = atom<Step[]>({
	key: 'steps',
	default: [],
})

export function useSteps(): [Step[], SetterOrUpdater<Step[]>] {
	return useRecoilState(stepsState)
}
