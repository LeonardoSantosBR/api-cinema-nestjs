# API Cinema

REST API for managing cinemas, rooms, movies, sessions and seat reservations. Built with [NestJS](https://nestjs.com/), [Prisma](https://www.prisma.io/) and MySQL.

## Stack

- **Runtime:** Node.js 20
- **Framework:** NestJS 11
- **ORM:** Prisma 6
- **Database:** MySQL
- **Auth:** JWT (`@nestjs/jwt`) + bcrypt
- **Validation:** `class-validator` / `class-transformer`
- **Docs:** Swagger (`@nestjs/swagger`)
- **Scheduling:** `@nestjs/schedule` (automatic session expiration)
- **Container:** Docker / docker-compose

## Features

- Registration and authentication of **users** (clients) and **administrators** with distinct roles
- CRUD for **cinemas**, **rooms**, **rows** and **seats**
- CRUD for **movies** with age rating (`FREE`, `PLUS12`, `PLUS16`, `PLUS18`)
- Creation and listing of **sessions** with filtering by movie name
- **Seat reservation per session** linked to a user
- Automatic session expiration via scheduled job
- Soft delete on every resource (`deleted_at`)
- Role-based access control (`admin` / `client`) via guards

## Data model

```
Cinemas ──< Rooms ──< RowsRoom ──< Seats
                │                    │
                └──< Sessions >── Movies
                          │
                          └──< SessionSeats >── Users
```

- A **cinema** has many **rooms**.
- Each **room** has **rows** (`RowsRoom`) identified by a letter, and each row contains **seats** (`Seats`), with an accessibility flag.
- A **session** links a **movie** to a **room** with start/end times.
- A reservation (`SessionSeats`) links a **user** to a **seat** of a **session**.

Rating enum:

```
MovieClassification = FREE | PLUS12 | PLUS16 | PLUS18
```

## Modules

| Module          | Responsibility                                    |
| --------------- | ------------------------------------------------- |
| `auth`          | Client and administrator login, JWT issuing       |
| `users`         | Client management                                 |
| `admins`        | Administrator management                          |
| `cinemas`       | Cinema CRUD                                       |
| `rooms`         | CRUD for rooms, rows and seats                    |
| `movies`        | Movie CRUD                                        |
| `sessions`      | Session CRUD and search (filter by movie)         |
| `session-seats` | Seat reservation within a session                 |

## Environment variables

Create a `.env` file at the project root:

```env
DATABASE_URL="mysql://user:password@localhost:3306/api_cinema"
JWT_SECRET="your-secret-key"
PORT=3000
```

## Running the project

### Local

```bash
# install dependencies
npm install

# generate the Prisma Client
npm run prisma-generate-mysql

# apply the schema to the database
npm run prisma-push-mysql

# start in development mode
npm run start:dev
```

### Docker

```bash
docker-compose up --build
```

The API will be available at `http://localhost:3000`.

## Swagger documentation

Once the application is running, open:

```
http://localhost:3000/api
```

## Authentication

The API uses a global JWT `AuthGuard`. To authenticate:

1. `POST /auth/signin` — client login
2. `POST /auth/signin/admin` — administrator login

Send the returned token in the `Authorization: Bearer <token>` header on the remaining requests. Role-protected routes use the `RolesGuard`.

## Useful scripts

| Script                          | Description                            |
| ------------------------------- | -------------------------------------- |
| `npm run start`                 | Starts the API                         |
| `npm run start:dev`             | Starts in watch mode                   |
| `npm run start:prod`            | Runs the build (`dist/main`)           |
| `npm run build`                 | Compiles the project                   |
| `npm run lint`                  | Lint + autofix                         |
| `npm run format`                | Formats with Prettier                  |
| `npm run test`                  | Unit tests (Jest)                      |
| `npm run test:e2e`              | End-to-end tests                       |
| `npm run prisma-generate-mysql` | Generates the Prisma Client            |
| `npm run prisma-push-mysql`     | Syncs the schema with the database     |

## Project structure

```
src/
├── app.module.ts
├── main.ts
├── common/         # shared filters, interceptors and utilities
├── database/       # PrismaService and data access configuration
├── decorators/     # custom decorators (e.g. @Roles)
├── helpers/
├── modules/        # domain modules (auth, cinemas, movies, ...)
├── services/       # shared services (e.g. HashService)
├── swagger/
└── types/
```
