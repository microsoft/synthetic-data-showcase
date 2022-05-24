/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { visibleColumnsCommand } from '@essex/arquero-react'
import type { ICommandBarItemProps } from '@fluentui/react'
import { useCallback, useMemo } from 'react'
import type { SetterOrUpdater } from 'recoil'

import type { ICsvContent } from '~models'

import { useOnUseColumnCheckToggle } from './useOnUseColumnCheckToggle.js'
import { useVisibleColumnNames } from './useVisibleColumnNames.js'

export function useVisibleColumnsCommand(
	content: ICsvContent,
	setter: SetterOrUpdater<ICsvContent>,
): ICommandBarItemProps {
	const visibleColumns = useVisibleColumnNames(content)

	const handleToggle = useOnUseColumnCheckToggle(setter)

	// TEMP: map the name-based visible column change to index
	const handleCheckChangeByName = useCallback(
		name => {
			const columns = content.table.columnNames()
			const index = columns.findIndex(n => n === name)
			handleToggle && handleToggle(index)
		},
		[content, handleToggle],
	)

	return useMemo(
		() =>
			visibleColumnsCommand(
				content.table,
				visibleColumns,
				handleCheckChangeByName,
				{
					key: 'use-columns',
					text: 'Use columns',
				},
			),
		[content, visibleColumns, handleCheckChangeByName],
	)
}
