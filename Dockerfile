FROM node:erbium-alpine3.14

ENV PORT=5500

WORKDIR /app

COPY . /app

RUN yarn

EXPOSE 5500
CMD ["yarn", "start"]
