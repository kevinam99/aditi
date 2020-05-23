FROM node:12-alpine3.11

LABEL maintainer="Kevin Mathew <kevinam99@gmail.com>"

COPY ./docker_src .

RUN npm install

CMD ["npm", "start"]