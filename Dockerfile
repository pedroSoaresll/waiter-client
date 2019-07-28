# develop stage
FROM node:10.16.0-jessie as develop-stage
WORKDIR /app
COPY package*.json ./
RUN npm i -g @vue/cli && npm i
COPY . .