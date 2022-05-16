/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { Spinner, Toggle, useTheme } from '@fluentui/react'
import { memo, useEffect, useRef, useState } from 'react'
import type { IEvaluateResult } from 'sds-wasm'

import { CsvTable } from '~components/CsvTable'
import { Flex } from '~components/Flexbox'
import { HumanReadableSummary } from '~components/HumanReadableSummary'
import type { ICsvContent } from '~models'
import { defaultCsvContent } from '~models'

import { useSyntheticTableCommands } from '../DataSynthesis/hooks'
import {
	useGetAndSetEvaluateResult,
	useGetAndSetSyntheticCsvContent,
} from './DataSynthesisResult.hooks'
import type { DataSynthesisResultProps } from './DataSynthesisResult.types'

export const DataSynthesisResult: React.FC<DataSynthesisResultProps> = memo(
	function DataSynthesisResult({ selectedSynthesis }) {
		const theme = useTheme()
		const isMounted = useRef(true)
		const [showSyntheticData, setShowSyntheticData] = useState(false)
		const [showAdvancedEvaluation, setShowAdvancedEvaluation] = useState(false)
		const [isLoading, setIsLoading] = useState(false)
		const [evaluateResult, setEvaluateResult] =
			useState<IEvaluateResult | null>(null)
		const [syntheticCsvContent, setSyntheticCsvContent] =
			useState<ICsvContent | null>(null)
		const tableCommands = useSyntheticTableCommands(
			syntheticCsvContent || defaultCsvContent,
		)
		const getAndSetSyntheticCsvData = useGetAndSetSyntheticCsvContent(
			setSyntheticCsvContent,
			isMounted,
		)
		const getAndSetEvaluateResult = useGetAndSetEvaluateResult(
			setEvaluateResult,
			isMounted,
		)

		useEffect(() => {
			async function loadData() {
				setIsLoading(true)
				await Promise.all([
					getAndSetSyntheticCsvData(selectedSynthesis),
					getAndSetEvaluateResult(selectedSynthesis),
				])
				if (isMounted.current) {
					setIsLoading(false)
				}
			}
			loadData()
		}, [selectedSynthesis, getAndSetSyntheticCsvData, getAndSetEvaluateResult])

		return (
			<Flex vertical>
				<Flex gap={theme.spacing.m}>
					<Toggle
						label="Show advanced evaluation"
						inlineLabel
						checked={showAdvancedEvaluation}
						onChange={(_event, checked) =>
							setShowAdvancedEvaluation(checked === true)
						}
					/>
					<Toggle
						label="Show synthetic data"
						inlineLabel
						checked={showSyntheticData}
						onChange={(_event, checked) =>
							setShowSyntheticData(checked === true)
						}
					/>
				</Flex>
				{isLoading ? (
					<Spinner />
				) : (
					evaluateResult && (
						<Flex vertical gap={theme.spacing.m}>
							<h3>Evaluation summary</h3>
							<HumanReadableSummary
								evaluateResult={evaluateResult}
								synthesisInfo={selectedSynthesis}
							/>
							{showAdvancedEvaluation && (
								<>
									<h3>Advanced evaluation</h3>
									<div>TODO</div>
								</>
							)}
							{showSyntheticData && syntheticCsvContent && (
								<>
									<h3>Synthetic data</h3>
									<CsvTable
										content={syntheticCsvContent}
										commands={tableCommands}
									/>
								</>
							)}
						</Flex>
					)
				)}
			</Flex>
		)
	},
)
