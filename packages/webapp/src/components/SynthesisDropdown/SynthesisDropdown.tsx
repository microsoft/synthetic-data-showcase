/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { Dropdown } from '@fluentui/react'
import { memo } from 'react'

import {
	useAllSynthesisOptions,
	useSynthesisDropdownOnChange,
} from './SynthesisDropdown.hooks.js'
import type { SynthesisDropdownProps } from './SynthesisDropdown.types.js'

export const SynthesisDropdown: React.FC<SynthesisDropdownProps> = memo(
	function SynthesisDropdown({
		allSynthesisInfo,
		selectedSynthesis,
		onChange,
		disabled,
	}: SynthesisDropdownProps) {
		const allSynthesisOptions = useAllSynthesisOptions(allSynthesisInfo)
		const handleOnChange = useSynthesisDropdownOnChange(
			allSynthesisInfo,
			onChange,
		)

		return (
			<Dropdown
				selectedKey={selectedSynthesis?.key}
				onChange={handleOnChange}
				placeholder="Select"
				options={allSynthesisOptions}
				disabled={disabled}
				styles={{
					dropdownOptionText: { overflow: 'visible', whiteSpace: 'normal' },
					dropdownItem: { height: 'auto' },
				}}
			/>
		)
	},
)
