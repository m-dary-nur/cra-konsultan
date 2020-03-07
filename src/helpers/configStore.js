import { applyMiddleware, compose, createStore } from "redux"
import thunk from "redux-thunk"
import { routerMiddleware } from "connected-react-router"
import reducers from "./configReducer"
import history from "./history"

export default function configStore(preloadedState) {
  const stores = createStore(
    reducers(history),
    preloadedState,
    compose(
      applyMiddleware(
        routerMiddleware(history),
        thunk
      )
    ),
  )

  return stores
}