/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import type { IStackStyles, IStackTokens } from '@fluentui/react'
import {
	Dropdown,
	getTheme,
	Position,
	PrimaryButton,
	SpinButton,
	Spinner,
	Stack,
	Toggle,
} from '@fluentui/react'
import { memo, useEffect, useRef, useState } from 'react'
import type { IEvaluateResult } from 'sds-wasm'

import { ContextsDropdown } from '~components/ContextsDropdown'
import { CsvTable } from '~components/CsvTable'
import { HumanReadableSummary } from '~components/HumanReadableSummary'
import { InfoTooltip } from '~components/InfoTooltip'
import { TooltipWrapper } from '~components/TooltipWrapper'
import type { ICsvContent } from '~models'
import { defaultCsvContent, defaultThreshold, OversamplingType } from '~models'
import {
	useCanRun,
	useDropdownOnChange,
	useSpinButtonOnChange,
} from '~pages/hooks'
import { DataEvaluation } from '~pages/Synthesize/DataEvaluation'
import {
	useAllContextsParametersValue,
	useCacheSize,
	useIsProcessingValue,
	useNoiseDelta,
	useNoiseEpsilon,
	useNoisyCountThreshold,
	useNoisyCountThresholdType,
	useOversamplingRatio,
	useOversamplingTries,
	useOversamplingType,
	usePercentileEpsilonProportion,
	usePercentilePercentage,
	useRecordLimit,
	useReportingLength,
	useResolution,
	useSelectedContextParameters,
	useSensitiveContentValue,
	useSynthesisMode,
	useUseSyntheticCounts,
} from '~states'
import { usePrivacyBudgetProfile } from '~states/dataShowcaseContext/privacyBudgetProfile'
import { tooltips } from '~ui-tooltips'
import { SynthesisMode } from '~workers/types'

import {
	useGetSyntheticCsvContent,
	useNoisyCountThresholdChange,
	useNoisyCountThresholdTypeOptions,
	useOnRunGenerateAndEvaluate,
	useOversamplingTypeOptions,
	usePrivacyBudgetProfileOptions,
	useSelectedContextParametersOnChange,
	useSynthesisModeOptions,
	useSyntheticTableCommands,
	useUseSyntheticCountOptions,
} from './hooks'

export const DataSynthesis: React.FC = memo(function DataSynthesis() {
	const isMounted = useRef(true)
	const [resolution, setResolution] = useResolution()
	const [recordLimit, setRecordLimit] = useRecordLimit()
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
	const [noisyCountThreshold, setNoisyCountThreshold] = useNoisyCountThreshold()
	const [privacyBudgetProfile, setPrivacyBudgetProfile] =
		usePrivacyBudgetProfile()
	const isProcessing = useIsProcessingValue()
	const sensitiveContent = useSensitiveContentValue()
	const [reportingLength, setReportingLength] = useReportingLength()
	const canRun = useCanRun()
	const [syntheticContent, setSyntheticContent] =
		useState<ICsvContent>(defaultCsvContent)
	const [synthesisMode, setSynthesisMode] = useSynthesisMode()
	const synthesisModeOptions = useSynthesisModeOptions()
	const oversamplingTypeOptions = useOversamplingTypeOptions()
	const useSyntheticCountsOptions = useUseSyntheticCountOptions()
	const noisyCountThresholdTypeOptions = useNoisyCountThresholdTypeOptions()
	const privacyBudgetProfileOptions = usePrivacyBudgetProfileOptions()
	const allContextsParameters = useAllContextsParametersValue()
	const [selectedContextParameters, setSelectedContextParameters] =
		useSelectedContextParameters()
	const getSyntheticCsvContent = useGetSyntheticCsvContent()
	const [evaluateResult, setEvaluateResult] = useState<
		IEvaluateResult | undefined
	>()
	const [isLoadingFromWorker, setIsLoadingFromWorker] = useState(false)
	const selectedContextParametersOnChange =
		useSelectedContextParametersOnChange(
			selectedContextParameters,
			getSyntheticCsvContent,
			setSyntheticContent,
			setEvaluateResult,
			setIsLoadingFromWorker,
			isMounted,
		)
	const [showSyntheticData, setShowSyntheticData] = useState(false)
	const [showAdvancedEvaluation, setShowAdvancedEvaluation] = useState(false)

	const theme = getTheme()

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

	const inputStyles = {
		root: {
			width: 200,
		},
	}

	const onRunGenerateAndEvaluate = useOnRunGenerateAndEvaluate({
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

	const tableCommands = useSyntheticTableCommands(syntheticContent)

	const handleSynthesisModeChange = useDropdownOnChange(setSynthesisMode)
	const handleResolutionChange = useSpinButtonOnChange(setResolution)
	const handleRecordLimitChange = useSpinButtonOnChange(setRecordLimit)
	const handleCacheSizeChange = useSpinButtonOnChange(setCacheSize)
	const handleReportingLengthChange = useSpinButtonOnChange(setReportingLength)
	const handleOversamplingTypeChange = useDropdownOnChange(setOversamplingType)
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

	useEffect(() => {
		selectedContextParametersOnChange()
	}, [selectedContextParametersOnChange])

	useEffect(() => {
		if (reportingLength - 1 !== Object.keys(noisyCountThreshold).length) {
			const newValues = {}
			for (let i = 2; i <= reportingLength; ++i) {
				newValues[i] = noisyCountThreshold[i] || defaultThreshold
			}
			setNoisyCountThreshold(newValues)
		}
	}, [reportingLength, setNoisyCountThreshold, noisyCountThreshold])

	useEffect(() => {
		return () => {
			isMounted.current = false
		}
	}, [])

	return (
		<Stack styles={mainStackStyles} tokens={mainStackTokens}>
			<Stack tokens={subStackTokens} horizontal wrap>
				<Stack.Item>
					<TooltipWrapper tooltip={tooltips.synthesisMode} label="Mode">
						<Dropdown
							selectedKey={synthesisMode}
							onChange={handleSynthesisModeChange}
							placeholder="Select synthesis mode"
							options={synthesisModeOptions}
							styles={inputStyles}
							disabled={isProcessing}
						/>
					</TooltipWrapper>
				</Stack.Item>
				<Stack.Item>
					<TooltipWrapper tooltip={tooltips.resolution} label="Resolution">
						<SpinButton
							labelPosition={Position.top}
							min={1}
							step={1}
							value={resolution.toString()}
							disabled={isProcessing}
							onChange={handleResolutionChange}
							styles={inputStyles}
						/>
					</TooltipWrapper>
				</Stack.Item>
				<Stack.Item>
					<TooltipWrapper
						tooltip={tooltips.reportingLength}
						label="Reporting length"
					>
						<SpinButton
							labelPosition={Position.top}
							min={1}
							step={1}
							value={reportingLength.toString()}
							disabled={isProcessing}
							onChange={handleReportingLengthChange}
							styles={inputStyles}
						/>
					</TooltipWrapper>
				</Stack.Item>
				<Stack.Item>
					<TooltipWrapper tooltip={tooltips.recordLimit} label="Record Limit">
						<SpinButton
							labelPosition={Position.top}
							min={1}
							max={sensitiveContent.table.numRows()}
							step={10}
							value={recordLimit.toString()}
							disabled={isProcessing}
							onChange={handleRecordLimitChange}
							styles={inputStyles}
						/>
					</TooltipWrapper>
				</Stack.Item>
				<Stack.Item>
					<TooltipWrapper tooltip={tooltips.cacheSize} label="Cache size">
						<SpinButton
							labelPosition={Position.top}
							min={1}
							step={1000}
							value={cacheSize.toString()}
							disabled={isProcessing}
							onChange={handleCacheSizeChange}
							styles={inputStyles}
						/>
					</TooltipWrapper>
				</Stack.Item>

				<Stack.Item align="end">
					<PrimaryButton
						type="submit"
						onClick={onRunGenerateAndEvaluate}
						disabled={!canRun}
					>
						Run
					</PrimaryButton>
				</Stack.Item>
				<Stack.Item align="end">
					<InfoTooltip>{tooltips.synthesize}</InfoTooltip>
				</Stack.Item>
			</Stack>

			<Stack tokens={subStackTokens} horizontal wrap>
				{synthesisMode === SynthesisMode.ValueSeeded && (
					<>
						<Stack.Item>
							<TooltipWrapper
								tooltip={tooltips.oversampling}
								label="Oversampling"
							>
								<Dropdown
									selectedKey={oversamplingType}
									onChange={handleOversamplingTypeChange}
									placeholder="Select oversampling type"
									options={oversamplingTypeOptions}
									styles={inputStyles}
									disabled={isProcessing}
								/>
							</TooltipWrapper>
						</Stack.Item>

						{oversamplingType === OversamplingType.Controlled && (
							<>
								<Stack.Item>
									<TooltipWrapper
										tooltip={tooltips.oversamplingRatio}
										label="Oversampling ratio"
									>
										<SpinButton
											labelPosition={Position.top}
											min={0}
											step={0.1}
											value={oversamplingRatio.toString()}
											disabled={isProcessing}
											onChange={handleOversamplingRatioChange}
											styles={inputStyles}
										/>
									</TooltipWrapper>
								</Stack.Item>

								<Stack.Item>
									<TooltipWrapper
										tooltip={tooltips.oversamplingTries}
										label="Oversampling tries"
									>
										<SpinButton
											labelPosition={Position.top}
											min={1}
											step={1}
											value={oversamplingTries.toString()}
											disabled={isProcessing}
											onChange={handleOversamplingTriesChange}
											styles={inputStyles}
										/>
									</TooltipWrapper>
								</Stack.Item>
							</>
						)}
					</>
				)}

				{(synthesisMode === SynthesisMode.AggregateSeeded ||
					synthesisMode === SynthesisMode.DP) && (
					<>
						<Stack.Item>
							<TooltipWrapper
								tooltip={tooltips.useSyntheticCounts}
								label="Use synthetic counts"
							>
								<Dropdown
									selectedKey={useSyntheticCounts}
									onChange={handleUseSyntheticCountsChange}
									placeholder="Select"
									options={useSyntheticCountsOptions}
									styles={inputStyles}
									disabled={isProcessing}
								/>
							</TooltipWrapper>
						</Stack.Item>

						{synthesisMode === SynthesisMode.DP && (
							<>
								<Stack.Item>
									<TooltipWrapper
										tooltip={tooltips.percentilePercentage}
										label="Percentile percentage"
									>
										<SpinButton
											labelPosition={Position.top}
											min={1}
											max={100}
											step={5}
											value={percentilePercentage.toString()}
											disabled={isProcessing}
											onChange={handlePercentilePercentageChange}
											styles={inputStyles}
										/>
									</TooltipWrapper>
								</Stack.Item>

								<Stack.Item>
									<TooltipWrapper
										tooltip={tooltips.percentileEpsilonProportion}
										label="Percentile epsilon prop"
									>
										<SpinButton
											labelPosition={Position.top}
											min={0.01}
											max={1.0}
											step={0.01}
											value={percentileEpsilonProportion.toString()}
											disabled={isProcessing}
											onChange={handlePercentileEpsilonProportionChange}
											styles={inputStyles}
										/>
									</TooltipWrapper>
								</Stack.Item>

								<Stack.Item>
									<TooltipWrapper
										tooltip={tooltips.noiseEpsilon}
										label="Noise epsilon"
									>
										<SpinButton
											labelPosition={Position.top}
											min={0}
											step={0.1}
											value={noiseEpsilon.toString()}
											disabled={isProcessing}
											onChange={handleNoiseEpsilonChange}
											styles={inputStyles}
										/>
									</TooltipWrapper>
								</Stack.Item>

								<Stack.Item>
									<TooltipWrapper
										tooltip={tooltips.noiseDelta}
										label="Noise delta"
									>
										<SpinButton
											labelPosition={Position.top}
											min={0}
											step={0.1}
											value={noiseDelta.toString()}
											disabled={isProcessing}
											onChange={handleNoiseDeltaChange}
											styles={inputStyles}
										/>
									</TooltipWrapper>
								</Stack.Item>

								<Stack.Item>
									<TooltipWrapper
										tooltip={tooltips.privacyBudgetProfile}
										label="Privacy budget profile"
									>
										<Dropdown
											selectedKey={privacyBudgetProfile}
											onChange={handlePrivacyBudgetProfileChange}
											placeholder="Select budget type"
											options={privacyBudgetProfileOptions}
											styles={inputStyles}
											disabled={isProcessing}
										/>
									</TooltipWrapper>
								</Stack.Item>

								<Stack.Item>
									<TooltipWrapper
										tooltip={tooltips.thresholdType}
										label="Threshold type"
									>
										<Dropdown
											selectedKey={noisyCountThresholdType}
											onChange={handleNoisyCountThresholdTypeChange}
											placeholder="Select threshold type"
											options={noisyCountThresholdTypeOptions}
											styles={inputStyles}
											disabled={isProcessing}
										/>
									</TooltipWrapper>
								</Stack.Item>

								{Object.keys(noisyCountThreshold).map(l => (
									<Stack.Item key={l}>
										<TooltipWrapper
											tooltip={tooltips.thresholdValue}
											label={`${l}-counts threshold`}
										>
											<SpinButton
												labelPosition={Position.top}
												min={0.01}
												step={0.01}
												value={noisyCountThreshold[l].toString()}
												disabled={isProcessing}
												onChange={handleNoisyCountThresholdChange[l]}
												styles={inputStyles}
											/>
										</TooltipWrapper>
									</Stack.Item>
								))}
							</>
						)}
					</>
				)}
			</Stack>

			{!isProcessing && allContextsParameters.length > 0 && (
				<>
					<Stack.Item>
						<h3>Results</h3>
					</Stack.Item>
					<Stack.Item>
						<ContextsDropdown
							selectedContextParameters={selectedContextParameters}
							allContextsParameters={allContextsParameters}
							onContextSelected={setSelectedContextParameters}
							disabled={isLoadingFromWorker}
						/>
					</Stack.Item>
					<Stack tokens={subStackTokens} horizontal wrap>
						<Stack.Item>
							<Toggle
								label="Show advanced evaluation"
								inlineLabel
								checked={showAdvancedEvaluation}
								onChange={(_event, checked) =>
									setShowAdvancedEvaluation(checked === true)
								}
							/>
						</Stack.Item>
						<Stack.Item>
							<Toggle
								label="Show synthetic data"
								inlineLabel
								checked={showSyntheticData}
								onChange={(_event, checked) =>
									setShowSyntheticData(checked === true)
								}
							/>
						</Stack.Item>
					</Stack>
					{isLoadingFromWorker ? (
						<Spinner />
					) : (
						<>
							{evaluateResult && selectedContextParameters && (
								<>
									<Stack.Item>
										<h3>Evaluation summary</h3>
									</Stack.Item>
									<Stack.Item>
										<HumanReadableSummary
											evaluateResult={evaluateResult}
											contextParameters={selectedContextParameters}
										/>
									</Stack.Item>
									{showAdvancedEvaluation && (
										<>
											<Stack.Item>
												<h3>Advanced evaluation</h3>
											</Stack.Item>
											<Stack.Item>
												<DataEvaluation />
											</Stack.Item>
										</>
									)}
								</>
							)}
							{showSyntheticData && (
								<Stack tokens={subStackTokens}>
									<Stack.Item>
										<h3>Synthetic data</h3>
									</Stack.Item>
									<Stack.Item>
										<CsvTable
											content={syntheticContent}
											commands={tableCommands}
										/>
									</Stack.Item>
								</Stack>
							)}
						</>
					)}
				</>
			)}
		</Stack>
	)
})
