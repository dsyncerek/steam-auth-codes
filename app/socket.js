const config = require('../config.js');

module.exports = (io, sessionMiddleware) => {
    io.use((socket, next) => sessionMiddleware(socket.request, {}, next));

    io.on('connection', socket => {
        let user = socket.request.session.steamUser || {};
        let access = config.admins.includes(user.steamid) || !config.loginRequired;
        if (access) {
            socket.join('auth codes room');
            socket.emit('authorized', config.accounts);
        } else if (user.steamid) {
            socket.emit('forbidden', user._json);
        } else {
            socket.emit('unauthorized');
        }
    });
};