/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import React, { memo, useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import styled from 'styled-components'

import { Flex } from '../../components/Flexbox'
import { useOnTableChange } from '../../pages/hooks'
import {
	useIsProcessingSetter,
	usePreparedTable,
	useSelectedTable,
	useWasmWorker,
} from '../../states'
import { SdsWasmWorker } from '../../workers/sds-wasm'
import { Pages } from '../Pages'
import { Header } from './Header'

export const Layout: React.FC = memo(function Layout({ children }) {
	const [worker, setWorker] = useWasmWorker()
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
		if (!worker) {
			setIsProcessing(true)
			const w = new SdsWasmWorker()
			w.init(
				import.meta.env.VITE_SDS_WASM_LOG_LEVEL as string,
				Number(import.meta.env.VITE_SDS_CONTEXT_CACHE_SIZE),
			).then(() => {
				setWorker(w)
				setIsProcessing(false)
			})
		}
	}, [worker, setWorker, setIsProcessing])

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
