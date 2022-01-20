/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import {
	Step,
	runPipeline,
	InputColumnArgs,
	OutputColumnArgs,
} from '@data-wrangling-components/core'
import ColumnTable from 'arquero/dist/types/table/column-table'
import { useCallback } from 'react'
import { ICsvContent } from '~models'

// TODO: this would be convenient as a dwc export
interface ColumnTransformArgs extends InputColumnArgs, OutputColumnArgs {}
/**
 * Handles a request to execute a column transform step against the table.
 * This step can be created anywhere, but is managed by the ColumnTransformModal.
 * @param sensitiveContent
 * @param updateTable
 * @returns
 */
export function useOnTransformColumn(
	sensitiveContent: ICsvContent,
	updateTable: (table: ColumnTable) => void,
): (step: Step) => void {
	return useCallback(
		async step => {
			const { table } = sensitiveContent
			if (table && step) {
				const args = step.args as ColumnTransformArgs
				const inplace = {
					...step,
					args: {
						...args,
						to: args.column,
					},
				}
				const output = await runPipeline(table, [inplace])
				updateTable(output)
			}
		},
		[sensitiveContent, updateTable],
	)
}
