/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import type { ICommandBarItemProps } from '@fluentui/react'
import type { MutableRefObject } from 'react'
import { useCallback, useMemo } from 'react'
import type { IEvaluateResult } from 'sds-wasm'

import type { ICsvContent } from '~models'
import { useDownloadCommand } from '~pages/hooks'
import { useSdsManagerInstance } from '~states'
import type { ISynthesisInfo } from '~workers/types'

import { useGetSyntheticCsvContent } from '../Synthesize.hooks.js'

export function useGetAndSetSyntheticCsvContent(
	setSyntheticCsvContent: (content: ICsvContent) => void,
	isMounted: MutableRefObject<boolean>,
): (selectedSynthesis: ISynthesisInfo) => Promise<void> {
	const getSyntheticCsvData = useGetSyntheticCsvContent()

	return useCallback(
		async (selectedSynthesis: ISynthesisInfo) => {
			const syntheticCsvData = await getSyntheticCsvData(selectedSynthesis)

			if (isMounted.current) {
				setSyntheticCsvContent(syntheticCsvData)
			}
		},
		[getSyntheticCsvData, setSyntheticCsvContent, isMounted],
	)
}

export function useGetAndSetEvaluateResult(
	setEvaluateResult: (evaluateResult: IEvaluateResult | null) => void,
	isMounted: MutableRefObject<boolean>,
): (selectedSynthesis: ISynthesisInfo) => Promise<void> {
	const [manager] = useSdsManagerInstance()

	return useCallback(
		async (selectedSynthesis: ISynthesisInfo) => {
			const evaluateResult =
				(await manager?.instance.getEvaluateResult(selectedSynthesis.key)) ??
				null

			if (isMounted.current) {
				setEvaluateResult(evaluateResult)
			}
		},
		[manager, setEvaluateResult, isMounted],
	)
}

export function useSyntheticTableCommands(
	content: ICsvContent,
): ICommandBarItemProps[] {
	const dlcmd = useDownloadCommand(content, 'synthetic_data.csv')
	return useMemo(() => [dlcmd], [dlcmd])
}
