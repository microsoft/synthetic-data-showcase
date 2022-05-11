/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import React, { memo, useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import styled from 'styled-components'

import { Flex } from '~components/Flexbox'
import { Pages } from '~pages'
import { useOnTableChange } from '~pages/hooks'
import {
	useIsProcessingSetter,
	usePreparedTable,
	useSdsManagerInstance,
	useSelectedTable,
	useWasmWorker,
} from '~states'
import { SdsWasmWorker } from '~workers/sds-wasm'
import type { SdsManager } from '~workers/SdsManager'
import SdsManagerWorker from '~workers/SdsManager?worker'
import { createWorkerProxy } from '~workers/utils'

import { Header } from './Header'

export const Layout: React.FC = memo(function Layout({ children }) {
	const [worker, setWorker] = useWasmWorker()
	const [managerInstance, setManagerInstance] = useSdsManagerInstance()
	const setIsProcessing = useIsProcessingSetter()
	const location = useLocation()
	const [selectedTable] = useSelectedTable()
	const [, setPreparedTable] = usePreparedTable()

	useOnTableChange()

	useEffect(() => {
		if (location.pathname !== Pages.Prepare.path) {
			setPreparedTable(selectedTable)
		}
	}, [location, setPreparedTable, selectedTable])

	useEffect(() => {
		// TODO: this will get removed once everything
		// is moved to the sds manager
		async function getWorker() {
			if (!worker) {
				setIsProcessing(true)
				const w = new SdsWasmWorker()
				await w.init(
					import.meta.env.VITE_SDS_WASM_LOG_LEVEL as string,
					Number(import.meta.env.VITE_SDS_CONTEXT_CACHE_SIZE),
				)
				setWorker(w)
				setIsProcessing(false)
			}
		}

		async function getManager() {
			if (!managerInstance) {
				setIsProcessing(true)
				const workerProxy = createWorkerProxy<typeof SdsManager>(
					new SdsManagerWorker(),
				)
				const instance = await new workerProxy.ProxyConstructor('SdsManager')
				await instance.init(
					(
						await import('sds-wasm/sds_wasm_bg.wasm?url')
					).default,
					import.meta.env.VITE_SDS_WASM_LOG_LEVEL as string,
				)
				setManagerInstance({ instance, workerProxy })
				setIsProcessing(false)
			}
		}
		getWorker()
		getManager()
	}, [worker, setWorker, managerInstance, setManagerInstance, setIsProcessing])

	return (
		<Container vertical>
			<Header />
			<Main>
				<Outlet />
			</Main>
		</Container>
	)
})

const Container = styled(Flex)`
	height: 100%;
`

const Main = styled.div`
	height: 100%;
	overflow-y: scroll;
	&::-webkit-scrollbar {
		display: none;
	}
`
