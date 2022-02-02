/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import {
	getTheme,
	IStackStyles,
	IStackTokens,
	Pivot,
	PivotItem,
	Stack,
} from '@fluentui/react'
import { memo, useCallback, useEffect } from 'react'
import { DataEvaluation } from './DataEvaluation'
import { DataInput } from './DataInput'
import { DataNavigation } from './DataNavigation'
import { DataSynthesis } from './DataSynthesis'
import { useCanRun, useOnGetAllAssetsDownloadInfo } from './hooks'
import { ProcessingProgress } from '~components/ProcessingProgress'
import { DownloadButton } from '~components/controls/DownloadButton'
import { PipelineStep } from '~models'
import {
	useIsProcessingSetter,
	useSelectedPipelineStep,
	useWasmWorker,
} from '~states/dataShowcaseContext'
import { SdsWasmWorker } from '~workers/sds-wasm'

export const DataShowcasePage: React.FC = memo(function DataShowcasePage() {
	const [worker, setWorker] = useWasmWorker()
	const [selectedPipelineStep, setSelectedPipelineStep] =
		useSelectedPipelineStep()
	const setIsProcessing = useIsProcessingSetter()
	const canRun = useCanRun()

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

	const onTabChange = useCallback(
		(item?: PivotItem) => {
			setSelectedPipelineStep(item?.props.itemKey ?? PipelineStep.Prepare)
		},
		[setSelectedPipelineStep],
	)

	const onGetAllAssetsDownloadInfo = useOnGetAllAssetsDownloadInfo()

	let currentTab

	switch (selectedPipelineStep) {
		case PipelineStep.Prepare:
			currentTab = <DataInput />
			break
		case PipelineStep.Synthesize:
			currentTab = <DataSynthesis />
			break
		case PipelineStep.Evaluate:
			currentTab = <DataEvaluation />
			break
		case PipelineStep.Navigate:
			currentTab = <DataNavigation />
			break
	}

	// initialize worker if not already
	useEffect(() => {
		if (!worker) {
			setIsProcessing(true)
			const w = new SdsWasmWorker()
			w.init(import.meta.env.VITE_SDS_WASM_LOG_LEVEL as string).then(() => {
				setWorker(w)
				setIsProcessing(false)
			})
		}
	}, [worker, setWorker, setIsProcessing])

	return (
		<Stack styles={mainStackStyles} tokens={mainStackTokens}>
			{selectedPipelineStep !== PipelineStep.Navigate ? (
				<Stack
					horizontal
					tokens={mainStackTokens}
					horizontalAlign="space-between"
					verticalAlign="center"
				>
					<Pivot
						selectedKey={selectedPipelineStep}
						onLinkClick={onTabChange}
						headersOnly
					>
						<PivotItem
							headerText={PipelineStep.Prepare}
							itemKey={PipelineStep.Prepare}
						/>
						<PivotItem
							headerText={PipelineStep.Synthesize}
							itemKey={PipelineStep.Synthesize}
						/>
						<PivotItem
							headerText={PipelineStep.Evaluate}
							itemKey={PipelineStep.Evaluate}
						/>
						<PivotItem
							headerText={PipelineStep.Navigate}
							itemKey={PipelineStep.Navigate}
						/>
					</Pivot>
					<ProcessingProgress />
					{canRun && (
						<DownloadButton
							label="Download all assets"
							onGetDownloadInfo={onGetAllAssetsDownloadInfo}
						/>
					)}
				</Stack>
			) : (
				<></>
			)}

			<Stack.Item>{currentTab}</Stack.Item>
		</Stack>
	)
})
