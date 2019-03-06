const { authenticate, verify, logout, enforceLogin } = require('../libs/steam-login');

module.exports = app => {
  app.get('/login', authenticate(), (req, res) => res.redirect('/'));
  app.get('/verify', verify(), (req, res) => res.redirect('/'));
  app.get('/logout', logout(), (req, res) => res.redirect('/'));
  app.get('/me', enforceLogin('/'), (req, res) => res.send(req.user));
};
