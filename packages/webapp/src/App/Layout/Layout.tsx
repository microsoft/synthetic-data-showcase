/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { FlexContainer } from '@sds/components'
import { proxy } from 'comlink'
import React, { memo, useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import styled from 'styled-components'

import { Pages } from '~pages'
import {
	useAllSynthesisInfo,
	useIsProcessingSetter,
	usePreparedTable,
	useSdsManagerInstance,
	useSelectedTable,
} from '~states'
import type { SdsManager } from '~workers/SdsManager.js'
// eslint-disable-next-line
import SdsManagerWorker from '~workers/SdsManager?worker'
import { createWorkerProxy } from '~workers/utils'

import { Header } from './Header/index.js'
import { useOnTableChange } from './hooks/index.js'

export const Layout: React.FC = memo(function Layout({ children }) {
	const [managerInstance, setManagerInstance] = useSdsManagerInstance()
	const setIsProcessing = useIsProcessingSetter()
	const location = useLocation()
	const [selectedTable] = useSelectedTable()
	const [, setPreparedTable] = usePreparedTable()
	const [, setAllSynthesisInfo] = useAllSynthesisInfo()

	useOnTableChange()

	useEffect(() => {
		if (location.pathname !== Pages.Prepare.path) {
			setPreparedTable(selectedTable)
		}
	}, [location, setPreparedTable, selectedTable])

	useEffect(() => {
		async function getManager() {
			if (!managerInstance) {
				setIsProcessing(true)
				const workerProxy = createWorkerProxy<typeof SdsManager>(
					new SdsManagerWorker(),
				)
				const instance = await new workerProxy.ProxyConstructor('SdsManager')
				const updateSynthesisInfo = async () => {
					setAllSynthesisInfo(await instance.getAllSynthesisInfo())
				}

				await instance.init()
				setManagerInstance({ instance, workerProxy })
				await instance.registerSynthesisCallback(
					proxy({
						started: updateSynthesisInfo,
						finished: updateSynthesisInfo,
						progressUpdated: updateSynthesisInfo,
						terminated: updateSynthesisInfo,
					}),
				)
				setIsProcessing(false)
			}
		}
		getManager()
	}, [managerInstance, setManagerInstance, setAllSynthesisInfo, setIsProcessing])

	return (
		<Container vertical>
			<Header />
			<Main>
				<Outlet />
			</Main>
		</Container>
	)
})

const Container = styled(FlexContainer)`
	height: 100%;
`

const Main = styled.div`
	height: 100%;
	overflow-y: scroll;
	&::-webkit-scrollbar {
		display: none;
	}
`
