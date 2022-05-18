/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { Position, useTheme } from '@fluentui/react'
import { memo, useEffect } from 'react'

import { Flex } from '~components/Flexbox'
import { TooltipWrapper } from '~components/TooltipWrapper'
import { defaultThreshold, OversamplingType } from '~models'
import { useDropdownOnChange, useSpinButtonOnChange } from '~pages/hooks'
import {
	useCacheSize,
	useNoisyCountThreshold,
	useNoisyCountThresholdType,
	useOversamplingRatio,
	useOversamplingTries,
	useOversamplingType,
	usePercentileEpsilonProportion,
	usePercentilePercentage,
	usePrivacyBudgetProfile,
	useReportingLength,
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
	useUseSyntheticCountOptions,
} from './DataSynthesisParameters.hooks'
import {
	StyledDropdown,
	StyledSpinButton,
} from './DataSynthesisParameters.styles'

export const DataSynthesisAdvancedParameters: React.FC = memo(
	function DataSynthesisParameter() {
		const theme = useTheme()
		const [reportingLength] = useReportingLength()
		const [cacheSize, setCacheSize] = useCacheSize()
		const [oversamplingType, setOversamplingType] = useOversamplingType()
		const [oversamplingRatio, setOversamplingRatio] = useOversamplingRatio()
		const [oversamplingTries, setOversamplingTries] = useOversamplingTries()
		const [useSyntheticCounts, setUseSyntheticCounts] = useUseSyntheticCounts()
		const [percentilePercentage, setPercentilePercentage] =
			usePercentilePercentage()
		const [percentileEpsilonProportion, setPercentileEpsilonProportion] =
			usePercentileEpsilonProportion()
		const [noisyCountThresholdType, setNoisyCountThresholdType] =
			useNoisyCountThresholdType()
		const [noisyCountThreshold, setNoisyCountThreshold] =
			useNoisyCountThreshold()
		const [privacyBudgetProfile, setPrivacyBudgetProfile] =
			usePrivacyBudgetProfile()
		const [synthesisMode] = useSynthesisMode()
		const oversamplingTypeOptions = useOversamplingTypeOptions()
		const useSyntheticCountsOptions = useUseSyntheticCountOptions()
		const noisyCountThresholdTypeOptions = useNoisyCountThresholdTypeOptions()
		const privacyBudgetProfileOptions = usePrivacyBudgetProfileOptions()
		const handleCacheSizeChange = useSpinButtonOnChange(setCacheSize)
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
				<TooltipWrapper tooltip={tooltips.cacheSize} label="Cache size">
					<StyledSpinButton
						labelPosition={Position.top}
						min={1}
						step={1000}
						value={cacheSize.toString()}
						onChange={handleCacheSizeChange}
					/>
				</TooltipWrapper>

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
		)
	},
)
