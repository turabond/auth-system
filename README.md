
# Auth System – Fullstack Application

This is a fullstack authentication system built with:

- **Frontend**: React + Vite + TypeScript + Tailwind CSS + Zustand
- **Backend**: Node.js + Express + TypeScript + MongoDB + Redis
- **Authentication**: JWT (access & refresh tokens), HttpOnly cookie
- **Architecture**: FSD (Feature-Sliced Design), Dockerized

---

## 🧱 Project Structure

```
/auth-system
├── frontend/           # React app (Vite, Zustand, Tailwind)
├── backend/            # Express API (TypeScript, MongoDB)
├── docker-compose.yml  # Fullstack dev environment
├── .env.example        # Environment template
└── README.md
```

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/turabond/auth-system
cd auth-system
```

### 2. Setup Environment

Create `.env` files:

```bash
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
```

Edit values if needed (MongoDB URI, JWT secrets, ports, etc.)

---

### 3. Run with Docker

```bash
docker compose up -d --build
```

- Frontend: [http://localhost:5173](http://localhost:5173)
- Backend: [http://localhost:5001](http://localhost:5001)

---

## 🔐 Authentication Flow

- `AccessToken` stored in Zustand
- `RefreshToken` stored in HttpOnly cookie
- Auto-refresh on 401 errors via fetch wrapper
- Logout clears cookie and state

---

## 📦 Frontend Stack

- **React + Vite**
- **TypeScript**
- **Tailwind CSS**
- **Zustand** for auth state
- **Feature-Sliced Design (FSD)** architecture
- **Custom fetch wrapper** with interceptors

### Commands

```bash
cd frontend
npm install
npm run dev
```

---

## 🛠️ Backend Stack

- **Node.js + Express**
- **TypeScript**
- **MongoDB + Redis (via Docker)**
- **JWT auth** (access + refresh)
- **Cookies (HttpOnly)** for refresh token

### Features

- Register/Login/Logout
- Refresh Token logic
- Role-based access (Admin, Manager, User)
- Input validation

### Commands

```bash
cd backend
npm install
npm run dev
```

---

## 🔧 API Endpoints

| Method | Endpoint         | Description            |
|--------|------------------|------------------------|
| POST   | `/api/register`  | Register new user      |
| POST   | `/api/login`     | Login with credentials |
| POST   | `/api/refresh`   | Refresh access token   |
| POST   | `/api/logout`    | Logout and clear cookie|
| GET    | `/api/users`     | Protected route        |

---

## ⚙️ Environment Variables

### 📁 `backend/.env.example`

```env
PORT=5001
MONGODB_URI=mongodb://mongo:27017/auth_db
ACCESS_TOKEN_SECRET=yourAccessSecret
REFRESH_TOKEN_SECRET=yourRefreshSecret
CLIENT_URL=http://localhost:5173
```

### 📁 `frontend/.env.example`

```env
VITE_API_URL=http://localhost:5001/api
```

---

## 🐳 Docker Setup

```bash
docker compose up -d --build
```

- MongoDB runs in `mongo` container
- Backend runs on `localhost:5001`
- Frontend runs on `localhost:5173`

---

## 🧪 Development Notes

- Access token lifetime: `3 minutes`
- Refresh token lifetime: `30 days`
- Protected routes implemented with `ProtectedRoute` component
- Auto-refresh token logic is inside `fetchWrapper.ts`

---

## 🧩 Tech Stack Summary

| Layer       | Stack                             |
|-------------|-----------------------------------|
| Frontend    | React, Vite, Zustand, Tailwind    |
| Backend     | Express, MongoDB, TypeScript      |
| Auth        | JWT (access + refresh), cookies   |
| DevOps      | Docker, docker-compose            |

---

## 📁 FSD Folder Structure (Frontend)

```
src/
├── app/              # App init & routing
├── entities/         # Business models (User)
├── features/         # Features (auth)
├── shared/           # Shared UI, lib, config
├── widgets/          # Reusable UI widgets
├── pages/            # Route-based pages
```

---