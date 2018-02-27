const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const session = require('express-session');
const AuthCodesEmitter = require('./lib/generateAuthCodes.js');
const config = require('./config.js');

const authCodesEmitter = new AuthCodesEmitter(config.accounts);

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const sessionMiddleware = session({resave: false, saveUninitialized: false, secret: config.secret});

require('./app/express.js')(app, sessionMiddleware);
require('./app/socket.js')(io, sessionMiddleware);
require('./app/codes.js')(io, authCodesEmitter);

server.listen(config.port);