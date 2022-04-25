/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import type { FC } from 'react'
import { memo } from 'react'

import { ErrorMessageBar } from '~components/ErrorMessageBar'
import { useGlobalErrorMessage } from '~states'

export const ErrorBar: FC = memo(function ErrorBar() {
	const [globalError, setGlobalError] = useGlobalErrorMessage()
	return (
		<ErrorMessageBar
			message={globalError}
			onDismiss={() => setGlobalError(undefined)}
		/>
	)
})
ErrorBar.displayName = 'ErrorBar'
