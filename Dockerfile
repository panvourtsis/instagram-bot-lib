FROM keymetrics/pm2:8-alpine

WORKDIR /app

ADD . /app

RUN npm install

CMD ["pm2-runtime", "bot.js"]
