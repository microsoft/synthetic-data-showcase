/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
export interface ICancelablePromise<T> {
	promise: Promise<T>
	cancel: () => void
}
