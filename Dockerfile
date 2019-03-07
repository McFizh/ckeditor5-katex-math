FROM node:lts
EXPOSE 8080
RUN apt-get update ; apt-get install -y vim less
COPY . /plugin
WORKDIR /plugin
RUN npm ci
WORKDIR /plugin/example
RUN npm ci
CMD ["npm","run","start:dev"]