const socketIo = require('socket.io')
module.exports = (src) => socketIo(src, {
	cors: {
		origin: '*',
	},
})