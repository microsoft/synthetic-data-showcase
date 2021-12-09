/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { Dispatch, MutableRefObject, SetStateAction, useCallback } from 'react'
import { SetterOrUpdater } from 'recoil'
import { SdsWasmWorker } from 'src/workers/sds-wasm'
import { AttributeRows, INavigateResult, ISelectedAttributes } from '~models'

async function loadNewSelectedAttributeRows(
	setIsLoading: Dispatch<SetStateAction<boolean>>,
	newSelectedAttributes: ISelectedAttributes,
	worker: SdsWasmWorker | null,
	navigateResult: INavigateResult,
	isMounted: MutableRefObject<boolean>,
	setSelectedAttributes: SetterOrUpdater<ISelectedAttributes>,
	setSelectedAttributeRows: SetterOrUpdater<AttributeRows>,
) {
	const newSelectedAttributeRows =
		(await worker?.intersectSelectedAttributesWith(
			newSelectedAttributes,
			navigateResult.allRows,
			navigateResult.attrRowsMap,
		)) ?? navigateResult.allRows

	if (isMounted.current) {
		setSelectedAttributes(newSelectedAttributes)
		setSelectedAttributeRows(newSelectedAttributeRows)
		setIsLoading(false)
	}
}

export function useOnAttributeSelection(
	setIsLoading: Dispatch<SetStateAction<boolean>>,
	selectedAttributes: ISelectedAttributes,
	worker: SdsWasmWorker | null,
	navigateResult: INavigateResult,
	isMounted: MutableRefObject<boolean>,
	setSelectedAttributes: SetterOrUpdater<ISelectedAttributes>,
	setSelectedAttributeRows: SetterOrUpdater<AttributeRows>,
): (columnIndex: number, attr?: string) => Promise<void> {
	return useCallback(
		async (columnIndex, attr) => {
			setIsLoading(true)
			const newSelectedAttributes = {
				...selectedAttributes,
				[columnIndex]: attr,
			}

			if (!attr) {
				delete newSelectedAttributes[columnIndex]
			}
			await loadNewSelectedAttributeRows(
				setIsLoading,
				newSelectedAttributes,
				worker,
				navigateResult,
				isMounted,
				setSelectedAttributes,
				setSelectedAttributeRows,
			)
		},
		[
			selectedAttributes,
			navigateResult,
			worker,
			setSelectedAttributes,
			setSelectedAttributeRows,
			setIsLoading,
			isMounted,
		],
	)
}

export function useOnClearAttributeSelection(
	setIsLoading: Dispatch<SetStateAction<boolean>>,
	worker: SdsWasmWorker | null,
	navigateResult: INavigateResult,
	isMounted: MutableRefObject<boolean>,
	setSelectedAttributes: SetterOrUpdater<ISelectedAttributes>,
	setSelectedAttributeRows: SetterOrUpdater<AttributeRows>,
): () => Promise<void> {
	return useCallback(async () => {
		setIsLoading(true)
		await loadNewSelectedAttributeRows(
			setIsLoading,
			{},
			worker,
			navigateResult,
			isMounted,
			setSelectedAttributes,
			setSelectedAttributeRows,
		)
	}, [
		navigateResult,
		worker,
		setSelectedAttributes,
		setSelectedAttributeRows,
		setIsLoading,
		isMounted,
	])
}
