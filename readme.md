# Activity Booking API

A RESTful API for managing activity bookings built with Node.js, Express, and MongoDB.

## Features

- User authentication (register/login) with JWT
- Create and view activities
- Book activities
- View user's bookings
- Input validation with express-validator

## Tech Stack

- Node.js
- Express
- MongoDB & Mongoose
- JWT for authentication
- bcryptjs for password hashing
- express-validator for input validation
- Deployed on Vercel

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user

### Activities

- `POST /api/activities` - Create a new activity (protected route)
- `GET /api/activities/:id` - Get activity details (protected route)

### Bookings

- `GET /api/bookings/me` - Get current user's bookings (protected route)
- `POST /api/bookings` - Book an activity (protected route)

## Installation

1. Clone the repository
2. Install dependencies:
    ```
    npm install
    ```
3. Create a `.env` file with the following variables:
    ```
    PORT = 3000
    MONGODB_URL = your_mongodb_connection_string
    JWT_SECRET = your_jwt_secret_here
    ```
4. Start the server:
    ```
    npm run dev
    ```

## Deployment

This API is configured for deployment on Vercel with the following:

- `vercel.json` configuration file for routing and Node.js setup
- Environment variables set in Vercel dashboard
- Serverless function architecture

## Data Models

### User
- name: String (required)
- email: String (required, unique)
- phone: String (required)
- password: String (required, min length: 6)
- createdAt: Date

### Activity
- title: String (required)
- description: String (required)
- location: String (required)
- dateTime: Date (required)
- createdAt: Date

### Booking
- userId: ObjectId (reference to User)
- activityId: ObjectId (reference to Activity)
- bookedAt: Date


