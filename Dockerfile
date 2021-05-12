FROM node:16-alpine3.11 as build-app

WORKDIR /app

COPY package*.json /app

RUN npm install

COPY . /app

RUN npm run build:prod

FROM  nginx:latest

COPY --from=build-app /app/dist/jagota-test-frontend /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]