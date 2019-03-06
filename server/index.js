require('dotenv').config();
const express = require('express');
const socketIO = require('socket.io');
const accounts = require('./accounts');
const codesEmitter = require('./libs/codes-emitter')(accounts);

const app = express();
const server = app.listen(process.env.PORT);
const io = socketIO(server);

require('./app/middlewares')(app, io);
require('./app/routes')(app);

codesEmitter.on('accounts', list => {
  io.to('accounts room').emit('accounts', {
    accounts: list,
  });
});

const responseStatus = {
  unauthorized: '401',
  forbidden: '403',
  ok: '200',
};

function getStatusCode(steamid) {
  const logged = steamid !== undefined;
  const access = !process.env.LOGIN_REQUIRED || process.env.ADMIN_STEAMID === steamid;

  if (access) {
    return responseStatus.ok;
  } else if (logged) {
    return responseStatus.forbidden;
  } else {
    return responseStatus.unauthorized;
  }
}

io.on('connection', socket => {
  const steamid = socket.handshake.session.user;
  const statusCode = getStatusCode(steamid);
  const hasAccess = statusCode === '200';

  socket.emit('init', {
    statusCode,
    accounts: hasAccess ? codesEmitter.accounts : [],
  });

  if (hasAccess) {
    socket.join('accounts room');
  }
});
