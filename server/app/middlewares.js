const express = require('express');
const path = require('path');
const session = require('express-session');
const sharedSession = require('express-socket.io-session');
const steamLogin = require('../libs/steam-login');

const steamMiddleware = steamLogin.middleware({
  realm: new URL('/', process.env.URL).href,
  verify: new URL('/verify', process.env.URL).href,
});

const sessionMiddleware = session({
  resave: false,
  saveUninitialized: false,
  secret: process.env.SESSION_SECRET,
});

module.exports = (app, io) => {
  app.use(sessionMiddleware);
  app.use(steamMiddleware);
  app.use(express.static(path.join(__dirname, '../../client/build')));
  io.use(sharedSession(sessionMiddleware));
};
