FROM node:14.17.0-alpine

WORKDIR /var/www/

COPY package.json package-lock.json ./

RUN npm ci

COPY .eslintrc.js nest-cli.json tsconfig.json tsconfig.build.json ./

COPY .env.docker /var/www/.env

CMD [ "npm","run", "start:dev" ]