/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { ICommandBarItemProps, IContextualMenuItem } from '@fluentui/react'
import { useMemo } from 'react'

export function useEditColumnCommand(
	onClick?: (
		ev?: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>,
		item?: IContextualMenuItem,
	) => boolean | void,
): ICommandBarItemProps {
	const cmd = useMemo(() => {
		return {
			key: 'edit-column',
			text: 'Edit column',
			iconProps: {
				iconName: 'TripleColumnEdit',
			},
			onClick,
		}
	}, [onClick])
	return cmd
}
