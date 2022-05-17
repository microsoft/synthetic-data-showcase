/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import type { ProxyMarked } from 'comlink'

export type Proxy<T> = T & ProxyMarked
