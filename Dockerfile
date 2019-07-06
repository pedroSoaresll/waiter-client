FROM node:10.16.0-alpine

WORKDIR /app

COPY package.json . 

RUN npm i -g yarn @vue/cli && yarn install

ENV PATH /app/node_modules/.bin:$PATH

ADD . /app

EXPOSE 3002

CMD yarn start