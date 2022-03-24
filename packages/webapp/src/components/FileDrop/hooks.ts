/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { useContext } from 'react'

import { FileDropContext } from './context'
import type { FileDropContextType } from './types'

export function useFileDropOpen(): FileDropContextType {
	return useContext(FileDropContext)
}
