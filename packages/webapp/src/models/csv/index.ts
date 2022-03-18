/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import type { TableMetadata } from '@data-wrangling-components/core'
import { table } from 'arquero'
import type ColumnTable from 'arquero/dist/types/table/column-table'

import type { SynthesisParameters } from '~models'

export const defaultSubjectID = 'RowID'

export interface ICsvTableHeader {
	name: string
	fieldName: string
	use: boolean
	hasSensitiveZeros: boolean
}

export interface ICsvContent {
	headers: ICsvTableHeader[]
	columnsWithZeros?: number[]
	delimiter: string
	table: ColumnTable
	synthesisParameters?: SynthesisParameters
	metadata?: TableMetadata
	subjectId?: string
}

export const defaultCsvContent: ICsvContent = {
	headers: [],
	columnsWithZeros: undefined,
	delimiter: ',',
	table: table({}),
	synthesisParameters: undefined,
	subjectId: defaultSubjectID,
}
