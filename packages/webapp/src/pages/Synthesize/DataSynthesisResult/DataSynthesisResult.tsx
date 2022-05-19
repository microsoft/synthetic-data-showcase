/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import type { IPivotItemProps } from '@fluentui/react'
import { Pivot, PivotItem, Spinner, useTheme } from '@fluentui/react'
import { FlexContainer } from '@sds/components'
import { memo, useEffect, useRef, useState } from 'react'
import type { IEvaluateResult } from 'sds-wasm'

import { CsvTable } from '~components/CsvTable'
import { HumanReadableSummary } from '~components/HumanReadableSummary'
import type { ICsvContent } from '~models'
import { defaultCsvContent } from '~models'

import { DataEvaluation } from '../DataEvaluation'
import {
	useGetAndSetEvaluateResult,
	useGetAndSetSyntheticCsvContent,
	useSyntheticTableCommands,
} from './DataSynthesisResult.hooks'
import { StyledItem } from './DataSynthesisResult.styles'
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
		const [lastHeader, setLastHeader] = useState<
			{ props: IPivotItemProps } | undefined
		>(undefined)
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
			<FlexContainer vertical>
				{isLoading ? (
					<Spinner />
				) : (
					evaluateResult && (
						<FlexContainer vertical gap={theme.spacing.m}>
							<Pivot
								onLinkClick={setLastHeader}
								selectedKey={lastHeader?.props.itemKey}
							>
								<PivotItem
									headerText="Evaluation summary"
									itemKey="Evaluation summary"
								>
									<StyledItem>
										<HumanReadableSummary
											evaluateResult={evaluateResult}
											synthesisInfo={selectedSynthesis}
										/>
									</StyledItem>
								</PivotItem>
								<PivotItem
									headerText="Advanced evaluation"
									itemKey="Advanced evaluation"
								>
									<StyledItem>
										<DataEvaluation selectedSynthesis={selectedSynthesis} />
									</StyledItem>
								</PivotItem>
								{syntheticCsvContent && (
									<PivotItem
										headerText="Synthetic data"
										itemKey="Synthetic data"
									>
										<StyledItem>
											<CsvTable
												content={syntheticCsvContent}
												commands={tableCommands}
											/>
										</StyledItem>
									</PivotItem>
								)}
							</Pivot>
						</FlexContainer>
					)
				)}
			</FlexContainer>
		)
	},
)
