const accounts = require('../accounts');
const codesEmitter = require('../libs/codes-emitter')(accounts);

const ACCOUNTS_SOCKET_ROOM = 'accounts room';

const responseStatus = {
  unauthorized: '401',
  forbidden: '403',
  ok: '200',
};

function getStatusCode(steamid) {
  const logged = steamid !== undefined;
  const access = !process.env.LOGIN_REQUIRED || process.env.ADMIN_STEAMID === steamid;

  if (access) return responseStatus.ok;
  else if (logged) return responseStatus.forbidden;
  else return responseStatus.unauthorized;
}

module.exports = (app, io) => {
  codesEmitter.on('accounts', accounts => {
    io.to(ACCOUNTS_SOCKET_ROOM).emit('accounts', {
      accounts,
    });
  });

  io.on('connection', socket => {
    const steamid = socket.handshake.session.user;
    const statusCode = getStatusCode(steamid);
    const hasAccess = statusCode === responseStatus.ok;

    socket.emit('init', {
      responseStatus: statusCode,
      accounts: hasAccess ? codesEmitter.accounts : [],
      steamid,
    });

    if (hasAccess) {
      socket.join(ACCOUNTS_SOCKET_ROOM);
    }
  });
};
