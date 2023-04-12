FROM node:18-alpine

WORKDIR /usr/src/app

COPY package.json yarn.lock ./
COPY prisma ./prisma/

RUN yarn

COPY . .

RUN yarn prisma generate

RUN yarn build

EXPOSE 3000
CMD [ "node", "dist/main.js" ]