/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { ICommandBarItemProps } from '@fluentui/react'
import { useMemo } from 'react'
import { SetterOrUpdater } from 'recoil'
import {
	useDownloadCommand,
	useEditColumnCommand,
	useMicrodataIdCommand,
	useSensitiveZerosCommand,
	useVisibleColumnsCommand,
} from './commands'
import { ICsvContent } from '~models'
import {} from './commands/useEditColumnCommand'

export function useSensitiveTableCommands(
	content: ICsvContent,
	setSensitiveContent: SetterOrUpdater<ICsvContent>,
	showColumnTransform: () => void,
): ICommandBarItemProps[] {
	const mdcmd = useMicrodataIdCommand(content, setSensitiveContent)
	const vccmd = useVisibleColumnsCommand(content, setSensitiveContent)
	const cicmd = useSensitiveZerosCommand(content, setSensitiveContent)
	const edcmd = useEditColumnCommand(showColumnTransform)
	const dlcmd = useDownloadCommand(content, 'sensitive_data.csv')
	return useMemo(
		() => [mdcmd, vccmd, cicmd, edcmd, dlcmd],
		[mdcmd, dlcmd, vccmd, edcmd, cicmd],
	)
}
