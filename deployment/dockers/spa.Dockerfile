FROM node:10-alpine
ARG FONTAWESOME_TOKEN
ARG PORT

WORKDIR /app
COPY ./spa/package.json ./

RUN npm config set "@fortawesome:registry" https://npm.fontawesome.com/
RUN npm config set "//npm.fontawesome.com/:_authToken" $FONTAWESOME_TOKEN

RUN npm install --silent

COPY ./spa/public ./public
COPY ./spa/src ./src

RUN npm install -g serve

RUN npm run-script build

CMD ["serve", "-s", "build", "-l", "3000"]
