[![Actions Status](https://github.com/dsyncerek/steam-auth-codes/workflows/CI/badge.svg)](https://github.com/dsyncerek/steam-auth-codes/actions)
[![Dependabot Status](https://api.dependabot.com/badges/status?host=github&repo=dsyncerek/steam-auth-codes)](https://dependabot.com)

# Steam Auth Codes

> A web application which keeps all your Steam Auth Codes in one place.

## Demo

Live: [https://steam-auth-codes.herokuapp.com/](https://steam-auth-codes.herokuapp.com/).

**NOTE**: Application will load after a short delay. Details [here](https://devcenter.heroku.com/articles/free-dyno-hours).

## Technologies

### Front-End

- [React](https://github.com/facebook/react) with hooks
- [styled-components](https://github.com/styled-components/styled-components) with [polished](https://github.com/styled-components/polished)
- [socket.io](https://github.com/socketio/socket.io-client)

### Back-End

- [Nest](https://github.com/nestjs/nest)
- [socket.io](https://github.com/socketio/socket.io)

## Installation

```
git clone https://github.com/dsyncerek/steam-auth-codes.git
cd steam-auth-codes
npm install
```

## Configuration

Rename `server/src/.env.example` to `server/src/.env`.

Change file `server/src/config/accounts.js` with information about your Steam Accounts.

## Usage

`npm run start:dev` runs application in development mode.

`npm run start:prod` runs application in production mode.

`npm run build` builds the project.

`npm run lint` lints the project using eslint and stylelint.

`npm run format` formats the project using prettier.

## Deploy

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/dsyncerek/steam-auth-codes)

You can set your environment variables using the [Heroku Dashboard](https://devcenter.heroku.com/articles/config-vars#using-the-heroku-dashboard).

## [License](LICENSE)
