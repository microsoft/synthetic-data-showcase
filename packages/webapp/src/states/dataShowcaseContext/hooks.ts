/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { useCallback } from 'react'

import { useResetSensitiveContent } from '~states'

import { useResetAllSynthesisInfo } from './allSynthesisInfo.js'
import { useSdsManagerInstance } from './sdsManagerInstance.js'
import { useResetSelectedSynthesisInfo } from './selectedSynthesisInfo.js'

export type DataClearer = () => Promise<void>

export function useClearSensitiveData(): DataClearer {
	const resetSensitiveContent = useResetSensitiveContent()

	return useCallback(async () => {
		resetSensitiveContent()
	}, [resetSensitiveContent])
}

export function useClearContexts(): DataClearer {
	const [manager] = useSdsManagerInstance()
	const resetAllSynthesisInfo = useResetAllSynthesisInfo()
	const resetSelectedSynthesisInfo = useResetSelectedSynthesisInfo()

	return useCallback(async () => {
		await manager?.instance?.terminateAllSynthesizers()
		resetAllSynthesisInfo()
		resetSelectedSynthesisInfo()
	}, [manager, resetAllSynthesisInfo, resetSelectedSynthesisInfo])
}
