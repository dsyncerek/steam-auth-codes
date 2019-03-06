const openid = require('openid');

function authenticate() {
  const providerURL = 'https://steamcommunity.com/openid';

  return (req, res, next) => {
    req.relyingParty.authenticate(providerURL, false, (err, authURL) => {
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
  const identifierRegex = /^https?:\/\/steamcommunity\.com\/openid\/id\/(\d+)$/;

  return (req, res, next) => {
    req.relyingParty.verifyAssertion(req, (err, result) => {
      if (err) return next(err.message);
      if (!result || !result.authenticated) return next('Failed to authenticate user.');
      if (!identifierRegex.test(result.claimedIdentifier)) return next('Claimed identity is not valid.');

      const steamid = identifierRegex.exec(result.claimedIdentifier)[1];

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
