import { combineReducers } from "redux"
import { connectRouter } from "connected-react-router"
import root from "../pages/rootReducer"
// import data from './dataReducer'
// import login from './pages/login/loginReducer'
// import user from './pages/user/userReducer'
// import client from './pages/client/clientReducer'

const reducers = history => combineReducers({
    router: connectRouter(history),
    root,
    // data,   
    // login,
    // user,
    // client
})

export default reducers