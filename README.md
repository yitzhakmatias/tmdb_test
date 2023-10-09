# TMDB API Node.js Application

This is a Node.js application for TMDB (The Movie Database) API.

## Prerequisites

Before running the application, ensure you have the following prerequisites installed:

- Node.js (https://nodejs.org/)
- PostgreSQL database (https://www.postgresql.org/)

## Getting Started

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd tmdb_api

2 Install dependencies:

bash
Copy code
npm install

3 Create a .env file in the project root directory and add the following environment variables:

env
Copy code
JWT_TOKEN=thisIsToken
NODE_ENV=develop
SECRET_COOKIE_ONE=token1
SECRET_COOKIE_TWO=token2
CLIENT_URL=http://localhost:5000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=tmdb
DB_USER=admin
DB_PASSWORD=password
MOVIEDB_BEARER=<YOUR_BEARER>
4 Start the application:

bash
Copy code
npm start

5 Usage
Use an API client (e.g., Postman) to make requests to the API endpoints.
Refer to your API documentation for available endpoints and usage.
