FROM node:12 AS build-env

WORKDIR /app

COPY . ./

ARG conf	
ENV config=${conf}

RUN npm install >/dev/null
RUN npm run build -- --configuration=${config}

FROM nginx:1.13.9-alpine

COPY --from=build-env /app/dist/* /usr/share/nginx/html

COPY ./nginx.conf /etc/nginx/conf.d/default.conf

CMD ["nginx", "-g", "daemon off;"]
