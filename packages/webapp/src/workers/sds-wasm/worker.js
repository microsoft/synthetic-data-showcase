/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
let initLogger
let generate
let evaluate

function postProgress(id, progress) {
	postMessage({
		id,
		type: 'ReportProgress',
		progress,
	})
}

function calcAttributeRowsMap(items) {
	const attrRowsMap = {}

	items.forEach((record, i) => {
		record.forEach((value, columnIndex) => {
			if (!attrRowsMap[columnIndex]) {
				attrRowsMap[columnIndex] = {}
			}
			if (value) {
				if (!attrRowsMap[columnIndex][value]) {
					attrRowsMap[columnIndex][value] = []
				}
				attrRowsMap[columnIndex][value].push(i)
			}
		})
	})
	return attrRowsMap
}

function calcAttributesInColumnsMap(items) {
	const attrsInColumns = {}

	items.forEach(record => {
		record.forEach((value, columnIndex) => {
			if (!attrsInColumns[columnIndex]) {
				attrsInColumns[columnIndex] = new Set()
			}
			if (value) {
				attrsInColumns[columnIndex].add(value)
			}
		})
	})
	return attrsInColumns
}

function intersectAttributeRows(a, b) {
	const result = []
	let aIndex = 0
	let bIndex = 0

	while (aIndex < a.length && bIndex < b.length) {
		const aVal = a[aIndex]
		const bVal = b[bIndex]

		if (aVal > bVal) {
			bIndex++
		} else if (aVal < bVal) {
			aIndex++
		} else {
			result.push(aVal)
			aIndex++
			bIndex++
		}
	}
	return result
}

function getAggregatedCount(headers, aggregatedCombinations, selected) {
	if (!selected) {
		return undefined
	}
	const key = Object.entries(selected)
		.map(entry => `${headers[entry[0]]}:${entry[1]}`)
		.sort()
		.join(';')

	return aggregatedCombinations?.[key]?.count
}

async function handleInit(message) {
	// eslint-disable-next-line no-undef
	importScripts(message.wasmJsPath)

	// eslint-disable-next-line no-undef
	initLogger = wasm_bindgen.init_logger
	// eslint-disable-next-line no-undef
	generate = wasm_bindgen.generate
	// eslint-disable-next-line no-undef
	evaluate = wasm_bindgen.evaluate

	// eslint-disable-next-line no-undef
	await wasm_bindgen(message.wasmPath)

	initLogger(message.logLevel)

	return {
		id: message.id,
		type: message.type,
	}
}

function handleGenerate(message) {
	return {
		id: message.id,
		type: message.type,
		records: generate(
			message.csvContent,
			message.useColumns,
			message.sensitiveZeros,
			message.recordLimit,
			message.resolution,
			message.cacheSize,
			p => {
				postProgress(message.id, p)
			},
		),
	}
}

function handleEvaluate(message) {
	return {
		id: message.id,
		type: message.type,
		evaluatedResult: evaluate(
			message.sensitiveCsvContent,
			message.syntheticCsvContent,
			message.useColumns,
			message.sensitiveZeros,
			message.recordLimit,
			message.reportingLength,
			message.resolution,
			p => {
				postProgress(message.id, p)
			},
		),
	}
}

function handleNavigate(message) {
	return {
		id: message.id,
		type: message.type,
		navigateResult: {
			attrRowsMap: calcAttributeRowsMap(message.syntheticCsvContent),
			attrsInColumnsMap: calcAttributesInColumnsMap(
				message.syntheticCsvContent,
			),
			allRows: message.syntheticCsvContent.map((_, i) => i),
		},
	}
}

function handleIntersectSelectedAttributes(message) {
	let newSelectedAttributeRows = message.initialRows

	Object.entries(message.selectedAttributes).forEach(entry => {
		newSelectedAttributeRows =
			intersectAttributeRows(
				newSelectedAttributeRows,
				message.attrRowsMap[entry[0]][entry[1]],
			) ?? []
	})
	return {
		id: message.id,
		type: message.type,
		intersectionResult: newSelectedAttributeRows,
	}
}

function handleIntersectAttributeInColumns(message) {
	const result = []

	const selectedAttribute = message.selectedAttributes[message.columnIndex]
	const selectedAttributesButCurrentColumn = {
		...message.selectedAttributes,
	}
	let selectedAttributeRowsButCurrentColumn

	if (selectedAttribute !== undefined) {
		delete selectedAttributesButCurrentColumn[message.columnIndex]
		selectedAttributeRowsButCurrentColumn = handleIntersectSelectedAttributes({
			initialRows: message.initialRows,
			selectedAttributes: selectedAttributesButCurrentColumn,
			attrRowsMap: message.attrRowsMap,
		}).intersectionResult
	} else {
		selectedAttributeRowsButCurrentColumn = message.selectedAttributeRows
	}

	message.attrsInColumn.forEach(attr => {
		const estimatedCount =
			intersectAttributeRows(
				attr === selectedAttribute
					? message.selectedAttributeRows
					: selectedAttributeRowsButCurrentColumn,
				message.attrRowsMap[message.columnIndex][attr],
			)?.length ?? 0

		if (estimatedCount > 0) {
			result.push({
				value: attr,
				estimatedCount,
				actualCount: getAggregatedCount(
					message.headers,
					message.sensitiveAggregatedCombinations,
					{
						...(attr === selectedAttribute
							? message.selectedAttributes
							: selectedAttributesButCurrentColumn),
						[message.columnIndex]: attr,
					},
				),
			})
		}
	})
	// sort descending by estimated count
	result.sort((a, b) => b.estimatedCount - a.estimatedCount)
	return {
		id: message.id,
		type: message.type,
		intersectionResult: result,
	}
}

onmessage = async event => {
	const message = event?.data
	let response = undefined

	switch (message?.type) {
		case 'Init': {
			response = await handleInit(message)
			break
		}
		case 'Generate': {
			response = handleGenerate(message)
			break
		}
		case 'Evaluate': {
			response = handleEvaluate(message)
			break
		}
		case 'Navigate': {
			response = handleNavigate(message)
			break
		}
		case 'IntersectSelectedAttributes': {
			response = handleIntersectSelectedAttributes(message)
			break
		}
		case 'IntersectAttributesInColumns': {
			response = handleIntersectAttributeInColumns(message)
			break
		}
		default: {
			break
		}
	}
	postMessage(response)
}
