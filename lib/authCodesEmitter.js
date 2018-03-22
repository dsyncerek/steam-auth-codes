const SteamTotp = require('steam-totp');
const EventEmitter = require('events');

class AuthCodesEmitter extends EventEmitter {
    constructor(accounts) {
        super();
        this.accounts = accounts;
        this.startInterval(1000);
        this.generateAuthCodes();
    }

    startInterval(interval) {
        setInterval(this.generateAuthCodes.bind(this), interval);
    }

    generateAuthCodes() {
        let changed = false;
        this.accounts.forEach(account => {
            let authCode = SteamTotp.generateAuthCode(account.shared);
            if (account.authCode !== authCode) changed = true;
            account.authCode = authCode;
        });
        if (changed) this.emitEvent('new auth codes', this.accounts);
    }

    getAuthCodes() {
        return this.accounts.map(account => ({username: account.username, authCode: account.authCode}));
    }


    emitEvent(eventName, data) {
        setImmediate(() => this.emit(eventName, data));
    }
}

module.exports = AuthCodesEmitter;