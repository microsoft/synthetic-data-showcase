/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import type { FC, PropsWithChildren } from 'react'
import { memo } from 'react'
import { RecoilRoot } from 'recoil'

export const DataContext: FC<
	PropsWithChildren<{
		/* nothing */
	}>
> = memo(function DataContext({ children }) {
	return <RecoilRoot>{children}</RecoilRoot>
})
