const openid = require('openid');

const PROVIDER_URL = 'https://steamcommunity.com/openid';
const IDENTIFIER_REGEX = /^https?:\/\/steamcommunity\.com\/openid\/id\/(\d+)$/;

function authenticate() {
  return (req, res, next) => {
    req.relyingParty.authenticate(PROVIDER_URL, false, (err, authURL) => {
      if (err) return next('Authentication failed: ' + err);
      if (!authURL) return next('Authentication failed.');

      res.redirect(authURL);
    });
  };
}

function enforceLogin(redirect = '/') {
  return (req, res, next) => {
    return req.user ? next() : res.redirect(redirect);
  };
}

function middleware({ verify, realm }) {
  return (req, res, next) => {
    req.relyingParty = new openid.RelyingParty(
      verify,
      realm,
      true,
      true,
      [],
    );

    req.user = req.session.user;
    next();
  };
}

function logout() {
  return (req, res, next) => {
    req.session.user = undefined;
    req.user = undefined;
    next();
  }
}

function verify() {
  return (req, res, next) => {
    req.relyingParty.verifyAssertion(req, (err, result) => {
      if (err) return next(err.message);
      if (!result || !result.authenticated) return next('Failed to authenticate user.');
      if (!IDENTIFIER_REGEX.test(result.claimedIdentifier)) return next('Claimed identity is not valid.');

      const steamid = IDENTIFIER_REGEX.exec(result.claimedIdentifier)[1];

      req.user = steamid;
      req.session.user = steamid;
      next();
    });
  }
}

module.exports = {
  enforceLogin,
  middleware,
  logout,
  authenticate,
  verify,
};
