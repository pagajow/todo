# Frontend build stage
FROM node:22-alpine AS fe-build
WORKDIR /app

COPY ./package*.json ./
RUN npm ci

COPY . .
RUN npm run build 

# Nginx server stage
FROM nginx:alpine
RUN rm -f /etc/nginx/conf.d/default.conf \
 && ln -sf /dev/stdout /var/log/nginx/access.log \
 && ln -sf /dev/stderr /var/log/nginx/error.log \
 && mkdir -p /usr/share/nginx/html

COPY --from=fe-build /app/dist/ /usr/share/nginx/html/
COPY ./app_nginx.conf /etc/nginx/conf.d/app_nginx.conf

EXPOSE 80
HEALTHCHECK CMD wget -qO- http://localhost/ || exit 1
