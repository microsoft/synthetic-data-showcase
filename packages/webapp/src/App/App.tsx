/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { memo, StrictMode } from 'react'
import { HashRouter } from 'react-router-dom'

import { CookieConsentBanner } from '../components/CookieConsent/CookieConsentBanner.js'
import {
	ChartContext,
	DataContext,
	FileUploader,
	StyleContext,
} from './contexts/index.js'
import { Routes } from './Layout/Routes.js'

export const App: React.FC = memo(function App() {
	return (
		<StrictMode>
			<CookieConsentBanner />
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
