const config = require('../config.js');

module.exports = (io, sessionMiddleware, authCodesEmitter) => {
    io.use((socket, next) => sessionMiddleware(socket.request, {}, next));

    io.on('connection', socket => {
        let user = (socket.request.session.steamUser && socket.request.session.steamUser._json) || {};
        let access = config.admins.includes(user.steamid) || !config.loginRequired;

        if (access === true) socket.join('auth codes room').emit('authorized', authCodesEmitter.getAuthCodes());
        else if (user.steamid !== undefined) socket.emit('forbidden');
        else socket.emit('unauthorized');
    });
};