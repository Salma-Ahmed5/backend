
#light weight
FROM node:alpine     


WORKDIR /app


COPY package.json package-lock.json ./
RUN npm install --production
#bisabet el lib

COPY . .
#save the whole code in the img

EXPOSE 5050


CMD ["node", "index.js"]
