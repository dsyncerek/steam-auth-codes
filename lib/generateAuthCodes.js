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
        this.accounts.forEach(acc => {
            let code = SteamTotp.generateAuthCode(acc.shared);
            if (acc.code !== code) changed = true;
            acc.code = code;
        });
        if (changed) this.emitEvent('new auth codes', this.accounts);
    }

    emitEvent(eventName, data) {
        setImmediate(() => this.emit(eventName, data));
    }
}

module.exports = AuthCodesEmitter;