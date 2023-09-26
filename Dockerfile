# base image
FROM node:18.18.0-alpine

WORKDIR /home/t110820046

COPY . .

RUN yarn

RUN yarn build

# Run the web service on container startup.
CMD [ "yarn", "start" ]