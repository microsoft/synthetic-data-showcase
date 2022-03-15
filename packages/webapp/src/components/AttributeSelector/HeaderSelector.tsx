/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import type { IStackTokens } from '@fluentui/react'
import { Checkbox, Stack, useTheme } from '@fluentui/react'
import { memo } from 'react'
import type { HeaderNames } from 'sds-wasm'

export interface HeaderSelectorProps {
	headers: HeaderNames
	selectedHeaders: boolean[]
	onToggle: (columnIndex: number) => void
}

export const HeaderSelector: React.FC<HeaderSelectorProps> = memo(
	function HeaderSelector({
		headers,
		selectedHeaders,
		onToggle,
	}: HeaderSelectorProps) {
		const theme = useTheme()

		const stackTokens: IStackTokens = {
			childrenGap: theme.spacing.s1,
		}

		return (
			<Stack tokens={stackTokens}>
				{headers.map((h, i) => (
					<Checkbox
						key={h}
						label={h}
						checked={selectedHeaders[i] ?? false}
						onChange={() => onToggle(i)}
					/>
				))}
			</Stack>
		)
	},
)
