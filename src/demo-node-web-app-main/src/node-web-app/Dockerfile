FROM node:18-alpine

# Create app directory
WORKDIR /usr/src/app

RUN apk --no-cache add curl

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .

EXPOSE 8080
CMD [ "node", "--require", "./instrumentation.js", "server.js" ]

