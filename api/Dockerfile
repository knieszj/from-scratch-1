FROM node:latest

WORKDIR /app

COPY . .

RUN npm install 

ENV PORT = 3020

EXPOSE 3020

CMD ["npm", "start"]