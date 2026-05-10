# Docker Deployment Guide

## Prerequisites
- Docker
- Docker Compose

## Quick Start

To start the entire application stack with PostgreSQL, pgAdmin, backend, and frontend:

```bash
docker compose up -d --build
```

This will:
1. Build and start the PostgreSQL database
2. Start pgAdmin for database management
3. Build the frontend and copy files to a shared volume
4. Build and start the backend API server
5. Start Nginx reverse proxy

## Access Points

- **Frontend**: http://localhost:80
- **pgAdmin**: http://localhost:8080
  - Email: admin@example.com
  - Password: admin
- **Backend API**: http://localhost:4000 (internal, proxied through Nginx)

## Services

### PostgreSQL Database
- Host: `postgres`
- Port: 5432
- User: postgres
- Password: Anubis
- Database: prac
- Volume: `postgres_data`

### pgAdmin
- Port: 8080
- Email: admin@example.com
- Password: admin

### Backend
- Container name: film-backend
- Port: 4000 (internal)
- Environment variables from docker-compose.yml:
  - DATABASE_HOST: postgres
  - DATABASE_PORT: 5432
  - DATABASE_USER: postgres
  - DATABASE_PASSWORD: Anubis
  - DATABASE_NAME: prac
  - LOGGER: tskv
  - NODE_ENV: production

### Frontend
- Container name: film-frontend-builder
- Built static files are stored in `frontend_dist` volume
- Served through Nginx

### Nginx Reverse Proxy
- Port: 80
- Serves frontend static files from `/`
- Proxies `/api/` to backend
- Proxies `/content/` to backend

## Network

All services are connected through the `film-network` bridge network.

## Stopping the Application

```bash
docker compose down
```

To remove all data including databases:

```bash
docker compose down -v
```

## Rebuilding Services

```bash
docker compose build
docker compose up -d
```

## View Logs

```bash
docker compose logs -f [service_name]
```

Example:
```bash
docker compose logs -f backend
docker compose logs -f nginx
```

## Container Images

The images are configured with labels for ghcr.io registry:
- Frontend: `ghcr.io/film-react-nest/frontend`
- Backend: `ghcr.io/film-react-nest/backend`
- Nginx: `ghcr.io/film-react-nest/nginx`