/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { ThemeProvider as FluentProvider } from '@fluentui/react'
import { loadFluentTheme } from '@thematic/fluent'
import {
	ApplicationStyles,
	useThematic,
	ThematicProvider,
} from '@thematic/react'
import React, { memo, useMemo } from 'react'
import {
	createGlobalStyle,
	ThemeProvider as StyledProvider,
} from 'styled-components'

export const StyleContext: React.FC = memo(function StyleContext({ children }) {
	const theme = useThematic()

	const fluentTheme = useMemo(() => {
		const base = loadFluentTheme(theme).toFluent()
		// TODO: the fluent theme generator used by thematic
		// produces low contrast secondary text. this appears to be
		// a bug in fluent, but needs addressed by thematic
		const mid = theme.application().midContrast().hex()
		base.palette.neutralSecondary = mid
		base.semanticColors.bodySubtext = mid
		return base
	}, [theme])

	return (
		<>
			{/* core thematic for charting colors and imperative use */}
			<ThematicProvider theme={theme}>
				{/* modified fluent theme that matches thematic for the application controls */}
				<FluentProvider theme={fluentTheme}>
					<GlobalStyle />
					<ApplicationStyles />
					{/* styled-components theme - now only used for fluent spacing values */}
					<StyledProvider theme={fluentTheme}>{children}</StyledProvider>
				</FluentProvider>
			</ThematicProvider>
		</>
	)
})

const GlobalStyle = createGlobalStyle`
	body {
		height: 100vh;
		margin: 0;
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
			'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
			sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}

	code {
		font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
			monospace;
	}
`
