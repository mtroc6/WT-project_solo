# Students & Courses — RESTful API project

Practical Activity #1 — consuming and implementing RESTful APIs with the
JavaScript ecosystem (json-server, Node.js + Express + MongoDB Atlas, Fetch API, Swagger).

The app manages **students** (`firstName`, `lastName`, `courseId`, `academicYear`)
and **courses** (`courseName`). Full CRUD for students, read/create for courses.

## Structure

```
project-root/
├── frontend/      Web interface (React + TypeScript + Vite, Fetch API)
├── backend/       RESTful API (Node.js + Express + Mongoose, MVC)
├── mock-server/   json-server configuration (mock API)
├── mock-data/     Original JSON database (bd.json)
├── tests/         Postman test collection
└── README.md
```

## How to run locally

### 1. Mock API (json-server)

```bash
cd mock-server
npm install
npm start          # http://localhost:3001
```

On start it copies `mock-data/bd.json` to a working `db.json`, so the original
stays untouched. Routes: `/students`, `/courses`.

### 2. Real API (Express + MongoDB Atlas)

```bash
cd backend
npm install
cp .env.example .env   # then set MONGODB_URI to your Atlas connection string
npm run seed           # load bd.json into Atlas (one-off)
npm start              # http://localhost:4000
```

Endpoints (same shape as the mock API):

| Method | Route            | Description        |
| ------ | ---------------- | ------------------ |
| GET    | `/students`      | list students      |
| GET    | `/students/:id`  | one student        |
| POST   | `/students`      | create student     |
| PUT    | `/students/:id`  | update student     |
| DELETE | `/students/:id`  | delete student     |
| GET    | `/courses`       | list courses       |
| GET    | `/courses/:id`   | one course         |
| POST   | `/courses`       | create course      |

Swagger docs: `http://localhost:4000/api-docs`

### 3. Frontend (React + Vite)

```bash
cd frontend
npm install
npm run dev        # http://localhost:5173
```

By default it talks to the mock API (`http://localhost:3001`).
To use the real API, set `VITE_API_URL` (e.g. in `frontend/.env`):

```
VITE_API_URL=http://localhost:4000
```

## Testing (Postman)

Import `tests/students-courses.postman_collection.json`. Set the `baseUrl`
collection variable to the mock (`http://localhost:3001`) or the real API URL.
