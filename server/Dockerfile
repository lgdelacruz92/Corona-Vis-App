FROM node:latest

RUN mkdir ~/server
COPY ./ ~/server

WORKDIR "~/server"
RUN npm install
RUN npm install -g pm2

EXPOSE 3001

CMD ["pm2", "start", "index.js"]