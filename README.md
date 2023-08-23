Description
Nest framework TypeScript starter repository.

Installation
$ npm install
Postgres
Install docker and run the command:

docker run --name clean-architecture-db -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres
run migration

npm run typeorm:generate:win -n init
npm run typeorm:run:win
Running the app
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
Test
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
Support
Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please read more here.

Stay in touch
Author - Kamil Myśliwiec
Website - https://nestjs.com
Twitter - @nestframework
License
Nest is MIT licensed.
