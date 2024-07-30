# State Management System Notes::

## Overview
This project involves creating a state management system for a robotics platform. The system will handle different types of states, manage their statuses, and integrate with the existing infrastructure.

## Key Features

- **State Model**: 
  - `name` (string): Name of the state.
  - `description` (string): Description of the state.
  - `status` (string): Status of the state (e.g., active, inactive).
  - `createdAt` (Date): Timestamp when the state was created.
  - `updatedAt` (Date): Timestamp when the state was last updated.
  - `createdBy` (string): Identifier of the user who created the state.
  
# Project Setup and Configuration

## 1. Package Configuration
- **Added `package.json`:**
  - `"start": "node server.js"`
  - `"dev": "nodemon server.js"`
  - **Run with**: `npm run dev`

## 2. API Testing
- **HTTP Client:** Using ThunderClient inside VS Code for testing APIs instead of Postman.

## 3. Server Setup
- **Run the server on Port 5001**: `PORT=5001 node server.js`
- **Alternatively, use**: `PORT=5000 nodemon server.js` or `node server.js`

## 4. Routing Configuration
- **Defined Common Routes in `server.js`**:
  - `app.use("/api/state", require("./routes/stateRoutes"));`
- **State Routes**:
  - Updated GET, POST, PUT, DELETE requests based on ID.
  - Added GET request for individual state.
  - Tested using ThunderClient.

## 5. Response Handling
- **State Creation**:
  - Response status is `201 Created` when a state is successfully created.
  - Defined routes and controllers for CRUD operations.
  - Use `express.json()` middleware to parse JSON bodies.

## 6. Error Handling
- **Middleware for Errors**:
  - Created `errorhandler.js` in the middleware folder.
  - Defined constants for errors in `constants.js` and imported them into the error handler.
  - Added a log error handler with `logError(err);`.

## 7. Database Interaction
- **MongoDB Connection**:
  - Added MongoDB extension and connected using MongoDB Compass.
  - Used MongoDB drivers to establish a connection.
  - Logged database connection status in `server.js`.

## 8. State Schema
- **Schema Definition in `statemodel.js`**:
  - Added `timestamps: true` to automatically include `createdAt` and `updatedAt` fields.
  - Implemented CRUD operations:
    - Create, Read, Update, Delete states with proper responses.
    - Validated and stored records in the collection.

## 9. User Authentication
- **Endpoints for User Management**:
  - Created routes in `userRoutes.js`:
    - `POST` for user registration.
    - `POST` for user login.
    - `GET` for retrieving current user information.

## 10. User Controllers
- **Controller Functions**:
  - **Register User**:
    - Schema with username, email (unique), and hashed password.
    - Password hashing using `bcrypt`.
    - Return status `201 Created` on successful registration.
  - **Login User**:
    - Check credentials and generate a JSON Web Token (JWT) if valid.
    - JWT includes user's username, email, and ID with an expiration time.

## 11. JWT Authentication
- **Access Token**:
  - Define access token in `env` with secret key.
  - Include user information and expiration time in the JWT.
  - Use JWT for accessing private routes.

## 12. Middleware for Token Validation
- **`validateToken` Middleware**:
  - Validates JWT from request headers.
  - Decodes token and attaches user information to request.
  - Sends `401 Unauthorized` response if the token is missing or invalid.

## 13. User-specific State Management
- **User-specific State Operations**:
  - Logged-in users can:
    - Get all states associated with their user ID.
    - Perform CRUD operations (Create, Read, Update, Delete) on their states.
  - Ensured that state documents have a valid `user_id` reference for data integrity and user-specific access control.

## Instructions for Use

- Start the server with `npm run dev`.
- Test endpoints using ThunderClient or any other HTTP client.
- Ensure all routes are protected and only accessible by authenticated users.