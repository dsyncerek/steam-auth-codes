const EventEmitter = require('events');
const { getCode, getValidity } = require('./utils');

class CodesEmitter extends EventEmitter {
  constructor(list = []) {
    super();

    this.list = list;

    this.generateCodes();
    this.refreshCodes();
  }

  get accounts() {
    const validity = getValidity();

    return this.list.map(({ username, code }) => ({
      username,
      code,
      validity,
    }));
  }

  generateCodes() {
    this.list = this.list.map(account => ({
      ...account,
      code: getCode(account.shared),
    }));
  }

  refreshCodes() {
    const validity = getValidity();

    setTimeout(() => {
      this.emit('accounts', this.accounts);
      this.refreshCodes();
    }, validity);
  }
}

module.exports = accounts => new CodesEmitter(accounts);
