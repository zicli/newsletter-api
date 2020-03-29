# base image
FROM node:12.2.0-alpine

# set working directory
WORKDIR /app


# install and cache app dependencies
COPY package*.json ./
RUN npm install --quiet
COPY . .

# start app
CMD ["npm", "run", "start:dev"]
