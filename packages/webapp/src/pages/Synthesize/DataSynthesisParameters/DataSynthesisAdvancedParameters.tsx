/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { Position, useTheme } from '@fluentui/react'
import { FlexContainer } from '@sds/components'
import { memo, useEffect } from 'react'

import { TooltipWrapper } from '~components/TooltipWrapper'
import { FabricationMode, OversamplingType } from '~models'
import { useDropdownOnChange, useSpinButtonOnChange } from '~pages/hooks'
import {
	useRawSynthesisParameters,
	useRawSynthesisParametersPropertySetter,
} from '~states'
import { tooltips } from '~ui-tooltips'
import { SynthesisMode } from '~workers/types'

import {
	useAccuracyModeOptions,
	useFabricationModeOptions,
	useNoisyCountThresholdChange,
	useOversamplingTypeOptions,
	useUpdateNoisyCountThreshold,
	useUseSyntheticCountOptions,
} from './DataSynthesisParameters.hooks.js'
import {
	StyledDropdown,
	StyledSpinButton,
} from './DataSynthesisParameters.styles.js'

export const DataSynthesisAdvancedParameters: React.FC = memo(
	function DataSynthesisParameter() {
		const theme = useTheme()
		const [rawSynthesisParams, setRawSynthesisParams] =
			useRawSynthesisParameters()

		const oversamplingTypeOptions = useOversamplingTypeOptions()
		const useSyntheticCountsOptions = useUseSyntheticCountOptions()
		const fabricationModeOptions = useFabricationModeOptions()
		const accuracyModeOptions = useAccuracyModeOptions()

		const handleCacheSizeChange = useSpinButtonOnChange(
			useRawSynthesisParametersPropertySetter('cacheSize'),
		)
		const handleOversamplingTypeChange = useDropdownOnChange(
			useRawSynthesisParametersPropertySetter('oversamplingType'),
		)
		const handleOversamplingRatioChange = useSpinButtonOnChange(
			useRawSynthesisParametersPropertySetter('oversamplingRatio'),
		)
		const handleOversamplingTriesChange = useSpinButtonOnChange(
			useRawSynthesisParametersPropertySetter('oversamplingTries'),
		)
		const handleAggregateSeededUseSyntheticCountsChange = useDropdownOnChange(
			useRawSynthesisParametersPropertySetter(
				'aggregateSeededUseSyntheticCounts',
			),
		)
		const handleDeltaFactorChange = useSpinButtonOnChange(
			useRawSynthesisParametersPropertySetter('deltaFactor'),
		)
		const handleDpAggregateSeededUseSyntheticCountsChange = useDropdownOnChange(
			useRawSynthesisParametersPropertySetter(
				'dpAggregateSeededUseSyntheticCounts',
			),
		)
		const handlePercentilePercentageChange = useSpinButtonOnChange(
			useRawSynthesisParametersPropertySetter('percentilePercentage'),
		)
		const handlePercentileEpsilonProportionChange = useSpinButtonOnChange(
			useRawSynthesisParametersPropertySetter('percentileEpsilonProportion'),
		)
		const handleFabricationModeChange = useDropdownOnChange(
			useRawSynthesisParametersPropertySetter('fabricationMode'),
		)
		const handleNoisyCountThresholdChange = useNoisyCountThresholdChange(
			rawSynthesisParams.threshold,
			setRawSynthesisParams,
		)
		const handleAccuracyModeChange = useDropdownOnChange(
			useRawSynthesisParametersPropertySetter('accuracyMode'),
		)

		const updateNoisyCountThreshold = useUpdateNoisyCountThreshold()

		useEffect(() => {
			updateNoisyCountThreshold(
				rawSynthesisParams.fabricationMode,
				rawSynthesisParams.reportingLength,
			)
		}, [
			rawSynthesisParams.fabricationMode,
			rawSynthesisParams.reportingLength,
			updateNoisyCountThreshold,
		])

		return (
			<FlexContainer gap={theme.spacing.s1} vertical wrap>
				<TooltipWrapper tooltip={tooltips.cacheSize} label="Cache size">
					<StyledSpinButton
						labelPosition={Position.top}
						min={1}
						step={1000}
						value={rawSynthesisParams.cacheSize.toString()}
						onChange={handleCacheSizeChange}
					/>
				</TooltipWrapper>

				{rawSynthesisParams.synthesisMode === SynthesisMode.ValueSeeded && (
					<>
						<TooltipWrapper
							tooltip={tooltips.oversampling}
							label="Oversampling"
						>
							<StyledDropdown
								selectedKey={rawSynthesisParams.oversamplingType}
								onChange={handleOversamplingTypeChange}
								placeholder="Select oversampling type"
								options={oversamplingTypeOptions}
							/>
						</TooltipWrapper>

						{rawSynthesisParams.oversamplingType ===
							OversamplingType.Controlled && (
							<>
								<TooltipWrapper
									tooltip={tooltips.oversamplingRatio}
									label="Oversampling ratio"
								>
									<StyledSpinButton
										labelPosition={Position.top}
										min={0}
										step={0.1}
										value={rawSynthesisParams.oversamplingRatio.toString()}
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
										value={rawSynthesisParams.oversamplingTries.toString()}
										onChange={handleOversamplingTriesChange}
									/>
								</TooltipWrapper>
							</>
						)}
					</>
				)}

				{rawSynthesisParams.synthesisMode === SynthesisMode.AggregateSeeded && (
					<TooltipWrapper
						tooltip={tooltips.useSyntheticCounts}
						label="Use synthetic counts"
					>
						<StyledDropdown
							selectedKey={rawSynthesisParams.aggregateSeededUseSyntheticCounts}
							onChange={handleAggregateSeededUseSyntheticCountsChange}
							placeholder="Select"
							options={useSyntheticCountsOptions}
						/>
					</TooltipWrapper>
				)}

				{rawSynthesisParams.synthesisMode === SynthesisMode.DP && (
					<>
						<TooltipWrapper tooltip={tooltips.deltaFactor} label="Delta factor">
							<StyledSpinButton
								labelPosition={Position.top}
								min={1}
								step={1}
								value={rawSynthesisParams.deltaFactor.toString()}
								onChange={handleDeltaFactorChange}
							/>
						</TooltipWrapper>
						<TooltipWrapper
							tooltip={tooltips.useSyntheticCounts}
							label="Use synthetic counts"
						>
							<StyledDropdown
								selectedKey={
									rawSynthesisParams.dpAggregateSeededUseSyntheticCounts
								}
								onChange={handleDpAggregateSeededUseSyntheticCountsChange}
								placeholder="Select"
								options={useSyntheticCountsOptions}
							/>
						</TooltipWrapper>
					</>
				)}

				{rawSynthesisParams.synthesisMode === SynthesisMode.DP && (
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
								value={rawSynthesisParams.percentilePercentage.toString()}
								onChange={handlePercentilePercentageChange}
							/>
						</TooltipWrapper>

						<TooltipWrapper
							tooltip={tooltips.percentileEpsilonProportion}
							label="Percentile epsilon proportion"
						>
							<StyledSpinButton
								labelPosition={Position.top}
								min={0.01}
								max={0.99}
								step={0.01}
								value={rawSynthesisParams.percentileEpsilonProportion.toString()}
								onChange={handlePercentileEpsilonProportionChange}
							/>
						</TooltipWrapper>

						<TooltipWrapper
							tooltip={tooltips.accuracyMode}
							label="Accuracy mode"
						>
							<StyledDropdown
								selectedKey={rawSynthesisParams.accuracyMode}
								onChange={handleAccuracyModeChange}
								placeholder="Select accuracy mode"
								options={accuracyModeOptions}
							/>
						</TooltipWrapper>

						<TooltipWrapper
							tooltip={tooltips.fabricationMode}
							label="Fabrication mode"
						>
							<StyledDropdown
								selectedKey={rawSynthesisParams.fabricationMode}
								onChange={handleFabricationModeChange}
								placeholder="Select fabrication mode"
								options={fabricationModeOptions}
							/>
						</TooltipWrapper>

						{rawSynthesisParams.fabricationMode === FabricationMode.Custom &&
							Object.keys(rawSynthesisParams.threshold).map(l => (
								<TooltipWrapper
									key={l}
									tooltip={tooltips.thresholdValue}
									label={`${l}-counts threshold`}
								>
									<StyledSpinButton
										labelPosition={Position.top}
										min={0.01}
										max={1.0}
										step={0.01}
										value={rawSynthesisParams.threshold[l].toString()}
										onChange={handleNoisyCountThresholdChange[l]}
									/>
								</TooltipWrapper>
							))}
					</>
				)}
			</FlexContainer>
		)
	},
)
