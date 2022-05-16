/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { memo, useCallback } from 'react'

import {
	useAllSynthesisInfo,
	useSdsManagerInstance,
	useSelectedSynthesisInfo,
} from '~states'

import { AllSynthesisInfo } from './AllSynthesisInfo'

export const StatefulAllSynthesisInfo: React.FC = memo(
	function StatefulAllSynthesisInfo() {
		const [manager] = useSdsManagerInstance()
		const [allSynthesisInfo] = useAllSynthesisInfo()
		const [selectedSynthesis, setSelectedSynthesis] = useSelectedSynthesisInfo()
		const onSelected = useCallback(
			newSelection => {
				setSelectedSynthesis(newSelection)
			},
			[setSelectedSynthesis],
		)
		const onDelete = useCallback(
			async selection => {
				await manager?.instance.terminateSynthesizer(selection.key)
				setSelectedSynthesis(null)
			},
			[manager, setSelectedSynthesis],
		)

		return (
			<AllSynthesisInfo
				allSynthesisInfo={allSynthesisInfo}
				selectedSynthesisInfo={selectedSynthesis}
				onSelected={onSelected}
				onDelete={onDelete}
			/>
		)
	},
)
