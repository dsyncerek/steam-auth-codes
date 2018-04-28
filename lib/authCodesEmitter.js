const SteamTotp = require('steam-totp');
const EventEmitter = require('events');

class AuthCodesEmitter extends EventEmitter {

    constructor(accounts) {
        super();

        this.accounts = JSON.parse(JSON.stringify(accounts));
        this.expire = 0;

        this.startInterval(1000);
        this.generateAuthCodes();
    }

    startInterval(interval) {
        clearInterval(this.intervalHandle);
        this.intervalHandle = setInterval(() => {
            this.expire -= interval / 1000;
            this.generateAuthCodes();
        }, interval);
    }

    generateAuthCodes() {
        let changed = false;
        this.accounts.forEach(account => {
            let authCode = SteamTotp.generateAuthCode(account.shared);
            if (account.authCode !== authCode) {
                changed = true;
                account.authCode = authCode;
            }
        });
        if (changed) {
            this.expire = 30;
            setImmediate(() => this.emit('new auth codes', this.getAuthCodes()));
        }
    }

    getAuthCodes() {
        return {
            expire: this.expire,
            accounts: this.accounts.map(account => ({username: account.username, authCode: account.authCode}))
        };
    }

}

module.exports = AuthCodesEmitter;