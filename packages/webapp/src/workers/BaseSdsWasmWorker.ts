/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import init, { init_logger, WasmSdsContext } from 'sds-wasm'

export class BaseSdsWasmWorker {
	private _context: WasmSdsContext | null
	protected _name: string

	constructor(name: string) {
		this._context = null
		this._name = name
	}

	public async init(wasmPath: string, logLevel: string): Promise<void> {
		await init(wasmPath)
		init_logger(logLevel)
		this._context = new WasmSdsContext()
	}

	public async terminate(): Promise<void> {
		this._context?.free()
	}

	protected getContext(): WasmSdsContext {
		if (this._context === null) {
			throw new Error(
				`"${this._name}" worker has not been properly initialized, did you call init?`,
			)
		}
		return this._context
	}
}
