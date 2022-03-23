/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { initializeIcons } from '@fluentui/font-icons-mdl2'
import { render } from 'react-dom'

import { App } from './components'

initializeIcons()

async function mount(): Promise<void> {
	try {
		const root = document.createElement('div')

		document.body.appendChild(root)
		render(<App />, root)
	} catch (err) {
		console.error('error rendering application', err)
	}
}
mount()
