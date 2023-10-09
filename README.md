# TMDB API Node.js Application

This is a Node.js application for TMDB (The Movie Database) API.

## Prerequisites

Before running the application, ensure you have the following prerequisites installed:

- Node.js (https://nodejs.org/)
- PostgreSQL database (https://www.postgresql.org/)
## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`JWT_TOKEN=thisIsToken`

`NODE_ENV=develop`

`SECRET_COOKIE_ONE=token1`

`SECRET_COOKIE_TWO=token2`

`CLIENT_URL=http://localhost:5000`

`DB_HOST=localhost`

`DB_PORT=5432`

`DB_NAME=tmdb`

`DB_USER=admin`

`DB_PASSWORD=password`

`MOVIEDB_BEARER=<YOUR_BEARER>`

## Run Locally

Clone the project

```bash
  git clone https://github.com/yitzhakmatias/tmdb_test
```

Go to the project directory

```bash
  cd my-project
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```

## Usage/Examples
Use an API client (e.g., Postman) to make requests to the API endpoints.
Refer to your API documentation for available endpoints and usage.
```javascript
POST /api/v1/reviews
{
"tmdbId": 100
"userName": "John Doe",
"rating": 8
}
Fetch all reviews of a particular movie along with its information (Title, release date, poster, and overview).
GET /api/v1/movies/{tmdbId}/reviews
Fetch all reviews submitted by a specific user.
GET /api/v1/users/{userName}/reviews
```


