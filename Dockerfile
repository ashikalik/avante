FROM node:8
WORKDIR /var/src/website/
COPY ./package.json /var/src/website/
RUN npm install -g pm2
RUN npm install -g yarn
RUN yarn install
COPY . .

RUN npm run build:ssr

# Expose the listening port of your app
EXPOSE 6021

# Show current folder structure in logs
CMD [ "pwd"]
CMD [ "ls"]
CMD [ "pm2-runtime", "start", "dist/server.js"]


