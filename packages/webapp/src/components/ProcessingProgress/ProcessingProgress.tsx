/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import type { IStackTokens } from '@fluentui/react'
import { ProgressIndicator, Stack, useTheme } from '@fluentui/react'
import { memo } from 'react'

import { useIsProcessingValue, useProcessingProgressValue } from '~states'

export const ProcessingProgress: React.FC = memo(function ProcessingProgress() {
	const isProcessing = useIsProcessingValue()
	const processingProgress = useProcessingProgressValue()
	const theme = useTheme()

	const stackTokens: IStackTokens = {
		childrenGap: theme.spacing.s2,
	}

	const styles = {
		root: {
			textAlign: 'end',
			width: 400,
			fontWeight: 'bold',
		},
		itemName: {
			color: theme.palette.neutralLight,
		},
		progressBar: {
			background: theme.palette.themeDarker,
		},
	}

	if (!isProcessing) {
		return <></>
	}

	return (
		<Stack tokens={stackTokens} horizontal verticalAlign="end">
			<ProgressIndicator
				label={`${processingProgress.toFixed(2)} %`}
				percentComplete={processingProgress / 100.0}
				styles={styles}
			/>
		</Stack>
	)
})
