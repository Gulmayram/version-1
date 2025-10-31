# FROM node:16 as build
# WORKDIR /app
# COPY package*.json ./
# RUN npm install 
# COPY . .
# RUN npm run build


# FROM node:lts-slim

# # set work directory
# WORKDIR /usr/src/app/

# # add to $PATH
# ENV PATH /usr/src/app/node_modules/.bin:$PATH

# # install app dependencies
# COPY package.json ./
# COPY package-lock.json ./
# RUN npm install

# # add app
# COPY . ./

# RUN npm run build

# RUN npm install -g serve

# EXPOSE 3000

# CMD ["serve", "-s", "build"]
# CMD ["npm", "start"]


# FROM node:lts-slim AS build

# # Устанавливаем рабочую директорию в контейнере
# WORKDIR /usr/src/app/

# ENV PATH /usr/src/app/node_modules/.bin:$PATH
# # Копируем package.json и package-lock.json
# COPY package.json /usr/src/app/
# COPY package-lock.json /usr/src/app/

# # Устанавливаем зависимости
# RUN npm install

# # Копируем весь проект в контейнер
# COPY . .

# # Собираем приложение
# RUN npm run build

# # Stage 2: Setting up Nginx
# FROM nginx:alpine

# # Копируем сборку React из Stage 1 в директорию Nginx
# COPY --from=build /usr/src/app/build /usr/share/nginx/html

# # Копируем файл конфигурации Nginx
# COPY nginx.conf /etc/nginx/nginx.conf

# # Открываем порт 80 для доступа к контейнеру
# EXPOSE 80

# # Запускаем Nginx
# CMD ["nginx", "-g", "daemon off;"]




# ###########
# # BUILDER #
# ###########
# FROM node:lts-slim as builder

# COPY package.json package-lock.json ./
# RUN npm install && mv ./node_modules ./usr/src/app/

# WORKDIR /usr/src/app/
# COPY . .

# RUN npm run build

# #########
# # FINAL #
# #########
# FROM nginx:1.19.2-alpine
# COPY --from=builder /usr/src/app/build /usr/share/nginx/html
# # RUN rm /etc/nginx/conf.d/default.conf
# # COPY nginx.conf /etc/nginx/conf.d
# # EXPOSE 80
# # CMD ["nginx", "-g", "daemon off;"]


# ###########
# # BUILDER #
# ###########
# FROM node:lts-slim as builder

# COPY package.json package-lock.json ./
# RUN npm install && mkdir /frontend && mv ./node_modules ./frontend

# WORKDIR /frontend
# COPY . .

# RUN npm run build

# #########
# # FINAL #
# #########
# FROM nginx:1.19.2-alpine
# COPY --from=builder /frontend/build /usr/src/app
# RUN rm /etc/nginx/conf.d/default.conf
# COPY default.conf /etc/nginx/conf.d
# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]


# FROM node:14.14.0-alpine as builder
FROM node:18-alpine as builder
WORKDIR /app
COPY ./package.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx
EXPOSE 3000
COPY ./default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build /usr/share/nginx/html
