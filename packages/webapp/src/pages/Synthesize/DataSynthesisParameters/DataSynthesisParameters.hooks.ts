/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import type { IDropdownOption, IInputProps } from '@fluentui/react'
import { DropdownMenuItemType } from '@fluentui/react'
import { useCallback, useMemo } from 'react'
import type { SetterOrUpdater } from 'recoil'

import type { IRawSynthesisParameters } from '~models'
import {
	AccuracyMode,
	defaultThreshold,
	NoisyCountThresholdType,
	OversamplingType,
	UseSyntheticCounts,
} from '~models'
import { useRawSynthesisParameters } from '~states'
import { SynthesisMode } from '~workers/types'

export function useNoisyCountThresholdChange(
	noisyCountThreshold: IInputProps,
	setRawSynthesisParams: SetterOrUpdater<IRawSynthesisParameters>,
): {
	[length: number]: (
		event: React.SyntheticEvent<HTMLElement>,
		newValue?: string,
	) => void
} {
	return useMemo(() => {
		const handlers = {}

		for (const l of Object.keys(noisyCountThreshold)) {
			handlers[+l] = (_event, newValue?) => {
				const val = +(newValue || 0)
				if (!isNaN(val)) {
					setRawSynthesisParams(prev => ({
						...prev,
						threshold: {
							...prev.threshold,
							[l]: val,
						},
					}))
				}
			}
		}
		return handlers
	}, [noisyCountThreshold, setRawSynthesisParams])
}

export function useNoisyCountThresholdTypeOptions(): IDropdownOption[] {
	return [
		{ key: NoisyCountThresholdType.Fixed, text: NoisyCountThresholdType.Fixed },
		{
			key: NoisyCountThresholdType.Adaptive,
			text: NoisyCountThresholdType.Adaptive,
		},
	]
}

export function useOversamplingTypeOptions(): IDropdownOption[] {
	return [
		{ key: OversamplingType.Unlimited, text: OversamplingType.Unlimited },
		{ key: OversamplingType.Controlled, text: OversamplingType.Controlled },
	]
}

export function useAccuracyModeOptions(): IDropdownOption[] {
	return [
		{
			key: AccuracyMode.PrioritizeLargeCounts,
			text: AccuracyMode.PrioritizeLargeCounts,
		},
		{
			key: AccuracyMode.PrioritizeSmallCounts,
			text: AccuracyMode.PrioritizeSmallCounts,
		},
		{ key: AccuracyMode.Balanced, text: AccuracyMode.Balanced },
	]
}

export function useSynthesisModeOptions(): IDropdownOption[] {
	return [
		{
			key: 'K-Anonymity',
			text: 'K-Anonymity',
			itemType: DropdownMenuItemType.Header,
		},
		{ key: SynthesisMode.RowSeeded, text: SynthesisMode.RowSeeded },
		{ key: SynthesisMode.ValueSeeded, text: SynthesisMode.ValueSeeded },
		{ key: SynthesisMode.AggregateSeeded, text: SynthesisMode.AggregateSeeded },
		{ key: SynthesisMode.Unseeded, text: SynthesisMode.Unseeded },
		{
			key: 'Differential Privacy Header',
			text: SynthesisMode.DP,
			itemType: DropdownMenuItemType.Header,
		},
		{ key: SynthesisMode.DP, text: `DP ${SynthesisMode.AggregateSeeded}` },
	]
}

export function useUseSyntheticCountOptions(): IDropdownOption[] {
	return [
		{ key: UseSyntheticCounts.Yes, text: UseSyntheticCounts.Yes },
		{ key: UseSyntheticCounts.No, text: UseSyntheticCounts.No },
	]
}

export function useUpdateNoisyCountThreshold(): (
	reportingLength: number,
) => void {
	const [, setRawSynthesisParams] = useRawSynthesisParameters()

	return useCallback(
		(reportingLength: number) => {
			setRawSynthesisParams(prev => {
				if (reportingLength - 1 !== Object.keys(prev.threshold).length) {
					const newValues = {}
					for (let i = 2; i <= reportingLength; ++i) {
						newValues[i] = prev.threshold[i] || defaultThreshold
					}
					return {
						...prev,
						threshold: newValues,
					}
				}
				return prev
			})
		},
		[setRawSynthesisParams],
	)
}
