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
import { memo } from 'react'

import { Flex } from '~components/Flexbox'
import { InfoTooltip } from '~components/InfoTooltip'
import { TooltipWrapper } from '~components/TooltipWrapper'
import { useDropdownOnChange, useSpinButtonOnChange } from '~pages/hooks'
import {
	useCacheSize,
	useNoiseDelta,
	useNoiseEpsilon,
	useNoisyCountThreshold,
	useNoisyCountThresholdType,
	useOversamplingRatio,
	useOversamplingTries,
	useOversamplingType,
	usePercentileEpsilonProportion,
	usePercentilePercentage,
	usePrivacyBudgetProfile,
	useRecordLimit,
	useReportingLength,
	useResolution,
	useSynthesisMode,
	useUseSyntheticCounts,
} from '~states'
import { tooltips } from '~ui-tooltips'
import { SynthesisMode } from '~workers/types'

import { DataSynthesisAdvancedParameters } from './DataSynthesisAdvancedParameters'
import { useSynthesisModeOptions } from './DataSynthesisParameters.hooks'
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
		const [resolution, setResolution] = useResolution()
		const [recordLimit, setRecordLimit] = useRecordLimit()
		const [reportingLength, setReportingLength] = useReportingLength()
		const [cacheSize] = useCacheSize()
		const [oversamplingType] = useOversamplingType()
		const [oversamplingRatio] = useOversamplingRatio()
		const [oversamplingTries] = useOversamplingTries()
		const [useSyntheticCounts] = useUseSyntheticCounts()
		const [percentilePercentage] = usePercentilePercentage()
		const [percentileEpsilonProportion] = usePercentileEpsilonProportion()
		const [noiseEpsilon, setNoiseEpsilon] = useNoiseEpsilon()
		const [noiseDelta, setNoiseDelta] = useNoiseDelta()
		const [noisyCountThresholdType] = useNoisyCountThresholdType()
		const [noisyCountThreshold] = useNoisyCountThreshold()
		const [privacyBudgetProfile] = usePrivacyBudgetProfile()
		const [synthesisMode, setSynthesisMode] = useSynthesisMode()

		const [
			isAdvancedParametersOpen,
			{ setTrue: openAdvancedParameter, setFalse: dismissAdvancedParameter },
		] = useBoolean(false)

		const synthesisModeOptions = useSynthesisModeOptions()

		const handleSynthesisModeChange = useDropdownOnChange(setSynthesisMode)
		const handleResolutionChange = useSpinButtonOnChange(setResolution)
		const handleRecordLimitChange = useSpinButtonOnChange(setRecordLimit)
		const handleReportingLengthChange =
			useSpinButtonOnChange(setReportingLength)
		const handleNoiseEpsilonChange = useSpinButtonOnChange(setNoiseEpsilon)
		const handleNoiseDeltaChange = useSpinButtonOnChange(setNoiseDelta)

		const onRunClicked = () =>
			onRun({
				recordLimit,
				synthesisMode,
				resolution,
				cacheSize,
				reportingLength,
				oversamplingType,
				oversamplingRatio,
				oversamplingTries,
				useSyntheticCounts,
				percentilePercentage,
				percentileEpsilonProportion,
				noiseEpsilon,
				noiseDelta,
				thresholdType: noisyCountThresholdType,
				threshold: noisyCountThreshold,
				privacyBudgetProfile,
			})

		return (
			<Flex gap={theme.spacing.s1} vertical wrap>
				<Flex gap={theme.spacing.s1} wrap>
					<TooltipWrapper tooltip={tooltips.synthesisMode} label="Mode">
						<StyledDropdown
							selectedKey={synthesisMode}
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
							value={resolution.toString()}
							onChange={handleResolutionChange}
						/>
					</TooltipWrapper>
					<TooltipWrapper
						tooltip={tooltips.reportingLength}
						label="Reporting length"
					>
						<StyledSpinButton
							labelPosition={Position.top}
							min={1}
							step={1}
							value={reportingLength.toString()}
							onChange={handleReportingLengthChange}
						/>
					</TooltipWrapper>
					<TooltipWrapper tooltip={tooltips.recordLimit} label="Record Limit">
						<StyledSpinButton
							labelPosition={Position.top}
							min={1}
							max={sensitiveCsvContent.table.numRows()}
							step={10}
							value={recordLimit.toString()}
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
					{synthesisMode === SynthesisMode.DP && (
						<>
							<TooltipWrapper
								tooltip={tooltips.noiseEpsilon}
								label="Noise epsilon"
							>
								<StyledSpinButton
									labelPosition={Position.top}
									min={0}
									step={0.1}
									value={noiseEpsilon.toString()}
									onChange={handleNoiseEpsilonChange}
								/>
							</TooltipWrapper>

							<TooltipWrapper tooltip={tooltips.noiseDelta} label="Noise delta">
								<StyledSpinButton
									labelPosition={Position.top}
									min={0}
									step={0.1}
									value={noiseDelta.toString()}
									onChange={handleNoiseDeltaChange}
								/>
							</TooltipWrapper>
						</>
					)}
				</Flex>
			</Flex>
		)
	})
