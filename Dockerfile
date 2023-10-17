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
ENV TZ=-05:00
ENV MYSQL_DATABASE=''
ENV MYSQL_USER=''
ENV MYSQL_PASSWORD=''
ENV MYSQL_ROOT_PASSWORD=''
ENV DATABASE_HOST=''
ENV DATABASE_PORT=''

ENV SMTP_SERVER='smtp.gmail.com'
ENV SMTP_PORT=465
ENV MAIL_SENDER=''
ENV MAIL_PASSWORD=''

ENV URL_RECOVER_PASSWORD='https://zfarming-backend.projects.kriverdevice.com/api/v1/auth/recover-password'
ENV VIEW_RECOVER_PASSWORD='https://zfarming.projects.kriverdevice.com/login'

EXPOSE ${PORT}
VOLUME ["/home/app"]
CMD [ "yarn", "start" ]
