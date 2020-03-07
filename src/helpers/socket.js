import io from 'socket.io-client'
import { socketUrl } from './url'

const socket = io(socketUrl, {
	reconnection: true,
	reconnectionDelay: 1000,
	reconnectionDelayMax: 5000,
	reconnectionAttempts: Infinity,
	transports: ['websocket', 'polling'],
	secure: true,
	rejectUnauthorized: false,
	forceNew: false,
	timeout: 60000
})

export default socket