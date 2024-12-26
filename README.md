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

- `name`, `email`, `password`, `role`, `isBlocked`, `createdAt`, `updatedAt`

### Blog

- `title`, `content`, `author`, `isPublished`, `createdAt`, `updatedAt`

## API Endpoints

### Authentication

- `POST /api/auth/register`: Register a new user.
- `POST /api/auth/login`: Authenticate and receive a JWT token.

### Blog Operations

- `POST /api/blogs`: Create a blog.
- `PATCH /api/blogs/:id`: Update own blog.
- `DELETE /api/blogs/:id`: Delete own blog.
- `GET /api/blogs`: Public API with search, sort, and filter options.

### Admin Actions

- `PATCH /api/admin/users/:userId/block`: Block a user.
- `DELETE /api/admin/blogs/:id`: Delete any blog.
