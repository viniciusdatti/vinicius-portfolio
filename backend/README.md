# Portfolio Backend API

REST API built with FastAPI for the professional portfolio application.

## Tech Stack

- **FastAPI** - Modern, fast web framework for building APIs
- **SQLAlchemy 2.x** - SQL toolkit and ORM
- **PostgreSQL** - Database
- **Pydantic** - Data validation using Python type annotations

## Project Structure

```
backend/
├── app/
│   ├── api/
│   │   └── v1/
│   │       └── endpoints/
│   │           └── projects.py    # Projects endpoint
│   ├── core/
│   │   ├── config.py              # Application settings
│   │   ├── exceptions.py          # Exception handlers
│   │   └── logging.py             # Logging configuration
│   ├── db/
│   │   ├── base.py                # SQLAlchemy base
│   │   └── session.py             # Database session
│   ├── models/
│   │   ├── project.py             # Project model
│   │   └── technology.py          # Technology model
│   ├── schemas/
│   │   ├── project.py             # Project schemas
│   │   └── technology.py          # Technology schemas
│   ├── services/
│   │   └── project_service.py     # Business logic
│   └── main.py                    # Application entry point
├── scripts/
│   └── seed.py                    # Database seed script
├── requirements.txt
├── .env.example
└── README.md
```

## Setup

### Prerequisites

- Python 3.11+
- PostgreSQL 14+

### Installation

1. Create and activate a virtual environment:

```bash
cd backend
python -m venv venv

# Windows
venv\Scripts\activate

# Linux/Mac
source venv/bin/activate
```

2. Install dependencies:

```bash
pip install -r requirements.txt
```

3. Configure environment variables:

```bash
cp .env.example .env
# Edit .env with your database credentials
```

4. Create the database:

```bash
# Using psql
createdb portfolio
```

5. Seed the database (optional):

```bash
python scripts/seed.py
```

### Running the Server

```bash
# Development
uvicorn app.main:app --reload --port 8000

# Production
uvicorn app.main:app --host 0.0.0.0 --port 8000
```

## API Endpoints

### Health Check

```
GET /health
```

Returns the API health status.

### Projects

```
GET /api/v1/projects
GET /api/v1/projects?technology=react
```

Returns a list of portfolio projects, optionally filtered by technology.

**Query Parameters:**

- `technology` (optional): Filter projects by technology name or slug

**Response Example:**

```json
[
  {
    "id": 1,
    "title": "Corporate Design System",
    "title_pt": "Sistema de Design Corporativo",
    "description": "Reusable component library...",
    "description_pt": "Biblioteca de componentes...",
    "repository_url": "https://github.com/...",
    "demo_url": "https://...",
    "technologies": [
      { "id": 1, "name": "React", "slug": "react" }
    ],
    "created_at": "2024-01-01T00:00:00Z",
    "updated_at": "2024-01-01T00:00:00Z"
  }
]
```

## API Documentation

When running in development mode, API documentation is available at:

- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://postgres:postgres@localhost:5432/portfolio` |
| `CORS_ORIGINS` | Comma-separated list of allowed origins | `http://localhost:3000,http://localhost:5173` |
| `ENVIRONMENT` | Environment name (development/production) | `development` |
| `LOG_LEVEL` | Logging level | `INFO` |
