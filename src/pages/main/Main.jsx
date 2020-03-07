import React, { useContext, useEffect } from "react"

import { rootStore } from "../rootStore"

const Main = () => {
    const { rootState } = useContext(rootStore)
    const { personal } = rootState

    useEffect(() => {
        document.title = "Greeting - Konsultan"
    })

    return (                
        <div className="container mx-auto px-2 sm:px-4 pt-6 pb-8">            
            Hai, {personal.userName}
        </div>        
    )
}

export default Main