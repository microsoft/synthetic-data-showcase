/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import type { FC } from 'react'
import { memo } from 'react'
import { Navigate } from 'react-router-dom'

import { Pages } from '~pages'

export const HomePage: FC = memo(function HomePage() {
	return <Navigate to={Pages.Prepare.path} />
})
HomePage.displayName = 'HomePage'
