/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

export type Expand<T> = T extends infer O ? { [K in keyof O]: O[K] } : never

// expands object types recursively
export type ExpandRecursively<T> = T extends object
	? T extends infer O
		? { [K in keyof O]: ExpandRecursively<O[K]> }
		: never
	: T

export type ExpandWithFunctions<T> = T extends (...args: infer A) => infer R
	? (...args: Expand<A>) => Expand<R>
	: T extends infer O
	? { [K in keyof O]: O[K] }
	: never

export type ExpandRecursivelyWithFunctions<T> = T extends (
	...args: infer A
) => infer R
	? (...args: ExpandRecursively<A>) => ExpandRecursively<R>
	: T extends object
	? T extends infer O
		? { [K in keyof O]: ExpandRecursively<O[K]> }
		: never
	: T
