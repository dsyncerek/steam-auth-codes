const steam = require('steam-login');
const express = require('express');
const config = require('../config.js');

module.exports = (app, sessionMiddleware) => {
    app.use(express.static(`${__dirname}/../build/`))
       .use(sessionMiddleware)
       .use(steam.middleware({realm: `${config.website}/`, verify: `${config.website}/verify`, apiKey: config.apiKey}));

    app.get('/login', steam.authenticate(), (req, res) => {
        res.redirect('/');
    }).get('/verify', steam.verify(), (req, res) => {
        res.redirect('/');
    }).get('/logout', steam.enforceLogin('/'), (req, res) => {
        req.logout();
        res.redirect('/');
    });
};