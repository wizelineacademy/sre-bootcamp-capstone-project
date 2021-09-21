# Development Setup
### Clone repository
```bash
git clone https://github.com/beltranbot/sre-bootcamp-capstone-project.git
```
### Setup dotenv (environment vars).
Copy the file .env.example to .env
```bash
cp .env.example
```
Remplace the values of the vars in the .env file.

### Database schema
if you are running for the first time, you might want to update
the index.js file on line 7, change 'authenticate' for 'sync'
to allow sequelize to recreate the database.

### Run project.
```bash
docker-compose up
```

### Run tests
Connect to the container running node
```bash
docker exec -ti nodejs sh
```
Run the tests
```bash
npm run test
```

# Build production image
if no arguments are passed, the image will take by default
NODE_ENV=production
APP_PORT=8000

```bash
docker build -t beltranbot/academy-sre-bootcamp-carlos-beltran .
```

# Run image in production
### Setup dotenv (environment vars).
Create a .env file with the following environments set up to your liking:
```bash
# app
NODE_ENV=<node-env>
APP_PORT=<app-port>

# database
DB_DIALECT=<db-dialect|mysql|pgsql>
DB_HOST=<db-host>
DB_PASSWORD=<db-password>
DB_USERNAME=<db-username>
DB_DATABASE=<db-database>
DB_PORT=<db-port>

# JWT
JWT_KEY=<jwt-secret>
```

### Start container with the .env file
```bash
docker run -d -p 8000:8000 --name sre-capstone --env-file ./.env beltranbot/academy-sre-bootcamp-carlos-beltran
```

### Endpoints
- [post] /login
- [get] /_health
- [get] /mask/${cidr}
- [get] /cidr/${mask}
