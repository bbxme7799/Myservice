FROM node:18-alpine AS base

# Create app directory
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install
COPY . . 
EXPOSE 8000

RUN npx prisma generate
CMD [ "npm", "start"]