/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { visibleColumnsCommand } from '@data-wrangling-components/react'
import { ICommandBarItemProps } from '@fluentui/react'
import { useCallback, useMemo } from 'react'
import { SetterOrUpdater } from 'recoil'
import { useOnUseColumnCheckToggle, useVisibleColumnNames } from '..'
import { ICsvContent } from '~models'

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
			),
		[content, visibleColumns, handleCheckChangeByName],
	)
}
