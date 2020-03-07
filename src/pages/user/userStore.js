import React, { createContext, useReducer } from "react"

const initialState = {

}

const userStore = createContext(initialState)
const { Provider } = userStore


/* ================================================= REDUCER ====================================================== */
const reducer = (state, action) => {
	const payload = action.payload
	switch (action.type) {		
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

const UserProvider = ({ children }) => {
	const [userState, dispatch] = useReducer(reducer, initialState)

	return (
		<Provider value={{ userState, dispatch }}>
			{children}
		</Provider>
	)
}

export { userStore, UserProvider }