const config = require('../config.js');

module.exports = (io, sessionMiddleware) => {
    io.use((socket, next) => sessionMiddleware(socket.request, {}, next));

    io.on('connection', socket => {
        let user = socket.request.session.steamUser || {};
        let access = config.admins.includes(user.steamid);
        if (user.steamid && access) {
            user = user._json;
            socket.join('auth codes room');
            socket.emit('logged', {user, authData: config.accounts});
        } else if (user.steamid) {
            user = user._json;
            socket.emit('logged', {user});
        } else {
            socket.emit('not logged');
        }
    });
};