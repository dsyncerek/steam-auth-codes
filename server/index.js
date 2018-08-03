const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const session = require('express-session');
const steam = require('steam-login');
const config = require('./config/config.js');
const emitter = require('./lib/authCodesEmitter.js')(config.accounts);

const app = express();
const server = http.createServer(app).listen(config.port);
const io = socketIO(server);

const sessionMiddleware = session({resave: false, saveUninitialized: false, secret: config.secret});

app.use(express.static(`${__dirname}/../client/build/`))
   .use(sessionMiddleware)
   .use(steam.middleware({realm: `${config.website}/`, verify: `${config.website}/verify`, apiKey: config.apiKey}))
   .get('/login', steam.authenticate(), (req, res) => res.redirect('/'))
   .get('/verify', steam.verify(), (req, res) => res.redirect('/'))
   .get('/logout', steam.enforceLogin('/'), (req, res) => {
       req.logout();
       res.redirect('/');
   });

io.use((socket, next) => sessionMiddleware(socket.request, {}, next))
  .on('connection', socket => {
      let user = (socket.request.session.steamUser && socket.request.session.steamUser._json) || {};
      let access = config.admins.includes(user.steamid) || !config.loginRequired;

      if (access === true) {
          socket.join('auth codes room').emit('userState', 'authorized');
          emitter.forceEmit();
      } else if (user.steamid !== undefined) {
          socket.emit('userState', 'forbidden');
      } else {
          socket.emit('userState', 'unauthorized');
      }
  });

emitter.on('new auth codes', accounts =>
    io.to('auth codes room').emit('auth codes', accounts));