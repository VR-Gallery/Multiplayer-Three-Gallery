# base image
FROM node:18.18.0-alpine

WORKDIR /home/t110820046/project

COPY package.json yarn.lock ./
COPY /apps/sport/.env .env

RUN yarn --frozen-lockfile

COPY . .

RUN yarn build

EXPOSE 3090 5090

CMD [ "yarn", "start" ]