/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import React, { lazy, memo } from 'react'
import { Routes as Switch, Route, Navigate } from 'react-router-dom'
import { Pages } from './Pages'

const DataShowcasePageLazy = lazy(
	() =>
		/* webpackChunkName: "EvaluationPage" */ import(
			'~components/Pages/DataShowcasePage'
		),
)

export const Routes: React.FC = memo(function Routes() {
	return (
		<Switch>
			<Route path="/" element={<Navigate to={Pages.DataShowcase.path} />} />
			<Route
				path={Pages.DataShowcase.path}
				element={<DataShowcasePageLazy />}
			/>
		</Switch>
	)
})
