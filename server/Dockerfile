FROM node:10-alpine
# FROM node:13.12.0-alpine

WORKDIR /app

COPY ./server/package.json ./
COPY ./server/package-lock.json ./
RUN npm install --silent

COPY ./server ./

CMD ["npm", "start"]