FROM node:latest

COPY ./ ./front-end

WORKDIR /front-end

RUN npm install

EXPOSE 3000

CMD ["npm", "start"]
