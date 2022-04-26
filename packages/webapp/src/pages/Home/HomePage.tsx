/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import type { FC } from 'react'
import { memo } from 'react'

export const HomePage: FC = memo(function HomePage() {
	return <div>Hello</div>
})
HomePage.displayName = 'HomePage'
