import React, { useContext, useEffect } from "react"
import { Router } from "react-router-dom"
import Cookies from "js-cookie"

import Topbar from "./components/Topbar"
import Menu from "./components/Menu"
import RouteManager from "./components/RouteManager"
import history from "./helpers/history"
import socket from "./helpers/socket"
import { get } from "./helpers/fetch"

import { rootStore } from "./pages/rootStore"

const App = () => {
    const { rootState, dispatch } = useContext(rootStore)
	const { isLogged, session } = rootState

    useEffect(() => {
        if (Cookies.get("konsultan-session")) {
            get(`refresh`).then(res => {
                if (res.response) {
                    socket.on('user connected', param => {
                        console.log('[socket user connected]', param)
                        if (param.user === session.user) {
                            console.log('[socket user connected]','Logout otomatis karena akun anda telah login di perangkat lain.')
                        }
                    })
            
                    /* user disconnected from socket */
                    socket.on('user disconnected', param =>
                        console.log('[socket user disconnected]', param)
                    )			
            
                    /* handle change user data */
                    socket.on('private personal', param => {
                        if (isLogged && param.id === session.user) {
                            console.log('[socket private personal]', param)
                        }
                    })
            
                    /* handle change user's menu data */
                    socket.on('private menu', param => {
                        console.log('[socket private menu]', param)
                    })
            
                    socket.emit('user connected', res.response.session)                    
    
                    const privilege = JSON.parse(res.response.personal.privilege)
                    const menuFiltered = res.response.menu.filter(o => privilege.indexOf(o.id) !== -1 || o.parentId === 0)
    
                    dispatch({ type: "ROOT_SET_AUTH", payload: { ...res.response, menu: menuFiltered, isRefresh: true } })
                    dispatch({ type: "ROOT_SET_READY" })
    
                    if (window.location.pathname === '/login') history.push('/')
                }
            })
		} else {
			dispatch({ type: "ROOT_SET_READY" })
		}
	}, [dispatch, isLogged, session.user])

    return (
        <div className="bg-gray-100 font-mine font-medium text-sm text-gray-600 h-full w-full">
            <Router history={history}>
                {isLogged && <><Topbar /><Menu /></>}
                <RouteManager />
            </Router>
        </div>
    )
}

export default App