# My Blog API

A REST API for a blog application built with NestJS, TypeScript, TypeORM, and PostgreSQL.

## Project Context

This project was developed while I was taking a Platzi course.
The course covered the core API implementation, but it did not include testing practices.
I designed and implemented the test suite on my own to add quality and reliability to the project.

## Tech Stack

- NestJS
- TypeScript
- TypeORM
- PostgreSQL
- Jest
- Docker

## Requirements

- Node.js `>= 20`
- npm
- Docker + Docker Compose

## Run Locally

1. Install dependencies:

```bash
npm install
```

2. Configure environment variables in `.env` (adjust values if needed).  
The default configuration expects PostgreSQL on port `5433`.

3. Start PostgreSQL with Docker:

```bash
docker compose up
```

4. Run database migrations:

```bash
npm run migrations:run
```

5. Start the API in development mode:

```bash
npm run start:dev
```

The API will be available at `http://localhost:3000`.

## Useful Scripts

```bash
# build
npm run build

# run app
npm run start
npm run start:dev
npm run start:prod

# tests
npm run test
npm run test:e2e
npm run test:cov

# migrations
npm run migrations:show
npm run migrations:run
npm run migrations:generate -- src/database/migrations/<MigrationName>
npm run migrations:create -- src/database/migrations/<MigrationName>
```
