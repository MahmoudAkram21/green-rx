# Green RX Backend

RESTful API built with Express.js and Prisma ORM.

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   - Copy `.env.example` to `.env`
   - Update `DATABASE_URL` with your database connection string

3. **Set up Prisma:**
   ```bash
   # Generate Prisma Client
   npm run prisma:generate

   # Run migrations
   npm run prisma:migrate
   ```

4. **Start the server:**
   ```bash
   # Development mode (with auto-reload)
   npm run dev

   # Production mode
   npm start
   ```

## Project Structure

```
backend/
├── src/
│   ├── config/
│   │   └── database.js       # Prisma client configuration
│   ├── controllers/          # Request handlers
│   │   └── user.controller.js
│   ├── middleware/           # Custom middleware
│   │   ├── errorHandler.js
│   │   └── validateRequest.js
│   ├── routes/               # API routes
│   │   ├── index.js
│   │   └── user.routes.js
│   └── server.js             # Express app entry point
├── prisma/
│   └── schema.prisma         # Database schema
├── .env                      # Environment variables (create from .env.example)
├── .gitignore
└── package.json
```

## API Endpoints

### Health Check
- `GET /health` - Server health status

### Users (Example)
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `POST /api/users` - Create new user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

## Database

This project uses Prisma ORM. To modify the database schema:

1. Edit `prisma/schema.prisma`
2. Run `npm run prisma:migrate` to create a migration
3. The Prisma Client will be automatically regenerated

## Development

- Server runs on `http://localhost:3000` by default
- Use `npm run dev` for development with auto-reload
- Use `npm run prisma:studio` to open Prisma Studio (database GUI)

