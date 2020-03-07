import React, { memo, useContext, useState } from "react"
import Cookies from "js-cookie"

import SvgUser from "../images/user.svg"
import SvgMenu from "../images/menu.svg"
import socket from "../helpers/socket"
import { post } from "../helpers/fetch"

import { rootStore } from "../pages/rootStore"

const styledDropdown = window.innerWidth < 768 ? { top: '4rem', left: '0', width: '100%' } : { top: '3.3rem' }

const Topbar = () => {
    const { rootState, dispatch } = useContext(rootStore) 
    const { corp, personal, session } = rootState

    const [showDropdown, setDropdown] = useState(false)
    const toggleOpenMenu = () => dispatch({ type: "ROOT_TOGGLE_OPENMENU" })
    const openDropdown = () => setDropdown(!showDropdown)
    const closeDropdown = () => showDropdown && setDropdown(false)

    const logout = e => {
        e.preventDefault()
        const loginAnotherDevice = false
        post(`logout`, { loginAnotherDevice }).then(res => {            
            if (res.response) {                
                if (loginAnotherDevice) {
                    socket.emit('logout for other device', session)
                } else {
                    socket.emit('logout', session)
                }
                socket.off('user connected')
                socket.off('user disconnected')
                socket.off('private corp')
                socket.off('private menu')
                Cookies.remove('konsultan-session')
				dispatch({ type: "ROOT_UNSET_AUTH" })
            }
        })
    }
    
    return (
        <div className="bg-white border-b border-gray-200 z-50">
            <div className="container w-full mx-auto">
                <div className="flex items-center justify-between px-2 py-4 md:py-2">          
                    <div className="w-2/3 mx-2 text-left text-xl font-bold text-mine">
                        {corp.corpName}
                    </div>                    
                    <div className="w-1/3 flex flex-row-reverse md:flex-row justify-start md:justify-end items-center">
                        <div onClick={toggleOpenMenu} className="mx-2 md:mr-12 text-right cursor-pointer select-none">
                            <img src={SvgMenu} alt="menu" className="fill-current text-gray-900 h-6 w-6 block opacity-50 hover:text-mine" />
                        </div>
                        <button type="button" onClick={openDropdown} onBlur={closeDropdown} className="flex mx-2 items-center cursor-pointer select-none focus:outline-none">                        
                            <div>
                                <img src={SvgUser} className="inline-block h-8 w-8 p-1 rounded-full border border-mine-400" alt={personal.userName} />
                            </div>
                            <div className="hidden md:block md:flex md:items-center ml-2">
                                <span className="text-sm mr-1">{personal.userName}</span>
                                <div style={{ transform: showDropdown ? 'rotate(180deg)' : 'none', transition: 'transform .4s ease-out' }}>
                                    <svg className="fill-current text-gray-900 h-4 w-4 block opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M4.516 7.548c.436-.446 1.043-.481 1.576 0L10 11.295l3.908-3.747c.533-.481 1.141-.446 1.574 0 .436.445.408 1.197 0 1.615-.406.418-4.695 4.502-4.695 4.502a1.095 1.095 0 0 1-1.576 0S4.924 9.581 4.516 9.163c-.409-.418-.436-1.17 0-1.615z" /></svg>
                                </div>
                            </div>
                            {showDropdown && 
                                <div className="absolute bg-white border border-t-0 rounded-md border-gray-200 py-2 md:mr-2 shadow" style={styledDropdown}>
                                    <span type="button" className="w-full px-6 py-2 block hover:bg-mine-100">View Profile</span>
                                    <span type="button" className="w-full px-6 py-2 block hover:bg-mine-100">Edit Profile</span>
                                    <hr className="border-t mx-2 border-mine-200" />
                                    <span type="button" onClick={logout} className="w-full px-6 py-2 block hover:bg-red-100">Logout</span>
                                </div>
                            }
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default memo(Topbar)