const config = require('../config');

const statusCodes = {
  unauthorized: '401',
  forbidden: '403',
  ok: '200',
};

module.exports = steamid => {
  const logged = steamid !== undefined;
  const access = !config.loginRequired || config.admins.includes(steamid);

  if (access) {
    return statusCodes.ok;
  } else if (logged) {
    return statusCodes.forbidden;
  } else {
    return statusCodes.unauthorized;
  }
};
