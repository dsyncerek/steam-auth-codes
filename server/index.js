const express = require('express');
const socketIO = require('socket.io');
const sharedSession = require('express-socket.io-session');
const middlewares = require('./app/middlewares');
const getStatusCode = require('./app/getStatusCode');
const AccountsManager = require('./lib/AccountsManager');
const config = require('./config');

const app = express();
const server = app.listen(config.port);
const io = socketIO(server);

app.use(express.static(`${__dirname}/../client/build/`));
app.use(middlewares.session);
app.use(middlewares.steam);
io.use(sharedSession(middlewares.session));

require('./app/steamRoutes')(app);

const accountsManager = new AccountsManager(config.accounts);

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
