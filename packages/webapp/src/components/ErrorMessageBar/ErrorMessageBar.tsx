/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { MessageBar, MessageBarType } from '@fluentui/react'
import type { FC } from 'react'
import { memo } from 'react'

export interface ErrorMessageBarProps {
	message?: string
	onDismiss?: () => void | Promise<void>
}
export const ErrorMessageBar: FC<ErrorMessageBarProps> = memo(
	function ErrorMessageBar({ message, onDismiss }) {
		return (
			<>
				{message !== undefined && (
					<MessageBar
						messageBarType={MessageBarType.severeWarning}
						truncated={true}
						onDismiss={onDismiss}
						dismissButtonAriaLabel="Close"
					>
						{' '}
						{message}{' '}
					</MessageBar>
				)}
			</>
		)
	},
)
