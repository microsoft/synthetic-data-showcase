/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import type { IDropdownOption, IInputProps } from '@fluentui/react'
import { useMemo } from 'react'
import type { SetterOrUpdater } from 'recoil'
import type { IInputNumberByLength } from 'sds-wasm'

import {
	NoisyCountThresholdType,
	OversamplingType,
	PrivacyBudgetProfile,
	UseSyntheticCounts,
} from '~models'
import { SynthesisMode } from '~workers/types'

export function useNoisyCountThresholdChange(
	noisyCountThreshold: IInputProps,
	setNoisyCountThreshold: SetterOrUpdater<IInputNumberByLength>,
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
					setNoisyCountThreshold(prev => ({ ...prev, [l]: val }))
				}
			}
		}
		return handlers
	}, [noisyCountThreshold, setNoisyCountThreshold])
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

export function usePrivacyBudgetProfileOptions(): IDropdownOption[] {
	return [
		{ key: PrivacyBudgetProfile.Flat, text: PrivacyBudgetProfile.Flat },
		{
			key: PrivacyBudgetProfile.ProportionallyIncreasing,
			text: PrivacyBudgetProfile.ProportionallyIncreasing,
		},
		{
			key: PrivacyBudgetProfile.ProportionallyDecreasing,
			text: PrivacyBudgetProfile.ProportionallyDecreasing,
		},
	]
}

export function useSynthesisModeOptions(): IDropdownOption[] {
	return [
		{ key: SynthesisMode.Unseeded, text: SynthesisMode.Unseeded },
		{ key: SynthesisMode.RowSeeded, text: SynthesisMode.RowSeeded },
		{ key: SynthesisMode.ValueSeeded, text: SynthesisMode.ValueSeeded },
		{ key: SynthesisMode.AggregateSeeded, text: SynthesisMode.AggregateSeeded },
		{ key: SynthesisMode.DP, text: SynthesisMode.DP },
	]
}

export function useUseSyntheticCountOptions(): IDropdownOption[] {
	return [
		{ key: UseSyntheticCounts.Yes, text: UseSyntheticCounts.Yes },
		{ key: UseSyntheticCounts.No, text: UseSyntheticCounts.No },
	]
}
