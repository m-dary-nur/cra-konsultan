import { apiUrl } from "./url"

const get = async (requestUrl, params) => {
	const parameter = { ...params }
	const base = requestUrl.indexOf("http") !== -1 ? "" : apiUrl + "/"
	const esc = encodeURIComponent
	const objectKeys = Object.keys(parameter)
	const queryParams = objectKeys.length > 0 ? "?" + objectKeys.map(k => esc(k) + "=" + esc(parameter[k])).join("&") : ""
	return await fetch(base + requestUrl + queryParams, {
		method: "GET",
		mode: "cors",
		credentials: "include",
		headers: {
			"Accept": "application/json",
			"Content-Type": "text/plain"
		}
	}).then(raw => raw.json())
}

const post = async (requestUrl, params) => {
	const parameter = { ...params }
	const base = requestUrl.indexOf("http") !== -1 ? "" : apiUrl + "/"
	return await fetch(base + requestUrl, {
		method: "POST",
		mode: "cors",
		credentials: "include",
		headers: {
			"Accept": "application/json",
			"Content-Type": "application/json"
		},
		body: JSON.stringify(parameter)
	}).then(raw => raw.json())
}

// const postFile = async (requestUrl, params) => {
// 	const parameter = { ...params }
// 	let data = new FormData()
// 	Object.entries(parameter).map(([key, val]) => data.append(key, val))
// 	const base = requestUrl.indexOf("http") !== -1 ? "" : apiUrl + "/"
// 	return await fetch(base + requestUrl, {
// 		method: "POST",
// 		mode: "cors",
// 		credentials: "include",
// 		body: data
// 	}).then(raw => raw.json())
// }

const put = async (requestUrl, params) => {
	const parameter = { ...params }
	const base = requestUrl.indexOf("http") !== -1 ? "" : apiUrl + "/"
	return await fetch(base + requestUrl, {
		method: "PUT",
		mode: "cors",
		credentials: "include",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(parameter)
	}).then(raw => raw.json())
}

const del = async (requestUrl, params) => {
	const parameter = { ...params }
	const base = requestUrl.indexOf("http") !== -1 ? "" : apiUrl + "/"
	const esc = encodeURIComponent
	const queryParams =
		"?" +
		Object.keys(parameter)
			.map(k => esc(k) + "=" + esc(parameter[k]))
			.join("&")
	return await fetch(base + requestUrl + queryParams, {
		method: "DELETE",
		mode: "cors",
		credentials: "include",
		headers: {
			Accept: "application/json",
			"Content-Type": "text/plain"
		}
	}).then(raw => raw.json())
}

export { get, post, put, del }
