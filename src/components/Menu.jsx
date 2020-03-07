import React, { memo, Fragment, useContext } from "react"

import SvgClose from "../images/close.svg"
import history from "../helpers/history"

import { rootStore } from "../pages/rootStore"

const MenuList = memo(({ menu }) => {    
    const { dispatch } = useContext(rootStore)
    const parent = menu.filter(x => x.parentId === 0 && x.action === "view")
    const handleClick = link => {
        history.push(link)
        dispatch({ type: "ROOT_TOGGLE_OPENMENU" })
    }
    return (
        <ul className="list-reset">
            {parent.map((x, i) => (
                <Fragment key={x.id}>
                <li className="px-2 pt-4 pb-1 text-gray-400">{x.label}</li>
                {menu.filter(y => y.parentId === x.id && y.action === "view").map(y => (
                    <li key={y.id} onClick={() => handleClick(y.link)} className="px-6 py-1 text-gray-500 cursor-pointer select-none rounded-md border border-white hover:bg-mine-100 hover:border-mine-400 hover:text-mine">
                        {y.label}
                    </li>
                ))}
                </Fragment>
            ))}
        </ul>
    )
})

const Menu = () => {
    const { rootState, dispatch } = useContext(rootStore)
    const { menu, isOpenMenu } = rootState
    const toggleOpenMenu = () => dispatch({ type: "ROOT_TOGGLE_OPENMENU" })
    return (         
        window.innerWidth < 768 ? 
        (isOpenMenu && 
        <div className="absolute w-full bg-white px-4 pb-4 right-0 shadow">            
            {menu && <MenuList menu={menu} />}
        </div>)
        :
        <div className={`fixed bg-white w-64 h-screen top-0 border-l border-mine-300 p-4 pt-0 shadow transition-all duration-300 ease-out z-50 ${isOpenMenu ? "right-0" : "right-minus-255"}`}>
            <div className="w-full flex flex-row-reverse md:flex-row items-center">
                <button onClick={toggleOpenMenu} className="px-1 py-4 md:py-4 md:pl-3 md:pr-7 focus:outline-none">
                    <img src={SvgClose} alt="close" className="w-4 h-4 opacity-50" />
                </button>
                <h3 className="px-4 text-center select-none">Menu</h3>
            </div>
            {menu && <MenuList menu={menu} />}
        </div>
    )
}

export default memo(Menu)