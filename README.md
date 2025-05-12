# Booking App

A full-stack booking application built with React, Node.js, MySQL, and Docker.

## Prerequisites

- Docker and Docker Compose installed on your machine
- Git (optional)

## Project Structure

```
booking-app/
├── frontend/          # React frontend application
├── backend/           # Node.js backend application
├── docker-compose.yml # Docker compose configuration
└── README.md         # This file
```

## Getting Started

1. Clone this repository (or download the files)

2. Start the application using Docker Compose:
   ```bash
   docker-compose up --build
   ```

3. The services will be available at:
   - Frontend: http://localhost:3000
   - Backend: http://localhost:5000
   - MySQL Database: localhost:3306

## Development

- The frontend and backend directories are mounted as volumes, so any changes you make to the code will be reflected immediately
- The frontend runs in development mode with hot reloading enabled
- The backend uses nodemon for automatic server restart on code changes

## Environment Variables

The following environment variables are set in the docker-compose.yml file:

### Backend
- DB_HOST=db
- DB_USER=user
- DB_PASSWORD=password
- DB_NAME=bookingapp
- DB_PORT=3306

### Database
- MYSQL_DATABASE=bookingapp
- MYSQL_USER=user
- MYSQL_PASSWORD=password
- MYSQL_ROOT_PASSWORD=rootpassword

## Stopping the Application

To stop the application, run:
```bash
docker-compose down
```

To stop the application and remove all data (including the database volume), run:
```bash
docker-compose down -v
``` 