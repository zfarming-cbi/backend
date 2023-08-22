FROM node:18
WORKDIR /app
COPY . /app/
ENV PORT=80
EXPOSE ${PORT}
RUN yarn i -g nodemon
RUN yarn i
CMD [ "yarn", "start" ]
