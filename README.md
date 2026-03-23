# Gujarat Tourism API

REST API for the Gujarat Tourism Platform built with Node.js, Express 5, and MongoDB.

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express 5
- **Database**: MongoDB (Mongoose)
- **Auth**: JWT (jsonwebtoken) + bcryptjs
- **File uploads**: Multer v2

## Project Structure

```
gujarat-tourism-api/
├── controllers/
│   ├── authController.js     # Login + admin seeding
│   └── placesController.js   # Tourist place CRUD
├── middleware/
│   └── auth.js               # JWT verification middleware
├── models/
│   ├── Admin.js              # Admin schema with bcrypt hook
│   └── TouristPlace.js       # Tourist place schema
├── routes/
│   ├── auth.js               # POST /api/auth/login
│   ├── places.js             # GET/POST/PUT/DELETE /api/places
│   └── upload.js             # POST /api/upload
└── server.js                 # App entry point
```

## Getting Started

### Prerequisites

- Node.js 18+
- A MongoDB Atlas cluster (or local MongoDB instance)

### 1. Clone the repository

```bash
git clone git@github.com:hritikutekar/gujarat-tourism-api.git
cd gujarat-tourism-api
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

```bash
cp .env.example .env
```

Edit `.env` and fill in your values:

| Variable         | Description                              |
|------------------|------------------------------------------|
| `PORT`           | Port the server listens on (default 3000)|
| `MONGO_URI`      | MongoDB connection string                |
| `JWT_SECRET`     | Secret key used to sign JWT tokens       |
| `ADMIN_USERNAME` | Username for the seeded admin account    |
| `ADMIN_PASSWORD` | Password for the seeded admin account    |

### 4. Run the server

```bash
# Development (with auto-reload)
npm run dev

# Production
npm start
```

The API will be available at `http://localhost:3000`.

> On first start, an admin account is automatically created using the `ADMIN_USERNAME` and `ADMIN_PASSWORD` values from `.env`.

## API Endpoints

### Auth

| Method | Endpoint          | Access  | Description        |
|--------|-------------------|---------|--------------------|
| POST   | `/api/auth/login` | Public  | Login as admin     |

### Places

| Method | Endpoint           | Access  | Description              |
|--------|--------------------|---------|--------------------------|
| GET    | `/api/places`      | Public  | List all places          |
| GET    | `/api/places/:id`  | Public  | Get a single place       |
| POST   | `/api/places`      | Admin   | Create a new place       |
| PUT    | `/api/places/:id`  | Admin   | Update a place           |
| DELETE | `/api/places/:id`  | Admin   | Delete a place           |

### Upload

| Method | Endpoint       | Access | Description              |
|--------|----------------|--------|--------------------------|
| POST   | `/api/upload`  | Admin  | Upload a single image    |

Admin endpoints require an `Authorization: Bearer <token>` header.

## Uploaded Images

Images are stored in the `uploads/` directory and served as static files at `/uploads/<filename>`.
