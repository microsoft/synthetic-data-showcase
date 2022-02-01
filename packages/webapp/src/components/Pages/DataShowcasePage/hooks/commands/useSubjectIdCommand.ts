/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { checkedItemsCommand } from '@data-wrangling-components/react'
import { ICommandBarItemProps } from '@fluentui/react'
import { useCallback, useMemo } from 'react'
import { SetterOrUpdater } from 'recoil'
import { ICsvContent } from '~models'

export function useSubjectIdCommand(
	content: ICsvContent,
	setter: SetterOrUpdater<ICsvContent>,
): ICommandBarItemProps {
	const selectedId = content.subjectId
	const columns = useMemo(() => content.table.columnNames(), [content.table])

	const handleSelectedIdChange = useCallback(
		(name: string) => {
			setter(previous => ({
				...previous,
				subjectId: previous.subjectId === name ? undefined : name,
			}))
		},
		[setter],
	)

	return useMemo(
		() =>
			checkedItemsCommand(
				columns,
				selectedId ? [selectedId] : [],
				handleSelectedIdChange,
				{
					key: 'subject-id',
					text: 'Subject ID',
				},
			),
		[columns, selectedId, handleSelectedIdChange],
	)
}
