/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import type { IEvaluateResult, IMultiValueColumns } from '@essex/sds-core'
import type { ICommandBarItemProps } from '@fluentui/react'
import type { Dispatch, MutableRefObject, SetStateAction } from 'react'
import { useCallback, useMemo } from 'react'

import type { ICsvContent } from '~models'
import { useDownloadCommand } from '~pages/hooks'
import { useSdsManagerInstance, useSensitiveContent } from '~states'
import type { ISynthesisInfo } from '~workers/types'

import { usableMultiValueColumns } from '../../../utils/index.js'
import { useGetSyntheticCsvContent } from '../Synthesize.hooks.js'

export function useGetAndSetSyntheticCsvContent(
	setSyntheticCsvContent: (content: ICsvContent) => void,
	isMounted: MutableRefObject<boolean>,
): (
	selectedSynthesis: ISynthesisInfo,
	joinMultiValueColumns: boolean,
) => Promise<void> {
	const getSyntheticCsvData = useGetSyntheticCsvContent()

	return useCallback(
		async (
			selectedSynthesis: ISynthesisInfo,
			joinMultiValueColumns: boolean,
		) => {
			const syntheticCsvData = await getSyntheticCsvData(
				selectedSynthesis,
				joinMultiValueColumns,
			)

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

export function useSensitiveMultiValueColumns(): IMultiValueColumns {
	const [sensitiveContent] = useSensitiveContent()

	return useMemo(() => {
		return usableMultiValueColumns(sensitiveContent)
	}, [sensitiveContent])
}

export function useToggleJoinMultiValueColumnsCommand(
	joinMultiValueColumns: boolean,
	setJoinMultiValueColumns: Dispatch<SetStateAction<boolean>>,
): ICommandBarItemProps | null {
	const multiValueColumns = useSensitiveMultiValueColumns()

	return useMemo(() => {
		if (Object.keys(multiValueColumns).length > 0) {
			return {
				key: 'multi-values',
				text: `Join multi-values ${joinMultiValueColumns ? 'on' : 'off'}`,
				iconProps: {
					iconName: joinMultiValueColumns ? 'ToggleRight' : 'ToggleLeft',
				},
				onClick: () => {
					setJoinMultiValueColumns(prev => !prev)
				},
			}
		} else {
			return null
		}
	}, [multiValueColumns, joinMultiValueColumns, setJoinMultiValueColumns])
}

export function useSyntheticTableCommands(
	content: ICsvContent,
	joinMultiValueColumns: boolean,
	setJoinMultiValueColumns: Dispatch<SetStateAction<boolean>>,
): ICommandBarItemProps[] {
	const dlcmd = useDownloadCommand(content, 'synthetic_data.csv')
	const tjcmd = useToggleJoinMultiValueColumnsCommand(
		joinMultiValueColumns,
		setJoinMultiValueColumns,
	)
	return useMemo(
		() => [dlcmd, tjcmd].filter(cmd => cmd !== null) as ICommandBarItemProps[],
		[dlcmd, tjcmd],
	)
}
