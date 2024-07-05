FROM node:lts-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN yarn install

COPY . .

RUN yarn build

FROM nginx:alpine-slim

COPY --from=build /app/dist/poke-app-angular/browser /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 4200