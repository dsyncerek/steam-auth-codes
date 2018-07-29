const SteamTotp = require('steam-totp');
const EventEmitter = require('events');

class AuthCodesEmitter extends EventEmitter {

    constructor(accounts) {
        super();
        this.accounts = JSON.parse(JSON.stringify(accounts));
        this.expire = 0;
        this.startInterval();
        this.generateAuthCodes();
    }

    startInterval(interval = 1000) {
        this.stopInterval();
        this.intervalHandle = setInterval(() => {
            this.expire -= interval / 1000;
            this.generateAuthCodes();
        }, interval);
    }

    stopInterval() {
        clearInterval(this.intervalHandle);
    }

    forceEmit() {
        setImmediate(() => this.emit('new auth codes', this.getAuthCodes()));
    }

    getAuthCodes() {
        return {
            expire: this.expire,
            accounts: this.accounts.map(account => ({username: account.username, authCode: account.authCode})),
        };
    }

    static generateSingleAuthCode(shared) {
        return SteamTotp.generateAuthCode(shared);
    }

    generateAuthCodes() {
        let changed = false;
        this.accounts.forEach(account => {
            let authCode = AuthCodesEmitter.generateSingleAuthCode(account.shared);
            if (account.authCode !== authCode) {
                changed = true;
                account.authCode = authCode;
            }
        });
        if (changed) {
            this.expire = 30;
            this.forceEmit();
        }
    }
}

module.exports = accounts => new AuthCodesEmitter(accounts);