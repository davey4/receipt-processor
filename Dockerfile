FROM node:20-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npx tsc

EXPOSE 3000

CMD ["node", "dist/server.js"]