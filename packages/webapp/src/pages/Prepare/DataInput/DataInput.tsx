/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { PrepareDataFull } from '@data-wrangling-components/react'
import type { IStackStyles, IStackTokens } from '@fluentui/react'
import { getTheme, Icon, Stack } from '@fluentui/react'
import { useFileDropOpen } from '@sds/components'
import { memo } from 'react'
import styled from 'styled-components'

import { InfoTooltip } from '~components/InfoTooltip'
import { useSelectedTable, useSteps, useTables } from '~states'
import { tooltips } from '~ui-tooltips'

export const DataInput: React.FC = memo(function DataInput() {
	const theme = getTheme()
	const open = useFileDropOpen()
	const [tables] = useTables()
	const [steps, setSteps] = useSteps()
	const [, updateSelectedTable] = useSelectedTable()

	const mainStackStyles: IStackStyles = {
		root: {
			display: 'flex',
			marginTop: theme.spacing.s2,
			marginLeft: theme.spacing.l1,
			marginRight: theme.spacing.l1,
		},
	}

	const mainStackTokens: IStackTokens = {
		childrenGap: theme.spacing.s1,
	}

	const subStackTokens: IStackTokens = {
		childrenGap: theme.spacing.s1,
	}

	return (
		<Stack styles={mainStackStyles} tokens={mainStackTokens}>
			<Stack.Item>
				<Stack tokens={subStackTokens} horizontal>
					<Stack.Item align="center">
						<StyledOpen onClick={open}>
							<Icon iconName="OpenFolderHorizontal" /> Open sensitive data file
						</StyledOpen>
					</Stack.Item>
					<Stack.Item align="center">
						<InfoTooltip>{tooltips.sensitiveFile}</InfoTooltip>
					</Stack.Item>
				</Stack>
			</Stack.Item>
			<Stack.Item>
				{!!tables.length && (
					<div style={{ height: '100vh' }}>
						<PrepareDataFull
							tables={tables}
							steps={steps}
							onUpdateSteps={setSteps}
							onOutputTable={updateSelectedTable}
							stepsPosition="middle"
						/>
					</div>
				)}
			</Stack.Item>
		</Stack>
	)
})

const StyledOpen = styled.span`
	color: ${p => p.theme.palette.accent};
	&:hover {
		cursor: pointer;
	}
`
