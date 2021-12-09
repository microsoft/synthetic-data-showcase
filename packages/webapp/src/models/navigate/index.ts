/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
export type AttributeRows = number[]

export interface IAttributeRowsMap {
	[columnIndex: number]: {
		[attr: string]: AttributeRows
	}
}

export type AttributesInColumn = Set<string>

export interface IAttributesInColumnsMap {
	[columnIndex: number]: AttributesInColumn
}

export interface INavigateResult {
	attrRowsMap: IAttributeRowsMap
	attrsInColumnsMap: IAttributesInColumnsMap
	allRows: AttributeRows
}

export interface ISelectedAttributes {
	[columnIndex: number]: string | undefined
}

export interface IAttributesIntersectionValue {
	value: string
	estimatedCount: number
	actualCount?: number
}

export const defaultNavigateResult = {
	attrRowsMap: {},
	attrsInColumnsMap: {},
	allRows: [],
}
