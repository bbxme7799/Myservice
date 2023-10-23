FROM node:18

# Create app directory
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install
COPY . . 
EXPOSE 8000

RUN npx prisma generate
# RUN npx prisma db push
CMD [ "npm", "start"]