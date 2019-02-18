const SteamTotp = require('steam-totp');

const CODE_VALIDITY_TIME = 30 * 1000;

class Account {
  constructor(username, shared) {
    this.username = username;
    this.shared = shared;
  }

  get code() {
    return SteamTotp.generateAuthCode(this.shared);
  }

  static get validity() {
    return CODE_VALIDITY_TIME - (Math.floor(Date.now()) % CODE_VALIDITY_TIME);
  }

  get data() {
    return {
      username: this.username,
      code: this.code,
      validity: Account.validity,
    };
  }
}

module.exports = Account;
