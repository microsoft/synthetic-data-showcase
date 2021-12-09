/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { useThematic } from '@thematic/react'
import { useMemo } from 'react'

export function useEstimatedNominalColor(): string {
	const thematic = useThematic()
	return useMemo(() => {
		return thematic.scales().nominal().toArray()[0]
	}, [thematic])
}

export function useActualNominalColor(): string {
	const thematic = useThematic()
	return useMemo(() => {
		return thematic.scales().nominal().toArray()[1]
	}, [thematic])
}

export function useEstimatedBoldedColor(): string {
	const thematic = useThematic()
	return useMemo(() => {
		return thematic.scales().nominalBold().toArray()[0]
	}, [thematic])
}

export function useActualBoldedColor(): string {
	const thematic = useThematic()
	return useMemo(() => {
		return thematic.scales().nominalBold().toArray()[1]
	}, [thematic])
}
