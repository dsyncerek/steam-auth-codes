const express = require('express');
const fs = require('fs');
const session = require('express-session');
const passport = require('passport');
const SteamStrategy = require('passport-steam').Strategy;
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const SteamTotp = require('steam-totp');

const config = JSON.parse(fs.readFileSync('config.json'));
let accounts = JSON.parse(fs.readFileSync('accounts.json'));

const sessionMiddleware = session({
    secret: config.secret,
    name: 'session_name',
    resave: true,
    saveUninitialized: true
});

const ensureAuthenticated = (req, res, next) => {
    if (req.user !== undefined) return next();
    res.send('');
};

passport.use(new SteamStrategy({
    returnURL: config.website + '/return',
    realm: config.website + '/',
    apiKey: config.apiKey
}, (identifier, profile, done) => {
    process.nextTick(() => {
        let ret = {
            steamid: profile._json.steamid,
            name: profile._json.personaname
        };
        if (ret.steamid === config.admin) ret.access = true;
        return done(null, ret);
    });
}));

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) => done(null, obj));

server.listen(3005);

app.use(sessionMiddleware);
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(__dirname + '/public/'));
io.use((socket, next) => sessionMiddleware(socket.request, {}, next));

app.get('/login', passport.authenticate('steam'), (req, res) => res.redirect('/'));
app.get('/return', passport.authenticate('steam'), (req, res) => res.redirect('/'));

app.get('/logout', ensureAuthenticated, (req, res) => {
    req.logout();
    res.redirect('/');
});

io.on('connection', function (socket) {
    try {
        var user = socket.request.session.passport.user || {};
    } catch (e) {
        var user = {};
    } finally {
        if (user.access === true) {
            socket.join('codes');
            socket.emit('codes', accounts);
        }
        socket.emit('login', user);
    }
});

const generateAuthCodes = () => {
    let change = false;
    accounts.forEach((acc) => {
        let code = SteamTotp.generateAuthCode(acc.shared);
        if (code !== acc.code) change = true;
        acc.code = code;
    });
    if (change) {
        io.to('codes').emit('codes', accounts);
    }
};

setInterval(generateAuthCodes, 1000);
