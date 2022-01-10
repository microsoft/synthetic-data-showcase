/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import {
	Step,
	StepType,
	Verb,
	BinStep,
	RecodeStep,
	BinArgs,
	RecodeArgs,
	runPipeline,
} from '@data-wrangling-components/core'
import { Bin, Recode } from '@data-wrangling-components/react'
import { PrimaryButton, Dropdown } from '@fluentui/react'
import ColumnTable from 'arquero/dist/types/table/column-table'
import React, { memo, useState, useCallback } from 'react'

enum Operation {
	None = 'none',
	Bin = 'bin',
	Recode = 'recode',
}

const operations = [
	{
		key: Operation.None,
		text: 'Select operation...',
	},
	{
		key: Operation.Bin,
		text: 'Bin values',
	},
	{
		key: Operation.Recode,
		text: 'Recode values',
	},
]

export interface DataTransformProps {
	table: ColumnTable
	onChange?: (table: ColumnTable) => void
}

// this is a temporary component to do column transforms on the arquero table
// it will soon be replaced by inline transforms within the table itself
export const DataTransform: React.FC<DataTransformProps> = memo(
	function DataTransform({ table, onChange }) {
		const [binStep, setBinStep] = useState<BinStep>({
			type: StepType.Verb,
			verb: Verb.Bin,
			input: 'input',
			output: 'input',
			args: {} as BinArgs,
		})

		const [recodeStep, setRecodeStep] = useState<RecodeStep>({
			type: StepType.Verb,
			verb: Verb.Recode,
			input: 'input',
			output: 'input',
			args: {} as RecodeArgs,
		})

		const [operation, setOperation] = useState<string | undefined>(
			Operation.None,
		)

		const handleClick = useCallback(async () => {
			const update = await runPipeline(
				table,
				operation === Operation.Bin ? binStep : recodeStep,
			)
			onChange && onChange(update)
		}, [onChange, operation, table, binStep, recodeStep])

		const handleBinChange = useCallback(
			(update: Step) => setBinStep(update as BinStep),
			[setBinStep],
		)
		const handleRecodeChange = useCallback(
			(update: Step) => setRecodeStep(update as RecodeStep),
			[setRecodeStep],
		)

		return (
			<div>
				<Dropdown
					selectedKey={operation}
					onChange={(e, opt) => setOperation(opt?.key as string)}
					options={operations}
					styles={{
						root: {
							width: 200,
						},
					}}
				/>
				{operation === Operation.Bin ? (
					<Bin step={binStep} table={table} onChange={handleBinChange} />
				) : operation === Operation.Recode ? (
					<Recode
						step={recodeStep}
						table={table}
						onChange={handleRecodeChange}
					/>
				) : null}
				{operation !== Operation.None ? (
					<PrimaryButton onClick={handleClick}>Run</PrimaryButton>
				) : null}
			</div>
		)
	},
)
