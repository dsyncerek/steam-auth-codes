require('dotenv').config();
const express = require('express');
const socketIO = require('socket.io');

const app = express();
const server = app.listen(process.env.PORT);
const io = socketIO(server);

require('./app/middlewares')(app, io);
require('./app/routes')(app);
require('./app/base')(app, io);
