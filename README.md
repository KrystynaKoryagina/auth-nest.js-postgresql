# NestJS JWT Authentication

## Installation & Setup

### Pre-requisites

- Node.js v20
- PostgreSQL

### Setting up

1. Clone the repository.
2. Run `npm install` to install dependencies.
3. Create a `.env` file in the root directory and paste the following:

   ```
    ENVIRONMENT=
    HOST=
    PORT=

    JWT_SECRET=

    DB_NAME=
    DB_PORT=
    DB_USERNAME=
    DB_PASSWORD=
    DB_URL=
   ```

- **`ENVIRONMENT`** The environment in which the application is running
- **`HOST`** The hostname where the server will be accessible
- **`PORT`** The port your server will run on
- **`JWT_SECRET`** A secret key used to sign and verify JWT for secure authentication (can be any string)
- **`DB_NAME`** The name of your database (be sure to create it first otherwise an error will be thrown)
- **`DB_PORT`** The port your PostgreSQL server is running on (default 5432)
- **`DB_USERNAME`** The username for your PostgreSQL database
- **`DB_PASSWORD`** The password for your PostgreSQL user account
- **`DB_URL`** The full connection URL for the PostgreSQL database.

4. Run `npm run start:dev` to start the project in development mode.

### Migrations

1. Run `npm run db:drop` to drop (deletes) the entire database schema
2. Run `npm run migration:generate --name={$FILE_NAME}` to generate a new migration file based on the current state of the database entities.
3. `migration:run` runs all pending migrations to update the database schema to match the latest version.
4. `db:seed` runs seed files to populate the database with initial data.
