import React, { createContext, useReducer } from "react"
import Cookies from "js-cookie"

const initialState = {
	isReady: false,
	isLogged: false,
	'isOpenMenu': false,
	corp: {},
	personal: {},
	session: {},
	menu: [],
	// global data 
	user: [],
}

const rootStore = createContext(initialState)
const { Provider } = rootStore


/* ================================================= REDUCER ====================================================== */
const reducer = (state, action) => {
	const payload = action.payload
	switch (action.type) {
		case "ROOT_SET_READY":
			return {
				...state,
				isReady: true
			}
		case "ROOT_SET_LOGGED":
			return {
				...state,
				isLogged: payload
			}
		case "ROOT_TOGGLE_OPENMENU":
			return {
				...state,
				isOpenMenu: !state.isOpenMenu
			}
		case "ROOT_SET_AUTH":
			const { corp, personal, session, menu, token, isRefresh } = payload
			if (!isRefresh) {
				Cookies.set("konsultan-session", token)
			}
			return {
				...state,
				isLogged: true,
				corp,
				personal,
				session,
				menu
			}
		case "ROOT_UNSET_AUTH":
			return {
				...state,
				isLogged: false,
				corp: {},
				personal: {},
				session: {},
				menu: [],
			}	
		case "ROOT_SET_MENU":
			return {
				...state,
				menu: payload
			}	
		default:
			throw new Error()
	}
}

/* ================================================= PROVIDER ====================================================== */

const RootProvider = ({ children }) => {
	const [rootState, dispatch] = useReducer(reducer, initialState)

	return (
		<Provider value={{ rootState, dispatch }}>
			{children}
		</Provider>
	)
}

export { rootStore, RootProvider }