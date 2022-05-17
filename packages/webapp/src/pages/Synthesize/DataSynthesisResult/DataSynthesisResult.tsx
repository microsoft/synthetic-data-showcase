/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { Spinner, useTheme } from '@fluentui/react'
import { memo, useEffect, useRef, useState } from 'react'
import type { IEvaluateResult } from 'sds-wasm'

import { CollapsablePanel } from '~components/CollapsablePanel'
import { CsvTable } from '~components/CsvTable'
import { Flex } from '~components/Flexbox'
import { HumanReadableSummary } from '~components/HumanReadableSummary'
import type { ICsvContent } from '~models'
import { defaultCsvContent } from '~models'

import { DataEvaluation } from '../DataEvaluation'
import {
	useGetAndSetEvaluateResult,
	useGetAndSetSyntheticCsvContent,
	useSyntheticTableCommands,
} from './DataSynthesisResult.hooks'
import type { DataSynthesisResultProps } from './DataSynthesisResult.types'

export const DataSynthesisResult: React.FC<DataSynthesisResultProps> = memo(
	function DataSynthesisResult({ selectedSynthesis }) {
		const theme = useTheme()
		const isMounted = useRef(true)
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

		useEffect(() => {
			return () => {
				isMounted.current = false
			}
		}, [])

		return (
			<Flex vertical>
				{isLoading ? (
					<Spinner />
				) : (
					evaluateResult && (
						<Flex vertical gap={theme.spacing.m}>
							<CollapsablePanel
								header={<h3>Evaluation summary</h3>}
								defaultCollapsed
							>
								<HumanReadableSummary
									evaluateResult={evaluateResult}
									synthesisInfo={selectedSynthesis}
								/>
							</CollapsablePanel>

							<CollapsablePanel header={<h3>Advanced evaluation</h3>}>
								<DataEvaluation selectedSynthesis={selectedSynthesis} />
							</CollapsablePanel>

							{syntheticCsvContent && (
								<CollapsablePanel header={<h3>Synthetic data</h3>}>
									<CsvTable
										content={syntheticCsvContent}
										commands={tableCommands}
									/>
								</CollapsablePanel>
							)}
						</Flex>
					)
				)}
			</Flex>
		)
	},
)
