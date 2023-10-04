# base image
FROM node:18.18.0-alpine

WORKDIR /app

RUN apk add --no-cache libc6-compat

COPY . .

RUN yarn global add turbo
RUN yarn global add tsup 
RUN yarn install 

RUN yarn build

EXPOSE 3090 5090

CMD [ "yarn", "start" ]