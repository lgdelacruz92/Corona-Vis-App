FROM node:latest

RUN mkdir ~/server
COPY ./ ~/server

WORKDIR "~/server"
RUN npm install

EXPOSE 3001

CMD ["npm", "start"]