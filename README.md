# 📝 Todo App — Django + React + TypeScript + Vite + Tailwind

A simple full-stack **Todo List** application built as a demonstration of how to combine  
**Django REST Framework (Python 3.13)** on the backend and **React + TypeScript + Vite + Tailwind CSS** on the frontend.  
The project uses **NGINX** as a reverse proxy and static file server in the Docker setup.  
Authentication is not implemented — this is a clean, minimal example.

---

## ⚙️ Tech Stack

**Backend:** Django · Django REST Framework · SQLite  
**Frontend:** React · TypeScript · Vite · Tailwind CSS  
**Runtime:** Python 3.13 · Node 22  
**Containerization:** Docker · Docker Compose · NGINX (reverse proxy)

---

## 🚀 Running Locally (without Docker)

1. **Backend setup**
    ```bash
   cd backend
   python -m venv venv
   source venv/bin/activate  # Windows: venv\Scripts\activate
   pip install -r requirements.txt
   cp .env.example .env      # or create your own .env file
   python manage.py migrate
   python manage.py runserver
    ```

    → Backend runs at **[http://localhost:8000](http://localhost:8000)**

2. **Frontend setup**

    ```bash
    cd frontend
    npm install
    npm run dev
    ```

   → Frontend runs at **[http://localhost:5173](http://localhost:5173)**

---

## 🐳 Running with Docker Compose

Make sure Docker Desktop is running, then from the project root:

```bash
# Build and start all services (backend + frontend + nginx)
docker compose up --build
```

* Application available at **[http://localhost](http://localhost)**
* NGINX proxies requests:

  * `/api/...` → Django backend (`backend:8000`)
  * `/` → React build served from NGINX

To run detached:

```bash
docker compose up --build -d
```

To stop and clean up:

```bash
docker compose down
```

---

## 🔑 Environment Variables

The backend expects environment variables defined in `.env`.
A template file **`.env.example`** is included — copy it and adjust values as needed.

Example:

```bash
SECRET_KEY=django-secret-key
DEBUG=False
ALLOWED_HOSTS=localhost,127.0.0.1,api.mydomain.com
CORS_ALLOW_ALL_ORIGINS=False
CORS_ALLOW_CREDENTIALS=False
CORS_ALLOWED_ORIGINS=http://localhost:5173,http://127.0.0.1:5173,https://app.mydomain.com
CORS_PREFLIGHT_MAX_AGE=600
```

When running with Docker Compose, the `.env` file is automatically loaded into the backend container.

---

## 📁 Project Structure

```
backend/     → Django REST API
frontend/    → React + TypeScript + Vite + Tailwind
docker-compose.yml
```

---

## ✅ Summary

This repository demonstrates a clean, minimal production-style setup for a
**Django + React** full-stack application, ready to run either natively or in Docker.

