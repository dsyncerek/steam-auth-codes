require('dotenv').config()
const express = require('express');
const socketIO = require('socket.io');
const sharedSession = require('express-socket.io-session');
const middlewares = require('./app/middlewares');
const getStatusCode = require('./utils/getStatusCode');
const AccountsManager = require('./codes/Emitter');
const accounts = require('./accounts');

const app = express();
const server = app.listen(process.env.PORT);
const io = socketIO(server);

app.use(express.static(`${__dirname}/../client/build/`));
app.use(middlewares.session);
app.use(middlewares.steam);
io.use(sharedSession(middlewares.session));

require('./app/routes')(app);

const accountsManager = new AccountsManager(accounts);

accountsManager.on('accounts', list => {
  io.to('accounts room').emit('accounts', {
    accounts: list,
  });
});

io.on('connection', socket => {
  const { steamid, username } = socket.handshake.session.steamUser || {};
  const statusCode = getStatusCode(steamid);
  const hasAccess = statusCode === '200';

  socket.emit('init', {
    statusCode,
    username,
    accounts: hasAccess ? accountsManager.accounts : [],
  });

  if (hasAccess) {
    socket.join('accounts room');
  }
});
