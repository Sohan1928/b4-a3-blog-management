# Blogging Platform Backend

A robust backend for a blogging platform with secure authentication, role-based access control, and a public API for managing blogs.

## Features

### User Roles

- **Admin**: Manage users and delete any blog.
- **User**: Perform CRUD operations on their blogs.

### Authentication & Authorization

- **JWT Authentication** for secure access.
- **Role-Based Access Control** to restrict actions based on roles.

### Blog Management

- Public API to view blogs with search, sort, and filter functionalities.
- Only logged-in users can write, update, or delete their blogs.

## Models

### User

- `name: string – The full name of the user.`
  `email: string – The email address of the user, used for authentication and communication.`
  `password: string – The password for the user, securely stored.`
  `role: "admin" | "user" – The role of the user, determining their access level. Default is "user".`
  `isBlocked: boolean – A flag indicating whether the user is blocked or not. Default is false.`
  `createdAt: Date – The timestamp when the user was created.`
  `updatedAt: Date – The timestamp of the last update to the user.`

### Blog

- `title: string – The title of the blog post.`
  `content: string – The main body or content of the blog post.`
  `author: ObjectId – A reference to the User model, indicating the author of the blog post.`
  `isPublished: boolean – A flag indicating whether the blog post is published. Default is true (published).`
  `createdAt: Date – The timestamp when the blog post was created.`
  `updatedAt: Date – The timestamp of the last update to the blog post.`

## API Endpoints

### Authentication

- `POST /api/auth/register`: Register a new user.

- `Request Body:`

-`{` -`"name": "John Doe",` -`"email": "john@example.com",` -`"password": "securePassword"` -`}` -`Response:`

-`Success (201):` -`{` -`"success": true,` -`"message": "User registered successfully",` -`"statusCode": 201,` -`"data": {` -`"\_id": "string",` -`"name": "string",` -`"email": "string"` -`}`

-`Failure (400):` -`{` -`"success": false,` -`"message": "Validation error",` -`"statusCode": 400,` -`"error": { "details" },` -`"stack": "error stack"` -`}`

- `POST /api/auth/login`: Authenticate and receive a JWT token. -`{` -`"email": "john@example.com",` -`"password": "securePassword"` -`}` -`Response:`

-`Success (200):` -`{` -`"success": true,` -`"message": "User login successfully",` -`"statusCode": 200,` -`"data": {` -`"token": "string",` -`}`

-`Failure (401):` -`{` -`"success": false,` -`"message": "Invalid credentials",` -`"statusCode": 401,` -`"error": { "details" },` -`"stack": "error stack"` -`}`

### Blog Operations

- `POST /api/blogs`: Create a blog.
- `PATCH /api/blogs/:id`: Update own blog.
- `DELETE /api/blogs/:id`: Delete own blog.
- `GET /api/blogs`: Public API with search, sort, and filter options.

### Admin Actions

- `PATCH /api/admin/users/:userId/block`: Block a user.
- `DELETE /api/admin/blogs/:id`: Delete any blog.
