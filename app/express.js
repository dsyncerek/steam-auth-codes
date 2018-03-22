const config = require('../config.js');
const steam = require('steam-login');
const express = require('express');

module.exports = (app, sessionMiddleware, authCodesEmitter) => {
    app.use(express.static(`${__dirname}/../build/`));
    app.use(sessionMiddleware);
    app.use(steam.middleware({realm: `${config.website}/`, verify: `${config.website}/verify`, apiKey: config.apiKey}));

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

    app.get('/user', steam.enforceLogin('/'), (req, res) => {
        res.send(req.user._json);
    });

    app.get('/data', steam.enforceLogin('/'), (req, res) => {
        config.admins.includes(req.user.steamid) || !config.loginRequired ? res.send(authCodesEmitter.getAuthCodes()) : res.redirect('/');
    });
};