/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { memo, StrictMode } from 'react'
import { HashRouter } from 'react-router-dom'

import { FileDrop } from '~components/FileDrop'

import { ChartContext } from './ChartContext'
import { DataContext } from './DataContext'
import { FileUploader } from './FileUploader'
import { Layout } from './Layout'
import { Routes } from './Routes'
import { StyleContext } from './StyleContext'

export const App: React.FC = memo(function App() {
	return (
		<StrictMode>
			<DataContext>
				<HashRouter>
					<StyleContext>
						<ChartContext>
							<FileUploader>
								<Layout>
									<Routes />
								</Layout>
							</FileUploader>
						</ChartContext>
					</StyleContext>
				</HashRouter>
			</DataContext>
		</StrictMode>
	)
})
