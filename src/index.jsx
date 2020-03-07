import React from "react"
import ReactDOM from "react-dom"

import { RootProvider } from "./pages/rootStore"

import App from "./App"
import "./styles/core.css"

const Root = () => (
    <RootProvider>        
        <App />        
    </RootProvider>
)

ReactDOM.render(<Root />, document.getElementById("root"))