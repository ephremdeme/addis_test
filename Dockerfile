# syntax=docker/dockerfile:1
FROM node:14.17-alpine
ENV NODE_ENV=production
WORKDIR /app
COPY ["package.json","package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install --production --silent && mv node_modules .
COPY . .
EXPOSE 5001
CMD ["npm", "start"]
