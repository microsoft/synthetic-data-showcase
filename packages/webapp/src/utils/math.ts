/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
export interface IMinMax {
	minValue?: number
	maxValue?: number
}

export function roundDown(
	value: number,
	multipleOf: number,
	fractionDigits?: number,
): number {
	const n = Math.floor(value / multipleOf) * multipleOf
	return fractionDigits ? +n.toFixed(n) : n
}

export function roundUp(
	value: number,
	multipleOf: number,
	fractionDigits?: number,
): number {
	const n = Math.ceil(value / multipleOf) * multipleOf
	return fractionDigits ? +n.toFixed(n) : n
}

export function countDecimals(value: number): number {
	return value.toString().split('.')[1]?.length || 0
}

export function calcPrecision(decimals: number): number {
	return decimals === 0 ? 1 : +`0.${'0'.repeat(decimals - 1)}1`
}

export function findMinMax(values: number[]): IMinMax {
	let minValue = values[0]
	let maxValue = values[0]

	for (let i = 1; i < values.length; ++i) {
		minValue = Math.min(minValue, values[i])
		maxValue = Math.max(maxValue, values[i])
	}
	return { minValue, maxValue }
}
