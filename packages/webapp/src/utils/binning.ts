/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { CsvRecord } from 'sds-wasm'
import { calcPrecision, countDecimals } from './math'
import { stringToNumber } from './strings'

interface IBin {
	match: (value: string) => boolean
	representation: string
}

export enum BinOperationType {
	Equals = '==',
	Contains = 'contains',
	Greater = '>',
	GreaterEquals = '>=',
	Less = '<',
	LessEquals = '<=',
}

export enum BinOperationJoinCondition {
	Or = 'or',
	And = 'and',
}

export interface IBinOperation {
	rhsOperand: string
	type: BinOperationType
}

export interface ICustomBin {
	representation: string
	operations: IBinOperation[]
	joinCondition: BinOperationJoinCondition
}

export class InplaceBinning {
	private static operationsMap: {
		[type in BinOperationType]: (
			lhsOperand: string,
			rhsOperand: string,
		) => boolean
	} = {
		[BinOperationType.Equals]: (lhs, rhs) => {
			return lhs.toLowerCase().trim() === rhs.toLocaleLowerCase().trim()
		},
		[BinOperationType.Contains]: (lhs, rhs) => {
			return lhs.toLowerCase().includes(rhs.toLowerCase())
		},
		[BinOperationType.Greater]: (lhs, rhs) => {
			const numericLhs = stringToNumber(lhs)
			const numericRhs = stringToNumber(rhs)

			if (numericLhs !== null && numericRhs !== null) {
				return numericLhs > numericRhs
			}
			return false
		},
		[BinOperationType.GreaterEquals]: (lhs, rhs) => {
			const numericLhs = stringToNumber(lhs)
			const numericRhs = stringToNumber(rhs)

			if (numericLhs !== null && numericRhs !== null) {
				return numericLhs >= numericRhs
			}
			return false
		},
		[BinOperationType.Less]: (lhs, rhs) => {
			const numericLhs = stringToNumber(lhs)
			const numericRhs = stringToNumber(rhs)

			if (numericLhs !== null && numericRhs !== null) {
				return numericLhs < numericRhs
			}
			return false
		},
		[BinOperationType.LessEquals]: (lhs, rhs) => {
			const numericLhs = stringToNumber(lhs)
			const numericRhs = stringToNumber(rhs)

			if (numericLhs !== null && numericRhs !== null) {
				return numericLhs <= numericRhs
			}
			return false
		},
	}

	private _bins: IBin[]

	constructor() {
		this._bins = []
	}

	private addNumericBin(lowerBound?: number, upperBound?: number): void {
		if (upperBound !== undefined && lowerBound !== undefined) {
			this._bins.push({
				match: value => {
					const numericValue = stringToNumber(value)
					if (numericValue === null) {
						return false
					}
					return numericValue >= lowerBound && numericValue < upperBound
				},
				representation: `[${lowerBound}, ${upperBound})`,
			})
		} else if (upperBound !== undefined) {
			this._bins.push({
				match: value => {
					const numericValue = stringToNumber(value)
					if (numericValue === null) {
						return false
					}
					return numericValue >= upperBound
				},
				representation: `[${upperBound}, max]`,
			})
		} else if (lowerBound !== undefined) {
			this._bins.push({
				match: value => {
					const numericValue = stringToNumber(value)
					if (numericValue === null) {
						return false
					}
					return numericValue < lowerBound
				},
				representation: `[min, ${lowerBound})`,
			})
		}
	}

	customBins(bins: ICustomBin[]): InplaceBinning {
		this._bins = bins.map(customBin => ({
			match: value => {
				const opMatch = op =>
					InplaceBinning.operationsMap[op.type](value, op.rhsOperand)
				return customBin.joinCondition === BinOperationJoinCondition.Or
					? customBin.operations.some(opMatch)
					: customBin.operations.every(opMatch)
			},
			representation: customBin.representation,
		}))
		return this
	}

	fixedBinWidth(
		width: number,
		minValue: number,
		maxValue: number,
		exclusiveBinWidth = true,
	): InplaceBinning {
		const decimals = countDecimals(width)
		const precision = calcPrecision(decimals)
		let lowerBound = minValue
		let upperBound

		if (exclusiveBinWidth) {
			// let's represent like this:
			// width = 3 means an example bucket from [1, 4) -> [1,2,3] not [1, 5) -> [1,2,3,4]
			// so we subtract the precision
			width -= precision
		}

		this._bins = []

		this.addNumericBin(lowerBound, undefined)

		while (true) {
			upperBound = lowerBound + width

			if (upperBound < maxValue) {
				upperBound += precision
				if (precision < 1) {
					// fix floating point precision
					upperBound = upperBound.toFixed(decimals)
				}
				this.addNumericBin(lowerBound, upperBound)
				lowerBound = upperBound
			} else {
				upperBound = maxValue + precision
				this.addNumericBin(lowerBound, upperBound)
				lowerBound = upperBound
				break
			}
		}

		this.addNumericBin(undefined, upperBound)

		return this
	}

	fixedBinCount(
		count: number,
		minValue: number,
		maxValue: number,
	): InplaceBinning {
		// subtract 2 from count to account for the lower bound and upper bound bins
		return this.fixedBinWidth(
			(maxValue - minValue) / (count - 2),
			minValue,
			maxValue,
			false, // here we want the bin width to be inclusive
		)
	}

	run(data: CsvRecord[], columnIndex: number): InplaceBinning {
		data.forEach(row => {
			if (row[columnIndex]) {
				row[columnIndex] =
					this._bins.find(b => b.match(row[columnIndex]))?.representation ??
					row[columnIndex]
			}
		})
		return this
	}
}
