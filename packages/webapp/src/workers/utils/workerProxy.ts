/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import type { Remote } from 'comlink'
import { releaseProxy, wrap } from 'comlink'

export interface IWorkerProxy<T> {
	ProxyConstructor: Remote<T>
	terminate: () => void
}

export function createWorkerProxy<T>(worker: Worker): IWorkerProxy<T> {
	const ProxyConstructor = wrap<T>(worker)
	const terminate = () => {
		ProxyConstructor[releaseProxy]()
		worker.terminate()
	}
	return { ProxyConstructor, terminate }
}
