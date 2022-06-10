FROM node:10

# Create app directory
WORKDIR /ethereumWallet/server

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# COPY package*.json /ethereumWallet/server
COPY package.json /ethereumWallet/server
COPY yarn.lock /ethereumWallet/server
RUN yarn install 

# Bundle app source
COPY . /ethereumWallet/server

# # For typescript
# RUN npm run build
# COPY ormconfig.json /app/dist
# COPY .env /app/dist
# WORKDIR /app/dist

CMD yarn start
EXPOSE 8888 