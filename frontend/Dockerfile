FROM node:22-bookworm-slim

WORKDIR /app
COPY . /app

RUN npm install 
ENTRYPOINT ["npm", "run" , "start"]