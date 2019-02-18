const steam = require('steam-login');
const session = require('express-session');
const config = require('../config');

const steamMiddleware = steam.middleware({
  realm: `${config.website}/`,
  verify: `${config.website}/verify`,
  apiKey: config.steamApiKey,
});

const sessionMiddleware = session({
  resave: false,
  saveUninitialized: false,
  secret: config.sessionSecret,
});

module.exports = {
  steam: steamMiddleware,
  session: sessionMiddleware,
};
