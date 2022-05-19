/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { createContext } from 'react'

import type { FileDropContextType } from './FileDrop.types.js'

// eslint-disable-next-line
export const fileDropDefaultContext: FileDropContextType = () => {}

export const FileDropContext = createContext<FileDropContextType>(
	fileDropDefaultContext,
)
