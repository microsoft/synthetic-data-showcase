/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vitejs.dev/config/

// export default defineConfig(essexViteConfig)
export default defineConfig(({ command, mode }) => {
	return {
		build: {
			target: 'es2020',
			sourcemap: true,
			rollupOptions: {
				input: {
					main: './index.html',
				},
			},
		},
		plugins: [tsconfigPaths(), react()],
	}
})
