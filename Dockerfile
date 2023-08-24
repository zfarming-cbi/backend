FROM node:18 AS builder
WORKDIR /home/app
RUN cd /home/app
COPY ./ ./
RUN yarn install
RUN yarn build

FROM node:18-alpine
WORKDIR /home/app
COPY --from=builder /home/app/dist /home/app/dist
COPY --from=builder /home/app/package.json /home/app
RUN yarn install --prod

ENV PORT=80
ENV MYSQL_DATABASE=''
ENV MYSQL_USER=''
ENV MYSQL_PASSWORD=''
ENV MYSQL_ROOT_PASSWORD=''
ENV DATABASE_HOST=''

EXPOSE ${PORT}
VOLUME ["/home/app"]
CMD [ "yarn", "start:prod" ]
