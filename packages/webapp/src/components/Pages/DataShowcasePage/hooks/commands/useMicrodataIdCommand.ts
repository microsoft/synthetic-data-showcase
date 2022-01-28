/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { checkedItemsCommand } from '@data-wrangling-components/react'
import { ICommandBarItemProps } from '@fluentui/react'
import { useCallback, useMemo } from 'react'
import { SetterOrUpdater } from 'recoil'
import { ICsvContent } from '~models'

export function useMicrodataIdCommand(
	content: ICsvContent,
	setter: SetterOrUpdater<ICsvContent>,
): ICommandBarItemProps {
	const selectedId = content.microdataId
	const columns = useMemo(() => content.table.columnNames(), [content.table])

	const handleSelectedIdChange = useCallback(
		(name: string) => {
			setter(previous => ({
				...previous,
				microdataId: previous.microdataId === name ? undefined : name,
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
					key: 'microdata-id',
					text: 'Microdata ID',
				},
			),
		[columns, selectedId, handleSelectedIdChange],
	)
}
