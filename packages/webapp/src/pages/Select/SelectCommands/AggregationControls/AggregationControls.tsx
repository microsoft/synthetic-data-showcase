/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { Position, SpinButton } from '@fluentui/react'
import { FlexContainer } from '@sds/components'
import type { FC } from 'react'
import { memo } from 'react'
import styled from 'styled-components'

import {
	useRawSynthesisParameters,
	useRawSynthesisParametersPropertySetter,
} from '../../../../states/rawSynthesisParameters.js'
import { useSpinButtonOnChange } from '../../../hooks/index.js'

export const AggregationControls: FC = memo(function SelectCommand() {
	const [rawSynthesisParams] = useRawSynthesisParameters()
	const handleResolutionChange = useSpinButtonOnChange(
		useRawSynthesisParametersPropertySetter('resolution'),
	)
	const handleReportingLengthChange = useSpinButtonOnChange(
		useRawSynthesisParametersPropertySetter('reportingLength'),
	)

	return (
		<FlexContainer align="center">
			<Action>Privacy Resolution</Action>
			<StyledSpinButton
				labelPosition={Position.top}
				min={1}
				step={1}
				value={rawSynthesisParams.resolution.toString()}
				onChange={handleResolutionChange}
			/>
			<Action>Aggregation limit</Action>
			<StyledSpinButton
				labelPosition={Position.top}
				min={1}
				step={1}
				value={rawSynthesisParams.reportingLength.toString()}
				onChange={handleReportingLengthChange}
			/>
		</FlexContainer>
	)
})
AggregationControls.displayName = 'AggregationControls'

export const StyledSpinButton = styled(SpinButton)`
	width: 60px;
`

const Action = styled.span`
	font-size: ${p => p.theme.fonts.mediumPlus.fontSize};
	letter-spacing: 1.25px;
	padding: ${p => p.theme.spacing.m};
	color: ${p => p.theme.palette.themePrimary};
`
