/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { MessageBar, MessageBarType } from '@fluentui/react'
import type { FC } from 'react'
import { memo } from 'react'

import { useFileUploadErrorMessage } from '~states'

export const FileUploadErrorBar: FC = memo(function FileUploadErrorBar() {
	const [fileUploadErrorMessage, setFileUploadErrorMessage] =
		useFileUploadErrorMessage()

	if (!fileUploadErrorMessage) {
		return null
	}

	return (
		<MessageBar
			messageBarType={MessageBarType.severeWarning}
			truncated={true}
			onDismiss={() => setFileUploadErrorMessage(undefined)}
			dismissButtonAriaLabel="Close"
		>
			{' '}
			{fileUploadErrorMessage}{' '}
		</MessageBar>
	)
})
