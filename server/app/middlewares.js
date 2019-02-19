const steam = require('steam-login');
const session = require('express-session');

const steamMiddleware = steam.middleware({
  realm: new URL('/', process.env.URL).href,
  verify: new URL('/verify', process.env.URL).href,
  apiKey: process.env.STEAM_API_KEY,
});

const sessionMiddleware = session({
  resave: false,
  saveUninitialized: false,
  secret: process.env.SESSION_SECRET,
});

module.exports = {
  steam: steamMiddleware,
  session: sessionMiddleware,
};
