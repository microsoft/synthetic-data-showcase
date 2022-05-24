/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import type { ICommandBarItemProps } from '@fluentui/react'
import { useMemo } from 'react'
import type { SetterOrUpdater } from 'recoil'

import type { ICsvContent } from '~models'
import { useDownloadCommand } from '~pages/hooks'

import {
	useSensitiveZerosCommand,
	useSubjectIdCommand,
	useVisibleColumnsCommand,
} from './commands/index.js'

export function useSensitiveTableCommands(
	content: ICsvContent,
	setSensitiveContent: SetterOrUpdater<ICsvContent>,
): ICommandBarItemProps[] {
	const sidcmd = useSubjectIdCommand(content, setSensitiveContent)
	const vccmd = useVisibleColumnsCommand(content, setSensitiveContent)
	const cicmd = useSensitiveZerosCommand(content, setSensitiveContent)
	const dlcmd = useDownloadCommand(content, 'sensitive_data.csv')
	return useMemo(
		() => [sidcmd, vccmd, cicmd, dlcmd],
		[sidcmd, dlcmd, vccmd, cicmd],
	)
}
