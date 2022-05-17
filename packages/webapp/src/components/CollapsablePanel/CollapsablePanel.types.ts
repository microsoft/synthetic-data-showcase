/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import type React from 'react'

export interface CollapsablePanelProps {
	header: React.ReactNode
	children: React.ReactNode
	defaultCollapsed?: boolean
}
