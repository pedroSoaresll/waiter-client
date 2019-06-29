FROM node:10.15.0
 
RUN mkdir /app
WORKDIR /app
 
ENV PATH /app/node_modules/.bin:$PATH
 
COPY package.json /app/package.json
RUN npm install
RUN npm install -g @vue/cli

EXPOSE 3002

CMD npm start