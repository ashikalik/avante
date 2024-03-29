FROM node:8
WORKDIR /var/src/website/
COPY ./package.json /var/src/website/
RUN npm install -g pm2
RUN npm install -g yarn
RUN yarn install
COPY . .

RUN npm run build:ssr

RUN ls | grep -v dist | xargs rm -R 

# Expose the listening port of your app
EXPOSE 4000

# Show current folder structure in logs
CMD [ "pm2-runtime", "start", "dist/server.js"]

