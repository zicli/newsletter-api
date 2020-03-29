[![Database hosted by ElephantSQL](https://img.shields.io/badge/Database%20Host-ElephantSQL-blue)](https://www.elephantsql.com)
[![CircleCI](https://circleci.com/gh/zicli/newsletter-api/tree/develop.svg?style=svg&circle-token=8981bb48566dd0834fabea1f0765545438b7364f)](https://circleci.com/gh/zicli/newsletter-api/tree/develop)
[![Coverage Status](https://coveralls.io/repos/github/zicli/newsletter-api/badge.svg?branch=develop)](https://coveralls.io/github/zicli/newsletter-api?branch=develop)
# newsletter-api
:newspaper: a lightweight newsletter backend server used by the zicli site

## :wrench: Installation

```bash
# clone repo and navigate into directory
git clone https://github.com/zicli/newsletter-api.git && cd newsletter-api

# make sure you have nvm installed to a stable version 
nvm install

# install dependencies
npm i

# edit .env file to right parameters (See .env.sample)
# run development server @localhost:3000
npm run start:dev
```

## :books: Documentation
- [Architecture](https://github.com/zicli/newsletter-api/blob/develop/docs/architecture.md)
- [API Documentation](https://github.com/zicli/newsletter-api/blob/develop/docs/api.md)