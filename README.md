# Vinicius Portfolio - Full-Stack Monorepo

Professional portfolio application demonstrating full-stack development skills.

## Project Structure

```
vinicius-portfolio/
├── backend/                  # FastAPI REST API
│   ├── app/
│   │   ├── api/              # API endpoints
│   │   ├── core/             # Configuration, logging, exceptions
│   │   ├── db/               # Database configuration
│   │   ├── models/           # SQLAlchemy models
│   │   ├── schemas/          # Pydantic schemas
│   │   └── services/         # Business logic
│   ├── scripts/              # Utility scripts (seed, etc.)
│   ├── requirements.txt
│   └── .env.example
├── interfaces/
│   └── web/                  # React Frontend
│       ├── src/
│       │   ├── api/          # API client
│       │   ├── components/   # UI components
│       │   ├── hooks/        # Custom hooks
│       │   ├── i18n/         # Internationalization
│       │   ├── styles/       # Theme and global styles
│       │   └── pages/        # Route pages (single source for screens)
│       ├── public/
│       ├── package.json
│       └── .env.example
├── docs/                     # Documentation
│   └── portfolio/
│       ├── functional_requirements/
│       └── technical_specifications/
└── README.md
```

## Tech Stack

### Backend
- **FastAPI** - Modern Python web framework
- **SQLAlchemy 2.x** - ORM for database operations
- **PostgreSQL** - Relational database
- **Pydantic** - Data validation

### Frontend (interfaces/web)
- **React 19** - UI library
- **TypeScript** - Type safety
- **TanStack Query** - Server state management
- **styled-components** - CSS-in-JS styling
- **react-i18next** - Internationalization (pt-BR / en-US)
- **Framer Motion** - Animations

## Getting Started

### Prerequisites

- Node.js 18+
- Python 3.11+
- PostgreSQL 14+
- Yarn

### Backend Setup

```bash
cd vinicius-portfolio/backend

# Create virtual environment
python -m venv venv

# Activate (Windows)
venv\Scripts\activate

# Activate (Linux/Mac)
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Configure environment
cp .env.example .env
# Edit .env with your database credentials

# Create database
createdb portfolio

# Seed initial data (optional)
python scripts/seed.py

# Run server
uvicorn app.main:app --reload --port 8000
```

### Frontend Setup

```bash
cd vinicius-portfolio/interfaces/web

# Install dependencies
yarn install

# Configure environment
cp .env.example .env

# Run development server
yarn start
```

### Running Both

**Terminal 1 (Backend):**
```bash
cd vinicius-portfolio/backend
venv\Scripts\activate
uvicorn app.main:app --reload --port 8000
```

**Terminal 2 (Frontend):**
```bash
cd vinicius-portfolio/interfaces/web
yarn start
```

- Frontend: http://localhost:3000
- API: http://localhost:8000
- API Docs: http://localhost:8000/docs

## Environment Variables

### Backend (`backend/.env`)

| Variable | Description | Default |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://postgres:postgres@localhost:5432/portfolio` |
| `CORS_ORIGINS` | Allowed origins (comma-separated) | `http://localhost:3000` |
| `ENVIRONMENT` | Environment name | `development` |
| `LOG_LEVEL` | Logging level | `INFO` |

### Frontend (`interfaces/web/.env`)

| Variable | Description | Default |
|----------|-------------|---------|
| `REACT_APP_API_URL` | Backend API URL | `http://localhost:8000/api/v1` |

## Features

- Full-Stack Architecture with REST API
- Database with Many-to-Many relationships
- Internationalization (pt-BR / en-US)
- Skeleton Loading states
- Global error handling
- Design System with tokens
- Dark Mode ready architecture
