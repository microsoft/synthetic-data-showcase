/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
module.exports = {
	root: true,
	extends: ['@essex/eslint-config/fast'],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		project: './tsconfig.json',
	},
	rules: {
		'@typescript-eslint/no-explicit-any': 'off',
		'no-redeclare': 'off',
		'@typescript-eslint/no-non-null-assertion': 'off',
		'@typescript-eslint/no-redeclare': ['warn'],
		'@typescript-eslint/explicit-module-boundary-types': [
			'warn',
			{ allowArgumentsExplicitlyTypedAsAny: true },
		],

		// TODO: Re-enable
		'jsx-a11y/click-events-have-key-events': 0,
		'jsx-a11y/no-static-element-interactions': 0,
		'@essex/extensions': [
			'error', [
				{
					files: ['**/*.{ts,tsx,js,jsx,mts,mjs}'],
					ignorePackages: true,
					relativeModulePrefixes: ['./', '~'],
					expectedExtensions: ['.js', '.mjs', '.cjs', '.jsx', '.css'],
					disallowedExtensions: [],
				}
			]
		]
	},
}
