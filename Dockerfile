FROM node:12.16.3

WORKDIR /code

ENV PORT 3333
ENV DATABASE_HOST database

COPY package.json /code/package.json

RUN npm install

COPY . /code

CMD ["npm", "run-script", "start"]