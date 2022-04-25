/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { memo, StrictMode } from 'react'
import { HashRouter } from 'react-router-dom'

import {
	ChartContext,
	DataContext,
	FileUploader,
	StyleContext,
} from './contexts'
import { Routes } from './Layout/Routes'

export const App: React.FC = memo(function App() {
	return (
		<StrictMode>
			<DataContext>
				<HashRouter>
					<StyleContext>
						<ChartContext>
							<FileUploader>
								<Routes />
							</FileUploader>
						</ChartContext>
					</StyleContext>
				</HashRouter>
			</DataContext>
		</StrictMode>
	)
})
