/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
export type CsvRecord = string[]

export interface ICsvTableHeader {
	name: string
	fieldName: string
	use: boolean
	hasSensitiveZeros: boolean
}

export interface ICsvContent {
	headers: ICsvTableHeader[]
	items: CsvRecord[]
	columnsWithZeros?: number[]
	delimiter: string
}

export const defaultCsvContent: ICsvContent = {
	headers: [],
	items: [],
	columnsWithZeros: undefined,
	delimiter: ',',
}
