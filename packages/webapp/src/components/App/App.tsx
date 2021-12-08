/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import { memo } from 'react'
import { HashRouter } from 'react-router-dom'
import { ChartContext } from './ChartContext'
import { DataContext } from './DataContext'
import { Layout } from './Layout'
import { Routes } from './Routes'
import { StyleContext } from './StyleContext'

export const App: React.FC = memo(function App() {
	return (
		<DataContext>
			<HashRouter>
				<StyleContext>
					<ChartContext>
						<Layout>
							<Routes />
						</Layout>
					</ChartContext>
				</StyleContext>
			</HashRouter>
		</DataContext>
	)
})
