FROM node:10-alpine
ARG FONTAWESOME_TOKEN

# FROM node:13.12.0-alpine

WORKDIR /app
COPY ./spa/package.json ./

RUN npm config set "@fortawesome:registry" https://npm.fontawesome.com/
RUN npm config set "//npm.fontawesome.com/:_authToken" $FONTAWESOME_TOKEN

RUN npm install --silent

COPY ./spa ./

CMD ["npm", "start"]
