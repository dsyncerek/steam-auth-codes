const SteamTotp = require('steam-totp');

const CODE_VALIDITY_TIME = 30 * 1000;

function getCode(shared) {
  return SteamTotp.generateAuthCode(shared);
}

function getValidity() {
  return CODE_VALIDITY_TIME - (Math.floor(Date.now()) % CODE_VALIDITY_TIME);
}

module.exports = {
  getCode,
  getValidity,
};
