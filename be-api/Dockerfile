FROM node:14
WORKDIR /be-api
COPY package.json .
RUN npm install
COPY . .
# CMD [ "npm", "start" ]
CMD ["npx","nodemon","chatapp"]
