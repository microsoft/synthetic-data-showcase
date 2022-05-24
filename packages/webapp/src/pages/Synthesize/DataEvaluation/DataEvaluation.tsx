/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { Dropdown, Label } from '@fluentui/react'
import { FlexContainer } from '@sds/components'
import { memo, useEffect, useRef, useState } from 'react'
import type { IEvaluateResult } from 'sds-wasm'
import { useTheme } from 'styled-components'

import { DataEvaluationInfo } from '~components/DataEvaluationInfo'
import { SynthesisDropdown } from '~components/SynthesisDropdown'
import { useDropdownOnChange } from '~pages/hooks'
import type { ISynthesisInfo } from '~workers/types'
import { AggregateType } from '~workers/types'

import { useAllFinishedSynthesisInfo } from '../Synthesize.hooks.js'
import {
	useAggregateTypeOptions,
	useMicrodataMaxStatistics,
	useSelectedSynthesisOnChange,
} from './DataEvaluation.hooks.js'
import { FlexCentered } from './DataEvaluation.styles.js'
import type { DataEvaluationProps } from './DataEvaluation.types.js'

const aggregateTypeToStatKey = {
	[AggregateType.Sensitive]: 'sensitiveDataStats',
	[AggregateType.Aggregated]: 'aggregateCountsStats',
	[AggregateType.Synthetic]: 'syntheticDataStats',
}

export const DataEvaluation: React.FC<DataEvaluationProps> = memo(
	function DataEvaluation({ selectedSynthesis }) {
		const isMounted = useRef(true)
		const [leftEvaluateResult, setLeftEvaluateResult] =
			useState<IEvaluateResult | null>()
		const [rightEvaluateResult, setRightEvaluateResult] =
			useState<IEvaluateResult | null>()
		const [leftAggregateType, setLeftAggregateType] = useState<AggregateType>(
			AggregateType.Sensitive,
		)
		const [rightAggregateType, setRightAggregateType] = useState<AggregateType>(
			AggregateType.Synthetic,
		)
		const aggregateTypeOptions = useAggregateTypeOptions()
		const leftAggregateTypeOnChange = useDropdownOnChange(setLeftAggregateType)
		const rightAggregateTypeOnChange = useDropdownOnChange(
			setRightAggregateType,
		)
		const leftStats = leftEvaluateResult
			? leftEvaluateResult[aggregateTypeToStatKey[leftAggregateType]]
			: undefined
		const rightStats = rightEvaluateResult
			? rightEvaluateResult[aggregateTypeToStatKey[rightAggregateType]]
			: undefined
		const microdataMaxStats = useMicrodataMaxStatistics([leftStats, rightStats])
		const allFinishedSynthesisInfo = useAllFinishedSynthesisInfo()
		const [leftSelectedSynthesis, setLeftSelectedSynthesis] =
			useState<ISynthesisInfo | null>(selectedSynthesis)
		const [rightSelectedSynthesis, setRightSelectedSynthesis] =
			useState<ISynthesisInfo | null>(selectedSynthesis)
		const leftSelectedSynthesisOnChange = useSelectedSynthesisOnChange(
			leftSelectedSynthesis,
			setLeftEvaluateResult,
			isMounted,
		)
		const rightSelectedSynthesisOnChange = useSelectedSynthesisOnChange(
			rightSelectedSynthesis,
			setRightEvaluateResult,
			isMounted,
		)
		const theme = useTheme()

		const chartHeight = 400

		const chartWidth = 550

		useEffect(() => {
			setLeftSelectedSynthesis(selectedSynthesis)
			setRightSelectedSynthesis(selectedSynthesis)
		}, [selectedSynthesis])

		useEffect(() => {
			leftSelectedSynthesisOnChange()
		}, [leftSelectedSynthesis, leftSelectedSynthesisOnChange])

		useEffect(() => {
			rightSelectedSynthesisOnChange()
		}, [rightSelectedSynthesis, rightSelectedSynthesisOnChange])

		useEffect(() => {
			return () => {
				isMounted.current = false
			}
		}, [])

		return (
			<FlexContainer vertical gap={theme.spacing.s1}>
				<FlexContainer gap={theme.spacing.s1}>
					<FlexCentered grow={1}>
						<FlexContainer vertical gap={theme.spacing.s1}>
							<SynthesisDropdown
								selectedSynthesis={leftSelectedSynthesis}
								allSynthesisInfo={allFinishedSynthesisInfo}
								onChange={setLeftSelectedSynthesis}
								disabled={allFinishedSynthesisInfo.length === 0}
							/>
							<Dropdown
								selectedKey={leftAggregateType}
								onChange={leftAggregateTypeOnChange}
								placeholder="Select data statistics"
								options={aggregateTypeOptions}
								disabled={
									allFinishedSynthesisInfo.length === 0 ||
									leftSelectedSynthesis === undefined
								}
							/>
						</FlexContainer>
					</FlexCentered>
					<FlexCentered grow={1}>
						<FlexContainer vertical gap={theme.spacing.s1}>
							<SynthesisDropdown
								selectedSynthesis={rightSelectedSynthesis}
								allSynthesisInfo={allFinishedSynthesisInfo}
								onChange={setRightSelectedSynthesis}
								disabled={allFinishedSynthesisInfo.length === 0}
							/>
							<Dropdown
								selectedKey={rightAggregateType}
								onChange={rightAggregateTypeOnChange}
								placeholder="Select data statistics"
								options={aggregateTypeOptions}
								disabled={
									allFinishedSynthesisInfo.length === 0 ||
									rightSelectedSynthesis === null
								}
							/>
						</FlexContainer>
					</FlexCentered>
				</FlexContainer>

				<FlexContainer gap={theme.spacing.s1}>
					<FlexCentered grow={1}>
						{leftSelectedSynthesis && leftEvaluateResult ? (
							<DataEvaluationInfo
								contextKey={leftSelectedSynthesis.key}
								reportingLength={leftEvaluateResult.reportingLength}
								stats={leftStats}
								microdataMaxStats={microdataMaxStats}
								aggregateType={leftAggregateType}
								chartHeight={chartHeight}
								chartWidth={chartWidth}
							/>
						) : (
							<Label>Nothing selected</Label>
						)}
					</FlexCentered>
					<FlexCentered grow={1}>
						{rightSelectedSynthesis && rightEvaluateResult ? (
							<DataEvaluationInfo
								contextKey={rightSelectedSynthesis.key}
								reportingLength={rightEvaluateResult.reportingLength}
								stats={rightStats}
								microdataMaxStats={microdataMaxStats}
								aggregateType={rightAggregateType}
								chartHeight={chartHeight}
								chartWidth={chartWidth}
							/>
						) : (
							<Label>Nothing selected</Label>
						)}
					</FlexCentered>
				</FlexContainer>
			</FlexContainer>
		)
	},
)
