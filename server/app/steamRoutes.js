const steam = require('steam-login');

module.exports = app => {
  app.get('/login', steam.authenticate(), (req, res) => {
    res.redirect('/');
  });

  app.get('/verify', steam.verify(), (req, res) => {
    res.redirect('/');
  });

  app.get('/logout', steam.enforceLogin('/'), (req, res) => {
    req.logout();
    res.redirect('/');
  });
};
