import React, { useContext, useEffect, useState, memo, useRef } from "react"

import LogoSVg from "../../images/logo.svg"
import Field from "../../components/Field"
import Checkbox from "../../components/Checkbox"
import socket from "../../helpers/socket"
import history from "../../helpers/history"
import { post } from "../../helpers/fetch"

import { rootStore } from "../rootStore"

const Login = () => {
	const { rootState, dispatch } = useContext(rootStore)
	const { session } = rootState
	const [form, setForm] = useState({
		code: '111',
		email: 'dary@email.com',
		password: '123',
		remember: true
	})

	const handleField = e => setForm({ ...form, [e.target.id]: e.target.value })
	const handleEnterCode = e => {
		if (e.keyCode === 13) {
			e.preventDefault()
			email.current.focus()
		}
	}
	const handleEnterEmail = e => {
		if (e.keyCode === 13) {
			e.preventDefault()
			password.current.focus()
		}
	}
	const handleCheckbox = e => {
		setForm({ ...form, [e.target.id]: !form.remember })
	}
	const handleSubmit = e => {
		e.preventDefault()
		post(`login`, form).then(res => {
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
					if (param.id === session.user) {
						console.log('[socket private personal]', param)
					}
				})
		
				/* handle change user's menu data */
				socket.on('private menu', param => {
					console.log('[socket private menu]', param)
				})
		
				socket.emit('user connected', res.response.session)

				if (form.remember) {
					localStorage.konsultanRemember = true
					localStorage.konsultanCode = form.code
					localStorage.konsultanEmail = form.email                
				} else {
					localStorage.removeItem('konsultanRemember')
					localStorage.removeItem('konsultanCode')
					localStorage.removeItem('konsultanEmail')
				}

				const privilege = JSON.parse(res.response.personal.privilege)
				const menuFiltered = res.response.menu.filter(o => privilege.indexOf(o.id) !== -1 || o.parentId === 0)

				dispatch({ type: "ROOT_SET_AUTH", payload: { ...res.response, menu: menuFiltered, isRefresh: false, isLogged: true } })

				if (window.location.pathname === '/login') history.push('/')
			}
		})
	}

	const email = useRef()
	const password = useRef()

	useEffect(() => {
		document.title = "Login - Konsultan"
	}, [])

	return (
		<div className="flex justify-center items-center h-screen">
			<div className="block lg:flex bg-white lg:shadow-lg rounded-lg">
				<div className="w-full lg:w-1/3 flex lg:border-r border-gray-200">
					<div className="m-auto rounded-full">
						<a href="/" className="flex items-base pt-10 lg:p-2 -mb-10 lg:-mb-0">
							<img src={LogoSVg} alt="logo" className="w-12 lg:w-48" />
							<div className="flex items-center lg:hidden text-2xl text-mine font-semibold justify-center">Konsultan</div>
						</a>
					</div>
				</div>
				<div className="w-full lg:w-2/3 px-6 py-10">
					<div className="my-2 text-xl text-center md:text-left text-mine-500">Login</div>
					<form onSubmit={handleSubmit}>
						<div className="mb-4">
							<label htmlFor="code" className="block mb-2 text-sm text-gray-800">Kode</label>
							<Field id="code" value={form.code} onChange={handleField} onKeyDown={handleEnterCode} />		
						</div>
						<div className="mb-4">
							<label htmlFor="email" className="block mb-2 text-sm text-gray-800">Email</label>
							<Field id="email" ref={email} value={form.email} onChange={handleField} onKeyDown={handleEnterEmail} />
						</div>
						<div className="mb-4">
							<label htmlFor="password" className="block mb-2 text-sm text-gray-800">Password</label>
							<Field type="password" id="password" ref={password} value={form.password} onChange={handleField} />
						</div>
						<label className="mb-4 flex items-center">
							<Checkbox id="remember" value={form.remember} onChange={handleCheckbox} label="Ingat kode & email saya" />
						</label>
						<div className="block md:flex items-center justify-between">
							<button type="submit" className="align-middle bg-white border border-mine-500 hover:border-mine-600 text-center px-4 py-2 text-mine-500 hover:text-mine-600 text-base font-semibold rounded-md inline-block shadow-sm">
								Login
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	)
}


export default memo(Login)