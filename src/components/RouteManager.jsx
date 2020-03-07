import React, { useContext, useState, useEffect, lazy, Suspense, memo } from "react"
import { Switch, Route, withRouter } from "react-router"

import NotFound from "../pages/NotFound"
import { rootStore } from "../pages/rootStore"

const ucfirst = (x) => x.charAt(0).toUpperCase() + x.slice(1)

const Loading = () => (
	<div>
		loading...
	</div>
)

const LazyLoader = memo(props => {
	const { rootState: { isLogged } } = useContext(rootStore)

	const [Page, setPage] = useState(null)
	const { match: { params } } = props	

	useEffect(() => {
		if (isLogged) {
			switch (true) {
				case !params.page:
					const pageMain = lazy(() => import(`../pages/main/Main`))
					setPage(pageMain)
				break
				case params.action && true:
					const pageAction = lazy(() => import(`../pages/${params.page}/${ucfirst(params.page)}${ucfirst(params.action)}`))					
					setPage(pageAction)
				break
				default:
					const pageDefault = lazy(() => import(`../pages/${params.page}/${ucfirst(params.page)}`))
					setPage(pageDefault)					
			}
		} else {
			const pageLogin = lazy(() => import(`../pages/login/Login`))
			setPage(pageLogin)
		}
	}, [setPage, params, isLogged])

	return (
		<div className={isLogged ? "page-logged" : "page"}>
			<Suspense fallback={<Loading />}>
				{Page ? <Page /> : <NotFound />}
			</Suspense>
		</div>
	)
}, (p, n) => 
	p.location.pathname === n.location.pathname
)

const RouteManager = props => {
	const { rootState } = useContext(rootStore)
	const { isReady } = rootState
	const { location, location: { pathname } } = props

	return (
		<Switch location={location}>
			<Route
				exact
				path={`/:page?/:action?/:id?/:option?`}
				render={props => isReady ? <LazyLoader key={pathname} {...props} /> : <Loading />}
			/>
		</Switch>
	)
}
export default withRouter(RouteManager)