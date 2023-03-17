/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { useThematic } from '@thematic/react'
import { useMemo } from 'react'

export function useNominalScale(): string[] {
	const themetic = useThematic()

	return useMemo(() => {
		// adding blue from previous versions to keep consistence
		return ['rgb(128 172 247)', ...themetic.scales().nominal().toArray()]
	}, [themetic])
}

export function useNominalBoldScale(): string[] {
	const themetic = useThematic()

	return useMemo(() => {
		// adding blue from previous versions to keep consistence
		return ['rgb(0 95 174)', ...themetic.scales().nominalBold().toArray()]
	}, [themetic])
}

export function useNominalMutedScale(): string[] {
	const themetic = useThematic()

	return useMemo(() => {
		// adding blue from previous versions to keep consistence
		return ['rgb(207 212 228)', ...themetic.scales().nominalMuted().toArray()]
	}, [themetic])
}
