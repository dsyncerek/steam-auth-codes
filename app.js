const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const session = require('express-session');
const steam = require('steam-login');
const SteamTotp = require('steam-totp');
const fs = require('fs');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const config = JSON.parse(fs.readFileSync('config.json'));
const accounts = JSON.parse(fs.readFileSync('accounts.json'));

const admins = Array.isArray(config.admins) ? config.admins : [config.admins];

const generateAuthCodes = () => {
    let changed = false;
    accounts.forEach(acc => {
        let code = SteamTotp.generateAuthCode(acc.shared);
        if (acc.code !== code) changed = true;
        acc.code = code;
    });
    if (changed) io.to('codes').emit('codes', accounts);
};

setInterval(generateAuthCodes, 1000);


const sessionMiddleware = session({resave: false, saveUninitialized: false, secret: config.secret});

app.use(express.static(__dirname + '/build/'));
app.use(sessionMiddleware);
app.use(steam.middleware({realm: `${config.website}:${config.port}/`, verify: `${config.website}:${config.port}/verify`, apiKey: config.apiKey}));
io.use((socket, next) => sessionMiddleware(socket.request, {}, next));

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

app.get('/codes', steam.enforceLogin('/'), (req, res) => {
    admins.includes(req.user.steamid) ? res.send(authCodes) : res.redirect('/');
});

app.get('/user', steam.enforceLogin('/'), (req, res) => {
    res.send(req.user._json);
});

io.on('connection', socket => {
    let user = socket.request.session.steamUser || {};
    let access = admins.includes(user.steamid);
    if (user.steamid !== undefined && access) {
        user = user._json;
        socket.join('codes');
        socket.emit('logged', {user, codes: accounts});
    } else if (user.steamid !== undefined) {
        user = user._json;
        socket.emit('logged', {user});
    } else {
        socket.emit('not logged');
    }
});

server.listen(config.port);