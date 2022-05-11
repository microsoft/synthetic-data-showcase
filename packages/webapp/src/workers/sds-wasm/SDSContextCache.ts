/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import type { WasmSdsContext } from 'sds-wasm'

import type { AllContextsParameters, IContextParameters } from '~models'

export interface ISDSContextCacheValue {
	context: WasmSdsContext,
	contextParameters: IContextParameters
}

export class SDSContextCache {
	// Map will keep elements with insertion order
	private _values: Map<string, ISDSContextCacheValue>

	constructor(private size: number) {
		this._values = new Map()
	}

	public values(): ISDSContextCacheValue[] {
		return Array.from(this._values.values())
	}

	public allContextParameters(): AllContextsParameters {
		return this.values().map(v => v.contextParameters)
	}

	public get(key: string): ISDSContextCacheValue | undefined {
		return this._values.get(key)
	}

	public getOrThrow(key: string): ISDSContextCacheValue {
		const value = this.get(key)

		if (!value) {
			throw new Error(`value for key "${key}" not found`)
		}
		return value
	}

	public set(key: string, value: ISDSContextCacheValue): ISDSContextCacheValue {
		if (!this._values.has(key) && this._values.size >= this.size) {
			const lastInserted = this._values.keys().next().value
			this.delete(lastInserted)
		}
		this._values.set(key, value)
		return value
	}

	public delete(key: string): boolean {
		const value = this._values.get(key)

		if (value) {
			value.context.free()
		}
		return this._values.delete(key)
	}

	public clear(): void {
		this._values.forEach(value => value.context.free())
		this._values.clear()
	}
}
