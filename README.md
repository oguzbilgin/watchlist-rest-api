# Watchlist REST API

A production-ready **RESTful API** built with **Node.js**, **Express**, **Prisma**, and **PostgreSQL** that allows users to manage a personal movie watchlist with secure authentication, authorization, and validation.

This project is designed as a **backend portfolio project**, following real-world best practices such as JWT authentication, secure cookies, schema-based validation, and centralized error handling.

---

## Features

- 🔐 User authentication (Register / Login / Logout)
- 🍪 JWT-based auth with **httpOnly cookies**
- 🎥 Movie watchlist management
  - Add movie to watchlist
  - Update watchlist item (status, rating, notes)
  - Remove movie from watchlist
- 🧠 Authorization (users can only modify their own data)
- ✅ Schema-based request validation using Zod
- 🧩 Centralized error handling middleware
- 🗄️ Database management with Prisma ORM
- 🔄 Database migrations included

---

## Tech Stack

**Backend**
- Node.js
- Express.js

**Database**
- PostgreSQL
- Prisma ORM

**Authentication & Security**
- JSON Web Tokens (JWT)
- bcryptjs (password hashing)
- Secure HTTP-only cookies

**Validation & Middleware**
- Zod for schema-based request validation
- Custom validation middleware
- Centralized error handler

---

## Design Decisions

- **Zod** is used for schema-based validation to keep controllers clean and free from manual validation logic.
- Validation is handled at the middleware level to ensure consistency across all routes.
- **JWT tokens are stored in httpOnly cookies** instead of localStorage to improve security against XSS attacks.
- **Prisma ORM** is chosen for type-safe database access and predictable schema migrations.
- A **centralized error handler** is used to standardize error responses and simplify debugging.
- Authorization logic ensures users can only access and modify their own watchlist items.

---

## 📁 Project Structure

src/
├── controllers/
│ ├── auth.controller.js
│ └── watchlist.controller.js
├── middlewares/
│ ├── authenticate.js
│ ├── errorMiddleware.js
│ └── validateRequest.js
├── routes/
│ ├── auth.routes.js
│ └── watchlist.routes.js
├── validators/
│ ├── authValidators.js
│ └── watchlistValidators.js
├── utils/
│ └── generateToken.js
├── config/
│ └── db.js
└── app.js

---

## API Endpoints

### Authentication

| Method | Endpoint | Description |
|------|---------|------------|
| POST | /api/v1/auth/register | Register a new user |
| POST | /api/v1/auth/login | Login user |
| POST | /api/v1/auth/logout | Logout user |

### Watchlist

| Method | Endpoint | Description |
|------|---------|------------|
| POST | /api/v1/watchlist | Add movie to watchlist |
| PUT | /api/v1/watchlist/:id | Update watchlist item |
| DELETE | /api/v1/watchlist/:id | Remove movie from watchlist |

> Note: All watchlist endpoints require authentication via JWT stored in **httpOnly cookies**.
---

## ⚙️ Environment Variables

Create a `.env` file using the following example:

```env
NODE_ENV=development
PORT=5000

DATABASE_URL=

JWT_SECRET=
JWT_EXPIRES_IN=7d

COOKIE_SECURE=false

```
Use .env.example as a reference.

---

## 🚀 Getting Started

### Install dependencies

```bash
npm install
```
### Generate Prisma Client

```bash
npx prisma generate
```
> Note: npx prisma generate must be run whenever the Prisma schema changes.

### Run database migrations

```
npx prisma migrate dev
```

### Start the development server

```
npm run dev
```

The server will start on http://localhost:5000

## 📌 Notes

This project is intentionally designed as a backend-focused portfolio project, emphasizing clean architecture, security best practices, and real-world REST API patterns.

It demonstrates practical usage of authentication, authorization, validation, and database management in a production-like setup.

## License
This project is licensed under the MIT License.
