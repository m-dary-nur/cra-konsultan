

export const appUrl = window.location.origin

let apiUrl, socketUrl
if (process.env.NODE_ENV === 'development') {    
    apiUrl = 'http://localhost:13131'
    socketUrl = 'http://localhost:13131'
} else {
    apiUrl = 'https://dys-resources.com:13131'
    socketUrl = 'https://dys-resources.com:13131'
}

export { apiUrl, socketUrl }
