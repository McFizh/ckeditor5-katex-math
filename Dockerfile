FROM node:lts
EXPOSE 8080
RUN apt-get update ; apt-get install -y vim less
WORKDIR /plugin
COPY . /plugin
RUN npm ci ; cd example ; npm ci ; npx webpack
CMD ["npx", "webpack-dev-server","--host 0.0.0.0"]