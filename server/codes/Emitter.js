const EventEmitter = require('events');
const Account = require('./Account');

class Emitter extends EventEmitter {
  constructor(accounts = []) {
    super();

    this.list = accounts.map(({ username, shared }) => {
      return new Account(username, shared);
    });

    this.refresh();
  }

  get accounts() {
    return this.list.map(account => account.data);
  }

  refresh() {
    const validity = Account.validity;

    setTimeout(() => {
      this.emit('accounts', this.accounts);
      this.refresh();
    }, validity);
  }
}

module.exports = Emitter;
