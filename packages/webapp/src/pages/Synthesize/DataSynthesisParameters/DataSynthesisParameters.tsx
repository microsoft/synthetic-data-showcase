/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { Position, PrimaryButton, useTheme } from '@fluentui/react'
import { memo, useEffect } from 'react'

import { Flex } from '~components/Flexbox'
import { InfoTooltip } from '~components/InfoTooltip'
import { TooltipWrapper } from '~components/TooltipWrapper'
import { defaultThreshold, OversamplingType } from '~models'
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

import {
	useNoisyCountThresholdChange,
	useNoisyCountThresholdTypeOptions,
	useOversamplingTypeOptions,
	usePrivacyBudgetProfileOptions,
	useSynthesisModeOptions,
	useUseSyntheticCountOptions,
} from './DataSynthesisParameters.hooks'
import {
	StyledDropdown,
	StyledSpinButton,
} from './DataSynthesisParameters.styles'
import type { DataSynthesisParameterProps } from './DataSynthesisParameters.types'

export const DataSynthesisParameter: React.FC<DataSynthesisParameterProps> =
	memo(function DataSynthesisParameter({
		enableRun,
		sensitiveCsvContent,
		onRun,
	}) {
		const theme = useTheme()
		const [resolution, setResolution] = useResolution()
		const [recordLimit, setRecordLimit] = useRecordLimit()
		const [reportingLength, setReportingLength] = useReportingLength()
		const [cacheSize, setCacheSize] = useCacheSize()
		const [oversamplingType, setOversamplingType] = useOversamplingType()
		const [oversamplingRatio, setOversamplingRatio] = useOversamplingRatio()
		const [oversamplingTries, setOversamplingTries] = useOversamplingTries()
		const [useSyntheticCounts, setUseSyntheticCounts] = useUseSyntheticCounts()
		const [percentilePercentage, setPercentilePercentage] =
			usePercentilePercentage()
		const [percentileEpsilonProportion, setPercentileEpsilonProportion] =
			usePercentileEpsilonProportion()
		const [noiseEpsilon, setNoiseEpsilon] = useNoiseEpsilon()
		const [noiseDelta, setNoiseDelta] = useNoiseDelta()
		const [noisyCountThresholdType, setNoisyCountThresholdType] =
			useNoisyCountThresholdType()
		const [noisyCountThreshold, setNoisyCountThreshold] =
			useNoisyCountThreshold()
		const [privacyBudgetProfile, setPrivacyBudgetProfile] =
			usePrivacyBudgetProfile()
		const [synthesisMode, setSynthesisMode] = useSynthesisMode()
		const synthesisModeOptions = useSynthesisModeOptions()
		const oversamplingTypeOptions = useOversamplingTypeOptions()
		const useSyntheticCountsOptions = useUseSyntheticCountOptions()
		const noisyCountThresholdTypeOptions = useNoisyCountThresholdTypeOptions()
		const privacyBudgetProfileOptions = usePrivacyBudgetProfileOptions()
		const handleSynthesisModeChange = useDropdownOnChange(setSynthesisMode)
		const handleResolutionChange = useSpinButtonOnChange(setResolution)
		const handleRecordLimitChange = useSpinButtonOnChange(setRecordLimit)
		const handleCacheSizeChange = useSpinButtonOnChange(setCacheSize)
		const handleReportingLengthChange =
			useSpinButtonOnChange(setReportingLength)
		const handleOversamplingTypeChange =
			useDropdownOnChange(setOversamplingType)
		const handleOversamplingRatioChange =
			useSpinButtonOnChange(setOversamplingRatio)
		const handleOversamplingTriesChange =
			useSpinButtonOnChange(setOversamplingTries)
		const handleUseSyntheticCountsChange = useDropdownOnChange(
			setUseSyntheticCounts,
		)
		const handlePercentilePercentageChange = useSpinButtonOnChange(
			setPercentilePercentage,
		)
		const handlePercentileEpsilonProportionChange = useSpinButtonOnChange(
			setPercentileEpsilonProportion,
		)
		const handleNoiseEpsilonChange = useSpinButtonOnChange(setNoiseEpsilon)
		const handleNoiseDeltaChange = useSpinButtonOnChange(setNoiseDelta)
		const handleNoisyCountThresholdTypeChange = useDropdownOnChange(
			setNoisyCountThresholdType,
		)
		const handleNoisyCountThresholdChange = useNoisyCountThresholdChange(
			noisyCountThreshold,
			setNoisyCountThreshold,
		)
		const handlePrivacyBudgetProfileChange = useDropdownOnChange(
			setPrivacyBudgetProfile,
		)
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

		useEffect(() => {
			if (reportingLength - 1 !== Object.keys(noisyCountThreshold).length) {
				const newValues = {}
				for (let i = 2; i <= reportingLength; ++i) {
					newValues[i] = noisyCountThreshold[i] || defaultThreshold
				}
				setNoisyCountThreshold(newValues)
			}
		}, [reportingLength, setNoisyCountThreshold, noisyCountThreshold])

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
					<TooltipWrapper tooltip={tooltips.cacheSize} label="Cache size">
						<StyledSpinButton
							labelPosition={Position.top}
							min={1}
							step={1000}
							value={cacheSize.toString()}
							onChange={handleCacheSizeChange}
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
				</Flex>

				<Flex gap={theme.spacing.s1} wrap>
					{synthesisMode === SynthesisMode.ValueSeeded && (
						<>
							<TooltipWrapper
								tooltip={tooltips.oversampling}
								label="Oversampling"
							>
								<StyledDropdown
									selectedKey={oversamplingType}
									onChange={handleOversamplingTypeChange}
									placeholder="Select oversampling type"
									options={oversamplingTypeOptions}
								/>
							</TooltipWrapper>

							{oversamplingType === OversamplingType.Controlled && (
								<>
									<TooltipWrapper
										tooltip={tooltips.oversamplingRatio}
										label="Oversampling ratio"
									>
										<StyledSpinButton
											labelPosition={Position.top}
											min={0}
											step={0.1}
											value={oversamplingRatio.toString()}
											onChange={handleOversamplingRatioChange}
										/>
									</TooltipWrapper>

									<TooltipWrapper
										tooltip={tooltips.oversamplingTries}
										label="Oversampling tries"
									>
										<StyledSpinButton
											labelPosition={Position.top}
											min={1}
											step={1}
											value={oversamplingTries.toString()}
											onChange={handleOversamplingTriesChange}
										/>
									</TooltipWrapper>
								</>
							)}
						</>
					)}

					{(synthesisMode === SynthesisMode.AggregateSeeded ||
						synthesisMode === SynthesisMode.DP) && (
						<>
							<TooltipWrapper
								tooltip={tooltips.useSyntheticCounts}
								label="Use synthetic counts"
							>
								<StyledDropdown
									selectedKey={useSyntheticCounts}
									onChange={handleUseSyntheticCountsChange}
									placeholder="Select"
									options={useSyntheticCountsOptions}
								/>
							</TooltipWrapper>

							{synthesisMode === SynthesisMode.DP && (
								<>
									<TooltipWrapper
										tooltip={tooltips.percentilePercentage}
										label="Percentile percentage"
									>
										<StyledSpinButton
											labelPosition={Position.top}
											min={1}
											max={100}
											step={5}
											value={percentilePercentage.toString()}
											onChange={handlePercentilePercentageChange}
										/>
									</TooltipWrapper>

									<TooltipWrapper
										tooltip={tooltips.percentileEpsilonProportion}
										label="Percentile epsilon prop"
									>
										<StyledSpinButton
											labelPosition={Position.top}
											min={0.01}
											max={1.0}
											step={0.01}
											value={percentileEpsilonProportion.toString()}
											onChange={handlePercentileEpsilonProportionChange}
										/>
									</TooltipWrapper>

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

									<TooltipWrapper
										tooltip={tooltips.noiseDelta}
										label="Noise delta"
									>
										<StyledSpinButton
											labelPosition={Position.top}
											min={0}
											step={0.1}
											value={noiseDelta.toString()}
											onChange={handleNoiseDeltaChange}
										/>
									</TooltipWrapper>

									<TooltipWrapper
										tooltip={tooltips.privacyBudgetProfile}
										label="Privacy budget profile"
									>
										<StyledDropdown
											selectedKey={privacyBudgetProfile}
											onChange={handlePrivacyBudgetProfileChange}
											placeholder="Select budget type"
											options={privacyBudgetProfileOptions}
										/>
									</TooltipWrapper>

									<TooltipWrapper
										tooltip={tooltips.thresholdType}
										label="Threshold type"
									>
										<StyledDropdown
											selectedKey={noisyCountThresholdType}
											onChange={handleNoisyCountThresholdTypeChange}
											placeholder="Select threshold type"
											options={noisyCountThresholdTypeOptions}
										/>
									</TooltipWrapper>

									{Object.keys(noisyCountThreshold).map(l => (
										<TooltipWrapper
											key={l}
											tooltip={tooltips.thresholdValue}
											label={`${l}-counts threshold`}
										>
											<StyledSpinButton
												labelPosition={Position.top}
												min={0.01}
												step={0.01}
												value={noisyCountThreshold[l].toString()}
												onChange={handleNoisyCountThresholdChange[l]}
											/>
										</TooltipWrapper>
									))}
								</>
							)}
						</>
					)}
				</Flex>
			</Flex>
		)
	})
