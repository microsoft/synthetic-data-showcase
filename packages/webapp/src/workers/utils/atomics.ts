/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
export type SupportedAtomicValues = boolean | number

export type AtomicBuffer = Int32Array

export class AtomicView {
	private _buffer: AtomicBuffer

	static createBuffer(value: SupportedAtomicValues): AtomicBuffer {
		const typeOfValue = typeof value
		const buffer = new Int32Array(
			new SharedArrayBuffer(Int32Array.BYTES_PER_ELEMENT),
		)
		let valueToStore

		if (typeOfValue === 'boolean') {
			valueToStore = value === true ? 1 : 0
		} else if (typeOfValue === 'number') {
			valueToStore = value
		} else {
			throw new Error(`unsupported atomic value "${typeOfValue}"`)
		}
		Atomics.store(buffer, 0, valueToStore)
		return buffer
	}

	constructor(buffer: AtomicBuffer) {
		this._buffer = buffer
	}

	public getBoolean(): boolean {
		return Atomics.load(this._buffer, 0) === 1
	}

	public getNumber(): number {
		return Atomics.load(this._buffer, 0)
	}

	public set(newValue: SupportedAtomicValues): SupportedAtomicValues {
		const typeOfValue = typeof newValue

		if (typeOfValue === 'boolean') {
			return Atomics.store(this._buffer, 0, newValue === true ? 1 : 0) === 1
		} else if (typeOfValue === 'number') {
			return Atomics.store(this._buffer, 0, newValue as number)
		} else {
			throw new Error(`unsupported atomic value "${typeOfValue}"`)
		}
	}

	public getBuffer(): AtomicBuffer {
		return this._buffer
	}
}
