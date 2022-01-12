/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { downloadCommand } from '@data-wrangling-components/react'
import { ICommandBarItemProps } from '@fluentui/react'
import ColumnTable from 'arquero/dist/types/table/column-table'
import { useMemo } from 'react'

export function useSensitiveTableCommands(
	table: ColumnTable,
): ICommandBarItemProps[] {
	return useMemo(() => [downloadCommand(table, 'sensitive_data.csv')], [table])
}
