/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { Dropdown } from '@fluentui/react'
import { memo } from 'react'

import type { AllContextsParameters, IContextParameters } from '~models'

import {
	useAllContextsParametersOptions,
	useContextsDropdownOnChange,
} from './hooks'

export type OnContextSelectedCallback = (
	contextParameters: IContextParameters,
) => void

export interface ContextsDropdownProps {
	allContextsParameters: AllContextsParameters
	selectedContextParameters?: IContextParameters
	onContextSelected?: OnContextSelectedCallback
	disabled?: boolean
}

export const ContextsDropdown: React.FC<ContextsDropdownProps> = memo(
	function ContextsDropdown({
		allContextsParameters,
		selectedContextParameters,
		onContextSelected,
		disabled,
	}: ContextsDropdownProps) {
		const allContextsParametersOptions = useAllContextsParametersOptions(
			allContextsParameters,
		)
		const handleContextsParametersChange = useContextsDropdownOnChange(
			allContextsParameters,
			onContextSelected,
		)

		return (
			<Dropdown
				selectedKey={selectedContextParameters?.key}
				onChange={handleContextsParametersChange}
				placeholder="Select synthetic data"
				options={allContextsParametersOptions}
				disabled={disabled}
			/>
		)
	},
)
