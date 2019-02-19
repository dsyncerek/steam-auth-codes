const responseStatus = {
  unauthorized: '401',
  forbidden: '403',
  ok: '200',
};

module.exports = steamid => {
  const logged = steamid !== undefined;
  const access = !process.env.LOGIN_REQUIRED || process.env.ADMIN_STEAMID === steamid;

  if (access) {
    return responseStatus.ok;
  } else if (logged) {
    return responseStatus.forbidden;
  } else {
    return responseStatus.unauthorized;
  }
};
