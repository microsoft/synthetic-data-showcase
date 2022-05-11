/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
export type AtomicBoolean = Uint8Array

export class AtomicBooleanView {
	private _atomicBoolean: AtomicBoolean

	static createRaw(): AtomicBoolean {
		return new Uint8Array(new SharedArrayBuffer(Int8Array.BYTES_PER_ELEMENT))
	}

	constructor(atomicBoolean: AtomicBoolean) {
		this._atomicBoolean = atomicBoolean
	}

	public get(): boolean {
		return Atomics.load(this._atomicBoolean, 0) === 1
	}

	public set(newValue: boolean): boolean {
		return (
			Atomics.store(this._atomicBoolean, 0, newValue === true ? 1 : 0) === 1
		)
	}

	public getRaw(): AtomicBoolean {
		return this._atomicBoolean
	}
}
