/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import {
	IconButton,
	Panel,
	Position,
	PrimaryButton,
	useTheme,
} from '@fluentui/react'
import { useBoolean } from '@fluentui/react-hooks'
import { memo, useEffect } from 'react'

import { Flex } from '~components/Flexbox'
import { InfoTooltip } from '~components/InfoTooltip'
import { TooltipWrapper } from '~components/TooltipWrapper'
import { useDropdownOnChange, useSpinButtonOnChange } from '~pages/hooks'
import {
	useRawSynthesisParameters,
	useRawSynthesisParametersPropertySetter,
} from '~states'
import { tooltips } from '~ui-tooltips'
import { SynthesisMode } from '~workers/types'

import { DataSynthesisAdvancedParameters } from './DataSynthesisAdvancedParameters'
import {
	useSynthesisModeOptions,
	useUpdateNoisyCountThreshold,
} from './DataSynthesisParameters.hooks'
import {
	StyledDropdown,
	StyledSpinButton,
} from './DataSynthesisParameters.styles'
import type { DataSynthesisParametersProps } from './DataSynthesisParameters.types'

export const DataSynthesisParameters: React.FC<DataSynthesisParametersProps> =
	memo(function DataSynthesisParameter({
		enableRun,
		sensitiveCsvContent,
		onRun,
	}) {
		const theme = useTheme()
		const [rawSynthesisParams] = useRawSynthesisParameters()
		const [
			isAdvancedParametersOpen,
			{ setTrue: openAdvancedParameter, setFalse: dismissAdvancedParameter },
		] = useBoolean(false)

		const synthesisModeOptions = useSynthesisModeOptions()

		const handleSynthesisModeChange = useDropdownOnChange<SynthesisMode>(
			useRawSynthesisParametersPropertySetter('synthesisMode'),
		)
		const handleResolutionChange = useSpinButtonOnChange(
			useRawSynthesisParametersPropertySetter('resolution'),
		)
		const handleRecordLimitChange = useSpinButtonOnChange(
			useRawSynthesisParametersPropertySetter('recordLimit'),
		)
		const handleReportingLengthChange = useSpinButtonOnChange(
			useRawSynthesisParametersPropertySetter('reportingLength'),
		)
		const handleNoiseEpsilonChange = useSpinButtonOnChange(
			useRawSynthesisParametersPropertySetter('noiseEpsilon'),
		)
		const handleNoiseDeltaChange = useSpinButtonOnChange(
			useRawSynthesisParametersPropertySetter('noiseDelta'),
		)

		const updateNoisyCountThreshold = useUpdateNoisyCountThreshold()

		const onRunClicked = () => onRun(rawSynthesisParams)

		useEffect(() => {
			updateNoisyCountThreshold(rawSynthesisParams.reportingLength)
		}, [rawSynthesisParams.reportingLength, updateNoisyCountThreshold])

		return (
			<Flex gap={theme.spacing.s1} vertical wrap>
				<Flex gap={theme.spacing.s1} wrap>
					<TooltipWrapper tooltip={tooltips.synthesisMode} label="Mode">
						<StyledDropdown
							selectedKey={rawSynthesisParams.synthesisMode}
							onChange={handleSynthesisModeChange}
							placeholder="Select synthesis mode"
							options={synthesisModeOptions}
						/>
					</TooltipWrapper>
					<TooltipWrapper tooltip={tooltips.resolution} label="Resolution">
						<StyledSpinButton
							labelPosition={Position.top}
							min={1}
							step={1}
							value={rawSynthesisParams.resolution.toString()}
							onChange={handleResolutionChange}
						/>
					</TooltipWrapper>
					<TooltipWrapper
						tooltip={tooltips.reportingLength}
						label="Aggregation limit"
					>
						<StyledSpinButton
							labelPosition={Position.top}
							min={1}
							step={1}
							value={rawSynthesisParams.reportingLength.toString()}
							onChange={handleReportingLengthChange}
						/>
					</TooltipWrapper>
					<TooltipWrapper tooltip={tooltips.recordLimit} label="Record limit">
						<StyledSpinButton
							labelPosition={Position.top}
							min={1}
							max={sensitiveCsvContent.table.numRows()}
							step={10}
							value={rawSynthesisParams.recordLimit.toString()}
							onChange={handleRecordLimitChange}
						/>
					</TooltipWrapper>

					<Flex.Box align="flex-end">
						<PrimaryButton
							type="submit"
							onClick={onRunClicked}
							disabled={!enableRun}
						>
							Run
						</PrimaryButton>
					</Flex.Box>
					<Flex.Box align="flex-end">
						<InfoTooltip>{tooltips.synthesize}</InfoTooltip>
					</Flex.Box>
					<Flex.Box align="flex-end">
						<IconButton
							iconProps={{
								iconName: 'settings',
							}}
							title={'Advanced parameters'}
							onClick={openAdvancedParameter}
						/>
					</Flex.Box>
				</Flex>

				<Panel
					isLightDismiss
					headerText="Advanced parameters"
					isOpen={isAdvancedParametersOpen}
					onDismiss={dismissAdvancedParameter}
					closeButtonAriaLabel="Close"
				>
					<DataSynthesisAdvancedParameters />
				</Panel>

				<Flex gap={theme.spacing.s1} wrap>
					{rawSynthesisParams.synthesisMode === SynthesisMode.DP && (
						<>
							<TooltipWrapper
								tooltip={tooltips.noiseEpsilon}
								label="Noise epsilon"
							>
								<StyledSpinButton
									labelPosition={Position.top}
									min={0}
									step={0.1}
									value={rawSynthesisParams.noiseEpsilon.toString()}
									onChange={handleNoiseEpsilonChange}
								/>
							</TooltipWrapper>

							<TooltipWrapper tooltip={tooltips.noiseDelta} label="Noise delta">
								<StyledSpinButton
									labelPosition={Position.top}
									min={0}
									step={0.1}
									value={rawSynthesisParams.noiseDelta.toString()}
									onChange={handleNoiseDeltaChange}
								/>
							</TooltipWrapper>
						</>
					)}
				</Flex>
			</Flex>
		)
	})
