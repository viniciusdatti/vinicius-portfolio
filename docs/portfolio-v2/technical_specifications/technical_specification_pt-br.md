# Especificação Técnica - Portfólio Vinicius Datti V2

> **Atualização (2026):** As seções de **chat em tempo real**, **painel admin** e **autenticação JWT** foram **removidas do código**. O produto atual é: site público (projetos, skills, certificados, contato) + **Live Lab** (telemetria via Socket.IO `/telemetry`). Use o repositório como fonte da verdade; trechos abaixo que citam admin/chat são histórico de planejamento.

## Documento de Referência
- **Requisito Funcional:** `/docs/portfolio-v2/functional_requirements/feature_requirement_pt-br.md`
- **Versão:** 1.0
- **Data:** 14/02/2026
- **Autor:** Arquiteto de Software / Lead Developer

---

## 1. Visão Geral e Decisões Técnicas

### 1.1 Resumo do Projeto
Portfólio full-stack com páginas editoriais, formulário de contato, API de conteúdo e **Live Lab** (demo de telemetria industrial em tempo real via WebSocket), com UX/UI de alta qualidade.

### 1.2 Tabela de Decisões Técnicas

| Área | Tecnologia | Justificativa |
|------|------------|---------------|
| **Estado Global** | Zustand | Leve (~1kb), API simples, seletores otimizados, sem boilerplate |
| **WebSocket** | Socket.io (python-socketio + socket.io-client) | Reconexão automática, fallback para polling, rooms/namespaces |
| **Animações** | Framer Motion | Já instalado, API declarativa, exit animations, gestures |
| **Roteamento** | React Router v6 | Padrão de mercado, lazy loading nativo, nested routes |
| **Email** | Resend | API moderna, 3000 emails/mês grátis, templates React |
| **Push Mobile** | Telegram Bot API | Gratuito, setup simples, notificação instantânea |
| **Banco de Dados** | Neon PostgreSQL | Serverless, sempre gratuito (0.5GB), compatível com SQLAlchemy |
| **Storage Imagens** | Cloudinary | 25GB grátis, transformações de imagem, CDN global |
| **Frontend Host** | Vercel | Gratuito para projetos pessoais, CI/CD automático, Edge Network |
| **Backend Host** | Render | 750h/mês grátis, suporte WebSocket, deploy automático |
| **Autenticação Admin** | JWT + bcrypt | Simples, stateless, padrão de mercado |
| **Rate Limiting** | slowapi (backend) | Integração nativa com FastAPI |
| **Anti-spam** | Honeypot + Rate Limiting | Simples, sem fricção para usuário |

### 1.3 Stack Tecnológico Completo

#### Frontend
```
React 19 + TypeScript
├── react-router-dom (navegação)
├── zustand (estado global)
├── socket.io-client (WebSocket)
├── framer-motion (animações) ✓ já instalado
├── styled-components ✓ já instalado
├── react-i18next ✓ já instalado
├── @tanstack/react-query ✓ já instalado
└── react-hook-form + zod (formulários)
```

#### Backend
```
FastAPI + Python 3.11
├── python-socketio (WebSocket)
├── sqlalchemy ✓ já instalado
├── pydantic-settings ✓ já instalado
├── resend (emails)
├── python-telegram-bot (notificações)
├── slowapi (rate limiting)
├── python-jose (JWT)
├── passlib[bcrypt] (hash de senhas)
└── cloudinary (upload de imagens)
```

---

## 2. Arquitetura

### 2.1 Diagrama de Arquitetura Geral

```mermaid
flowchart TB
    subgraph Cliente["🌐 Cliente (Browser)"]
        React["React App"]
        SocketClient["Socket.io Client"]
    end

    subgraph Vercel["☁️ Vercel (Frontend)"]
        StaticFiles["Static Files + CDN"]
    end

    subgraph Render["☁️ Render (Backend)"]
        FastAPI["FastAPI Server"]
        SocketServer["Socket.io Server"]
        Workers["Background Workers"]
    end

    subgraph Externos["🔌 Serviços Externos"]
        Neon["Neon PostgreSQL"]
        Cloudinary["Cloudinary CDN"]
        Resend["Resend Email"]
        Telegram["Telegram Bot"]
    end

    React --> StaticFiles
    StaticFiles --> FastAPI
    SocketClient <--> SocketServer
    FastAPI --> Neon
    FastAPI --> Cloudinary
    Workers --> Resend
    Workers --> Telegram
```

### 2.2 Diagrama de Fluxo do Chat em Tempo Real

```mermaid
sequenceDiagram
    participant V as Visitante
    participant FE as Frontend
    participant WS as WebSocket Server
    participant DB as PostgreSQL
    participant TG as Telegram Bot
    participant Admin as Admin Panel

    V->>FE: Abre Live Lab
    FE->>WS: connect()
    WS->>DB: Criar sessão de chat
    WS->>FE: session_created(session_id)
    
    V->>FE: Envia mensagem
    FE->>WS: message(content)
    WS->>DB: Salvar mensagem
    WS->>TG: Notificar Vinicius
    WS->>Admin: broadcast(new_message)
    
    Admin->>WS: reply(session_id, content)
    WS->>DB: Salvar resposta
    WS->>FE: message(response)
    FE->>V: Exibir resposta
```

### 2.3 Diagrama de Fluxo de Autenticação Admin

```mermaid
sequenceDiagram
    participant A as Admin
    participant FE as Frontend
    participant API as FastAPI
    participant DB as PostgreSQL

    A->>FE: Login (email, password)
    FE->>API: POST /api/v1/auth/login
    API->>DB: Buscar usuário
    DB->>API: User data
    API->>API: Verificar bcrypt hash
    API->>FE: JWT Token + Refresh Token
    FE->>FE: Salvar tokens (httpOnly cookie)
    
    A->>FE: Acessar painel admin
    FE->>API: GET /api/v1/admin/* (Bearer token)
    API->>API: Validar JWT
    API->>FE: Dados protegidos
```

### 2.4 Tabela de Componentes Impactados

| Componente | Tipo | Impacto | Ação |
|------------|------|---------|------|
| `App.tsx` | Frontend | Alto | Adicionar React Router, providers |
| `theme.ts` | Frontend | Alto | Adicionar tema light, variáveis CSS |
| `GlobalStyles.ts` | Frontend | Médio | Adicionar transições de tema |
| `main.py` | Backend | Alto | Adicionar Socket.io, novos routers |
| `config.py` | Backend | Alto | Novas variáveis de ambiente |
| `models/` | Backend | Alto | Novos modelos (User, Chat, Skill, Certificate) |
| `package.json` | Frontend | Médio | Novas dependências |
| `requirements.txt` | Backend | Médio | Novas dependências |

---

## 3. Detalhamento do Banco de Dados

### 3.1 Diagrama ER

```mermaid
erDiagram
    USERS {
        int id PK
        string email UK
        string password_hash
        string name
        string role
        boolean is_active
        datetime created_at
        datetime updated_at
    }
    
    SKILLS {
        int id PK
        string name
        string name_pt
        string category
        int proficiency
        string icon_url
        int display_order
        boolean is_active
        datetime created_at
        datetime updated_at
    }
    
    CERTIFICATES {
        int id PK
        string name
        string name_pt
        string platform
        string platform_logo_url
        string certificate_url
        string image_url
        int year
        int display_order
        boolean is_active
        datetime created_at
        datetime updated_at
    }
    
    CHAT_SESSIONS {
        int id PK
        string session_uuid UK
        string visitor_name
        string visitor_company
        string status
        datetime started_at
        datetime last_activity_at
        datetime ended_at
    }
    
    CHAT_MESSAGES {
        int id PK
        int session_id FK
        string sender_type
        text content
        boolean is_read
        datetime created_at
    }
    
    CONTACT_SUBMISSIONS {
        int id PK
        string name
        string email
        string company
        string subject
        text message
        string ip_address
        string status
        datetime created_at
    }
    
    CHAT_SESSIONS ||--o{ CHAT_MESSAGES : contains
```

### 3.2 Scripts SQL - Novas Tabelas

```sql
-- Tabela de Usuários (Admin)
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    name VARCHAR(100) NOT NULL,
    role VARCHAR(20) DEFAULT 'admin' CHECK (role IN ('admin', 'super_admin')),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de Skills
CREATE TABLE skills (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    name_pt VARCHAR(100),
    category VARCHAR(50) NOT NULL CHECK (category IN ('frontend', 'backend', 'testing', 'realtime', 'tools', 'iot')),
    proficiency INTEGER CHECK (proficiency BETWEEN 1 AND 100),
    icon_url VARCHAR(500),
    display_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de Certificados
CREATE TABLE certificates (
    id SERIAL PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    name_pt VARCHAR(200),
    platform VARCHAR(100) NOT NULL,
    platform_logo_url VARCHAR(500),
    certificate_url VARCHAR(500),
    image_url VARCHAR(500),
    year INTEGER,
    display_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de Sessões de Chat
CREATE TABLE chat_sessions (
    id SERIAL PRIMARY KEY,
    session_uuid UUID UNIQUE DEFAULT gen_random_uuid(),
    visitor_name VARCHAR(100),
    visitor_company VARCHAR(200),
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'closed', 'archived')),
    started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    last_activity_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    ended_at TIMESTAMP WITH TIME ZONE
);

-- Tabela de Mensagens do Chat
CREATE TABLE chat_messages (
    id SERIAL PRIMARY KEY,
    session_id INTEGER REFERENCES chat_sessions(id) ON DELETE CASCADE,
    sender_type VARCHAR(20) NOT NULL CHECK (sender_type IN ('visitor', 'admin')),
    content TEXT NOT NULL,
    is_read BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de Submissões de Contato
CREATE TABLE contact_submissions (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    company VARCHAR(200),
    subject VARCHAR(200),
    message TEXT NOT NULL,
    ip_address VARCHAR(45),
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'read', 'replied', 'archived')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para performance
CREATE INDEX idx_chat_sessions_status ON chat_sessions(status);
CREATE INDEX idx_chat_sessions_last_activity ON chat_sessions(last_activity_at DESC);
CREATE INDEX idx_chat_messages_session ON chat_messages(session_id);
CREATE INDEX idx_chat_messages_created ON chat_messages(created_at DESC);
CREATE INDEX idx_skills_category ON skills(category);
CREATE INDEX idx_skills_active ON skills(is_active);
CREATE INDEX idx_certificates_active ON certificates(is_active);
CREATE INDEX idx_contact_status ON contact_submissions(status);
```

---

## 4. Detalhamento Backend

### 4.1 Estrutura de Diretórios (Atualizada)

```
backend/
├── app/
│   ├── __init__.py
│   ├── main.py                    # Entry point + Socket.io
│   ├── api/
│   │   ├── __init__.py
│   │   ├── deps.py                # Dependências comuns (auth, db)
│   │   └── v1/
│   │       ├── __init__.py
│   │       ├── router.py          # Router principal
│   │       └── endpoints/
│   │           ├── __init__.py
│   │           ├── projects.py    ✓ existente
│   │           ├── auth.py        🆕 autenticação
│   │           ├── skills.py      🆕 CRUD skills
│   │           ├── certificates.py 🆕 CRUD certificados
│   │           ├── contact.py     🆕 formulário contato
│   │           └── admin/
│   │               ├── __init__.py
│   │               ├── dashboard.py  🆕 estatísticas
│   │               ├── skills.py     🆕 admin skills
│   │               └── certificates.py 🆕 admin certificados
│   ├── core/
│   │   ├── __init__.py
│   │   ├── config.py              # Atualizar com novas vars
│   │   ├── exceptions.py          ✓ existente
│   │   ├── logging.py             ✓ existente
│   │   ├── security.py            🆕 JWT + bcrypt
│   │   └── rate_limit.py          🆕 slowapi config
│   ├── db/
│   │   ├── __init__.py
│   │   ├── base.py                ✓ existente
│   │   └── session.py             ✓ existente (atualizar para async)
│   ├── models/
│   │   ├── __init__.py
│   │   ├── project.py             ✓ existente
│   │   ├── technology.py          ✓ existente
│   │   ├── user.py                🆕
│   │   ├── skill.py               🆕
│   │   ├── certificate.py         🆕
│   │   ├── chat.py                🆕
│   │   └── contact.py             🆕
│   ├── schemas/
│   │   ├── __init__.py
│   │   ├── project.py             ✓ existente
│   │   ├── technology.py          ✓ existente
│   │   ├── auth.py                🆕
│   │   ├── user.py                🆕
│   │   ├── skill.py               🆕
│   │   ├── certificate.py         🆕
│   │   ├── chat.py                🆕
│   │   └── contact.py             🆕
│   ├── services/
│   │   ├── __init__.py
│   │   ├── project_service.py     ✓ existente
│   │   ├── auth_service.py        🆕
│   │   ├── skill_service.py       🆕
│   │   ├── certificate_service.py 🆕
│   │   ├── chat_service.py        🆕
│   │   ├── contact_service.py     🆕
│   │   ├── email_service.py       🆕 Resend
│   │   ├── telegram_service.py    🆕 Notificações
│   │   └── cloudinary_service.py  🆕 Upload imagens
│   └── websocket/
│       ├── __init__.py
│       ├── server.py              🆕 Socket.io server
│       ├── events.py              🆕 Event handlers
│       └── manager.py             🆕 Connection manager
├── alembic/                       🆕 Migrations
│   ├── versions/
│   └── env.py
├── tests/
│   ├── __init__.py
│   ├── conftest.py
│   └── ...
├── .env.example
├── alembic.ini
├── requirements.txt
└── Dockerfile
```

### 4.2 Endpoints da API

#### 4.2.1 Autenticação (`/api/v1/auth`)

| Método | Endpoint | Descrição | Auth |
|--------|----------|-----------|------|
| POST | `/login` | Login admin | Não |
| POST | `/refresh` | Renovar token | Refresh Token |
| POST | `/logout` | Invalidar token | JWT |
| GET | `/me` | Dados do usuário logado | JWT |

**Schema - Login Request:**
```python
class LoginRequest(BaseModel):
    email: EmailStr
    password: str = Field(..., min_length=8)

class LoginResponse(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str = "bearer"
    expires_in: int  # segundos

class UserResponse(BaseModel):
    id: int
    email: str
    name: str
    role: str
```

#### 4.2.2 Skills (`/api/v1/skills`)

| Método | Endpoint | Descrição | Auth |
|--------|----------|-----------|------|
| GET | `/` | Listar skills ativas | Não |
| GET | `/{id}` | Detalhes de uma skill | Não |

**Admin (`/api/v1/admin/skills`):**

| Método | Endpoint | Descrição | Auth |
|--------|----------|-----------|------|
| GET | `/` | Listar todas skills | JWT |
| POST | `/` | Criar skill | JWT |
| PUT | `/{id}` | Atualizar skill | JWT |
| DELETE | `/{id}` | Deletar skill | JWT |
| PATCH | `/{id}/toggle` | Ativar/desativar | JWT |
| PATCH | `/reorder` | Reordenar skills | JWT |

**Schema - Skill:**
```python
class SkillBase(BaseModel):
    name: str = Field(..., max_length=100)
    name_pt: Optional[str] = Field(None, max_length=100)
    category: Literal['frontend', 'backend', 'testing', 'realtime', 'tools', 'iot']
    proficiency: int = Field(..., ge=1, le=100)
    icon_url: Optional[str] = None
    display_order: int = 0

class SkillCreate(SkillBase):
    pass

class SkillUpdate(BaseModel):
    name: Optional[str] = None
    name_pt: Optional[str] = None
    category: Optional[str] = None
    proficiency: Optional[int] = None
    icon_url: Optional[str] = None
    display_order: Optional[int] = None
    is_active: Optional[bool] = None

class SkillResponse(SkillBase):
    id: int
    is_active: bool
    created_at: datetime
    updated_at: datetime
```

#### 4.2.3 Certificados (`/api/v1/certificates`)

| Método | Endpoint | Descrição | Auth |
|--------|----------|-----------|------|
| GET | `/` | Listar certificados ativos | Não |
| GET | `/{id}` | Detalhes de um certificado | Não |
| GET | `/platforms` | Listar plataformas únicas | Não |

**Admin (`/api/v1/admin/certificates`):**

| Método | Endpoint | Descrição | Auth |
|--------|----------|-----------|------|
| GET | `/` | Listar todos certificados | JWT |
| POST | `/` | Criar certificado | JWT |
| POST | `/{id}/upload` | Upload imagem | JWT |
| PUT | `/{id}` | Atualizar certificado | JWT |
| DELETE | `/{id}` | Deletar certificado | JWT |
| PATCH | `/{id}/toggle` | Ativar/desativar | JWT |

**Schema - Certificate:**
```python
class CertificateBase(BaseModel):
    name: str = Field(..., max_length=200)
    name_pt: Optional[str] = Field(None, max_length=200)
    platform: str = Field(..., max_length=100)
    platform_logo_url: Optional[str] = None
    certificate_url: Optional[str] = None
    year: Optional[int] = Field(None, ge=2000, le=2030)
    display_order: int = 0

class CertificateCreate(CertificateBase):
    pass

class CertificateResponse(CertificateBase):
    id: int
    image_url: Optional[str]
    is_active: bool
    created_at: datetime
    updated_at: datetime
```

#### 4.2.4 Contato (`/api/v1/contact`)

| Método | Endpoint | Descrição | Auth |
|--------|----------|-----------|------|
| POST | `/` | Enviar mensagem de contato | Não (rate limited) |

**Admin (`/api/v1/admin/contact`):**

| Método | Endpoint | Descrição | Auth |
|--------|----------|-----------|------|
| GET | `/` | Listar submissões | JWT |
| GET | `/{id}` | Detalhes de submissão | JWT |
| PATCH | `/{id}/status` | Atualizar status | JWT |
| DELETE | `/{id}` | Deletar submissão | JWT |

**Schema - Contact:**
```python
class ContactCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=100)
    email: EmailStr
    company: Optional[str] = Field(None, max_length=200)
    subject: Optional[str] = Field(None, max_length=200)
    message: str = Field(..., min_length=10, max_length=5000)
    honeypot: Optional[str] = Field(None, exclude=True)  # Anti-spam

class ContactResponse(BaseModel):
    id: int
    name: str
    email: str
    company: Optional[str]
    subject: Optional[str]
    message: str
    status: str
    created_at: datetime
```

#### 4.2.5 Chat WebSocket Events

**Namespace:** `/chat`

**Client → Server Events:**

| Evento | Payload | Descrição |
|--------|---------|-----------|
| `join` | `{ visitor_name?, visitor_company? }` | Iniciar sessão de chat |
| `message` | `{ content: string }` | Enviar mensagem |
| `typing` | `{ is_typing: boolean }` | Indicador de digitação |
| `leave` | - | Encerrar sessão |

**Server → Client Events:**

| Evento | Payload | Descrição |
|--------|---------|-----------|
| `session_created` | `{ session_id, welcome_message }` | Sessão iniciada |
| `message` | `{ id, content, sender_type, created_at }` | Nova mensagem |
| `typing` | `{ is_typing: boolean }` | Admin digitando |
| `admin_status` | `{ is_online: boolean }` | Status do admin |
| `error` | `{ code, message }` | Erro |

**Admin Namespace:** `/admin-chat`

| Evento | Payload | Descrição |
|--------|---------|-----------|
| `sessions_list` | `[{ session_id, visitor_name, unread_count }]` | Lista de sessões |
| `new_session` | `{ session_id, visitor_name }` | Nova sessão iniciada |
| `message` | `{ session_id, content, sender_type }` | Nova mensagem |
| `reply` | `{ session_id, content }` | Enviar resposta |

### 4.3 Configuração Atualizada (`config.py`)

```python
class Settings(BaseSettings):
    # Database
    database_url: str = "postgresql://..."
    
    # CORS
    cors_origins: str = "http://localhost:3000"
    
    # Environment
    environment: str = "development"
    
    # JWT
    jwt_secret_key: str
    jwt_algorithm: str = "HS256"
    jwt_access_token_expire_minutes: int = 30
    jwt_refresh_token_expire_days: int = 7
    
    # Resend (Email)
    resend_api_key: str
    resend_from_email: str = "contato@viniciusdatti.dev"
    notification_email: str = "viniciusdatti@gmail.com"
    
    # Telegram
    telegram_bot_token: str
    telegram_chat_id: str
    
    # Cloudinary
    cloudinary_cloud_name: str
    cloudinary_api_key: str
    cloudinary_api_secret: str
    
    # Rate Limiting
    rate_limit_per_minute: int = 60
    contact_rate_limit_per_hour: int = 3
    chat_rate_limit_per_minute: int = 10
```

### 4.4 Serviço de Email (`email_service.py`)

```python
import resend
from app.core.config import get_settings

settings = get_settings()
resend.api_key = settings.resend_api_key

class EmailService:
    @staticmethod
    async def send_contact_notification(contact: ContactCreate) -> bool:
        """Envia notificação de novo contato."""
        try:
            resend.Emails.send({
                "from": settings.resend_from_email,
                "to": settings.notification_email,
                "subject": f"[Portfólio] Novo contato de {contact.name}",
                "html": f"""
                    <h2>Nova mensagem de contato</h2>
                    <p><strong>Nome:</strong> {contact.name}</p>
                    <p><strong>Email:</strong> {contact.email}</p>
                    <p><strong>Empresa:</strong> {contact.company or 'Não informada'}</p>
                    <p><strong>Assunto:</strong> {contact.subject or 'Não informado'}</p>
                    <hr>
                    <p><strong>Mensagem:</strong></p>
                    <p>{contact.message}</p>
                """
            })
            return True
        except Exception as e:
            logger.error(f"Erro ao enviar email: {e}")
            return False
    
    @staticmethod
    async def send_chat_notification(visitor_name: str, message: str) -> bool:
        """Envia notificação de nova mensagem no chat."""
        # Similar implementation
        pass
```

### 4.5 Serviço Telegram (`telegram_service.py`)

```python
import httpx
from app.core.config import get_settings

settings = get_settings()

class TelegramService:
    BASE_URL = f"https://api.telegram.org/bot{settings.telegram_bot_token}"
    
    @staticmethod
    async def send_notification(message: str) -> bool:
        """Envia notificação push via Telegram."""
        try:
            async with httpx.AsyncClient() as client:
                response = await client.post(
                    f"{TelegramService.BASE_URL}/sendMessage",
                    json={
                        "chat_id": settings.telegram_chat_id,
                        "text": message,
                        "parse_mode": "HTML"
                    }
                )
                return response.status_code == 200
        except Exception as e:
            logger.error(f"Erro ao enviar Telegram: {e}")
            return False
    
    @staticmethod
    async def notify_new_chat(visitor_name: str, company: str = None):
        """Notifica sobre nova sessão de chat."""
        company_text = f" ({company})" if company else ""
        message = f"🔔 <b>Novo chat iniciado!</b>\n\n👤 {visitor_name}{company_text}\n\n<i>Acesse o painel admin para responder.</i>"
        await TelegramService.send_notification(message)
    
    @staticmethod
    async def notify_new_message(visitor_name: str, content: str):
        """Notifica sobre nova mensagem."""
        preview = content[:100] + "..." if len(content) > 100 else content
        message = f"💬 <b>Nova mensagem de {visitor_name}</b>\n\n{preview}"
        await TelegramService.send_notification(message)
```

### 4.6 WebSocket Server (`websocket/server.py`)

```python
import socketio
from app.core.config import get_settings
from app.services.chat_service import ChatService
from app.services.telegram_service import TelegramService

settings = get_settings()

# Criar servidor Socket.io
sio = socketio.AsyncServer(
    async_mode='asgi',
    cors_allowed_origins=settings.cors_origins_list,
    logger=True,
    engineio_logger=True if settings.is_development else False
)

# Manager para rastrear conexões
class ConnectionManager:
    def __init__(self):
        self.active_sessions: dict[str, str] = {}  # sid -> session_uuid
        self.admin_sids: set[str] = set()
        self.admin_online: bool = False
    
    def is_admin_online(self) -> bool:
        return len(self.admin_sids) > 0

manager = ConnectionManager()

# Namespace do Chat (Visitantes)
@sio.on('connect', namespace='/chat')
async def chat_connect(sid, environ):
    print(f"Visitante conectado: {sid}")
    await sio.emit('admin_status', {'is_online': manager.is_admin_online()}, room=sid, namespace='/chat')

@sio.on('join', namespace='/chat')
async def chat_join(sid, data):
    visitor_name = data.get('visitor_name', 'Visitante')
    visitor_company = data.get('visitor_company')
    
    # Criar sessão no banco
    session = await ChatService.create_session(visitor_name, visitor_company)
    manager.active_sessions[sid] = session.session_uuid
    
    # Notificar admin via Telegram
    await TelegramService.notify_new_chat(visitor_name, visitor_company)
    
    # Notificar admin panel
    await sio.emit('new_session', {
        'session_id': str(session.session_uuid),
        'visitor_name': visitor_name,
        'visitor_company': visitor_company
    }, namespace='/admin-chat')
    
    # Enviar mensagem de boas-vindas
    welcome_message = "Olá! Obrigado por entrar em contato. Como posso ajudar?"
    await sio.emit('session_created', {
        'session_id': str(session.session_uuid),
        'welcome_message': welcome_message
    }, room=sid, namespace='/chat')

@sio.on('message', namespace='/chat')
async def chat_message(sid, data):
    session_uuid = manager.active_sessions.get(sid)
    if not session_uuid:
        await sio.emit('error', {'code': 'NO_SESSION', 'message': 'Sessão não encontrada'}, room=sid, namespace='/chat')
        return
    
    content = data.get('content', '').strip()
    if not content or len(content) > 1000:
        return
    
    # Salvar mensagem
    message = await ChatService.save_message(session_uuid, 'visitor', content)
    
    # Notificar admin
    session = await ChatService.get_session(session_uuid)
    await TelegramService.notify_new_message(session.visitor_name, content)
    
    await sio.emit('message', {
        'session_id': session_uuid,
        'id': message.id,
        'content': content,
        'sender_type': 'visitor',
        'created_at': message.created_at.isoformat()
    }, namespace='/admin-chat')

# Namespace Admin
@sio.on('connect', namespace='/admin-chat')
async def admin_connect(sid, environ, auth):
    # Validar JWT do admin
    token = auth.get('token') if auth else None
    if not await validate_admin_token(token):
        raise socketio.exceptions.ConnectionRefusedError('Unauthorized')
    
    manager.admin_sids.add(sid)
    
    # Notificar visitantes que admin está online
    await sio.emit('admin_status', {'is_online': True}, namespace='/chat')
    
    # Enviar lista de sessões ativas
    sessions = await ChatService.get_active_sessions()
    await sio.emit('sessions_list', sessions, room=sid, namespace='/admin-chat')

@sio.on('reply', namespace='/admin-chat')
async def admin_reply(sid, data):
    session_uuid = data.get('session_id')
    content = data.get('content', '').strip()
    
    if not content:
        return
    
    # Salvar resposta
    message = await ChatService.save_message(session_uuid, 'admin', content)
    
    # Encontrar sid do visitante
    visitor_sid = None
    for s, uuid in manager.active_sessions.items():
        if uuid == session_uuid:
            visitor_sid = s
            break
    
    if visitor_sid:
        await sio.emit('message', {
            'id': message.id,
            'content': content,
            'sender_type': 'admin',
            'created_at': message.created_at.isoformat()
        }, room=visitor_sid, namespace='/chat')

@sio.on('disconnect', namespace='/admin-chat')
async def admin_disconnect(sid):
    manager.admin_sids.discard(sid)
    if not manager.is_admin_online():
        await sio.emit('admin_status', {'is_online': False}, namespace='/chat')
```

### 4.7 Integração com FastAPI (`main.py` atualizado)

```python
import socketio
from fastapi import FastAPI
from app.websocket.server import sio

# Criar app FastAPI
app = FastAPI(...)

# Criar app ASGI combinando FastAPI + Socket.io
socket_app = socketio.ASGIApp(sio, app)

# O socket_app é o que será servido pelo Uvicorn
```

---

## 5. Detalhamento Frontend

### 5.1 Estrutura de Diretórios (Atualizada)

```
interfaces/web/src/
├── api/
│   ├── index.ts
│   ├── client.ts                  ✓ existente
│   ├── projects.ts                ✓ existente
│   ├── skills.ts                  🆕
│   ├── certificates.ts            🆕
│   ├── contact.ts                 🆕
│   └── auth.ts                    🆕
├── components/
│   ├── common/
│   │   ├── Button/                ✓ existente
│   │   ├── Card/                  ✓ existente
│   │   ├── Typography/            ✓ existente
│   │   ├── Input/                 🆕
│   │   ├── TextArea/              🆕
│   │   ├── Modal/                 🆕
│   │   ├── Toast/                 🆕
│   │   ├── Skeleton/              🆕
│   │   ├── Badge/                 🆕
│   │   └── Spinner/               🆕
│   ├── layout/
│   │   ├── Header/                🆕
│   │   ├── Footer/                🆕
│   │   ├── Navigation/            🆕
│   │   ├── MobileMenu/            🆕
│   │   └── PageTransition/        🆕
│   ├── sections/
│   │   ├── Hero/                  ✓ existente (refatorar)
│   │   ├── SkillsPreview/         🆕
│   │   ├── LiveLabPreview/        🆕
│   │   ├── ContactCTA/            🆕
│   │   ├── AboutIntro/            🆕
│   │   ├── ProfessionalSummary/   🆕
│   │   ├── TechStack/             🆕
│   │   ├── Education/             🆕
│   │   ├── SkillsGrid/            🆕
│   │   ├── CertificatesGrid/      🆕
│   │   ├── ChatInterface/         🆕
│   │   ├── TechExplanation/       🆕
│   │   └── ContactForm/           🆕
│   └── admin/
│       ├── AdminLayout/           🆕
│       ├── ChatPanel/             🆕
│       ├── SkillsManager/         🆕
│       ├── CertificatesManager/   🆕
│       └── ContactSubmissions/    🆕
├── hooks/
│   ├── index.ts                   ✓ existente
│   ├── useProjects.ts             ✓ existente
│   ├── useSkills.ts               🆕
│   ├── useCertificates.ts         🆕
│   ├── useChat.ts                 🆕
│   ├── useTheme.ts                🆕
│   ├── useAuth.ts                 🆕
│   └── useMediaQuery.ts           🆕
├── pages/
│   ├── Home/                      🆕 (migrar de views)
│   ├── About/                     🆕
│   ├── Skills/                    🆕
│   ├── LiveLab/                   🆕
│   ├── Contact/                   🆕
│   └── admin/
│       ├── Login/                 🆕
│       ├── Dashboard/             🆕
│       ├── Chat/                  🆕
│       ├── Skills/                🆕
│       └── Certificates/          🆕
├── store/
│   ├── index.ts                   🆕
│   ├── themeStore.ts              🆕
│   ├── authStore.ts               🆕
│   └── chatStore.ts               🆕
├── styles/
│   ├── GlobalStyles.ts            ✓ existente (atualizar)
│   ├── theme.ts                   ✓ existente (atualizar)
│   ├── lightTheme.ts              🆕
│   ├── darkTheme.ts               🆕
│   └── animations.ts              🆕
├── utils/
│   ├── socket.ts                  🆕 Socket.io client
│   ├── storage.ts                 🆕 localStorage helpers
│   └── validation.ts              🆕 Zod schemas
├── types/
│   ├── index.ts                   🆕
│   ├── skill.ts                   🆕
│   ├── certificate.ts             🆕
│   ├── chat.ts                    🆕
│   └── contact.ts                 🆕
├── i18n/
│   ├── config.ts                  ✓ existente
│   └── locales/
│       ├── en-US.json             ✓ existente (expandir)
│       └── pt-BR.json             ✓ existente (expandir)
├── App.tsx                        ✓ existente (refatorar)
├── Router.tsx                     🆕
└── index.tsx                      ✓ existente
```

### 5.2 Interfaces TypeScript

#### 5.2.1 Types Globais (`types/index.ts`)

```typescript
// Skill
export interface Skill {
  id: number;
  name: string;
  name_pt: string | null;
  category: SkillCategory;
  proficiency: number;
  icon_url: string | null;
  display_order: number;
  is_active: boolean;
}

export type SkillCategory = 
  | 'frontend' 
  | 'backend' 
  | 'testing' 
  | 'realtime' 
  | 'tools' 
  | 'iot';

// Certificate
export interface Certificate {
  id: number;
  name: string;
  name_pt: string | null;
  platform: string;
  platform_logo_url: string | null;
  certificate_url: string | null;
  image_url: string | null;
  year: number | null;
  display_order: number;
  is_active: boolean;
}

// Chat
export interface ChatSession {
  session_id: string;
  visitor_name: string;
  visitor_company: string | null;
  status: 'active' | 'closed' | 'archived';
  unread_count: number;
  last_message: string | null;
  started_at: string;
}

export interface ChatMessage {
  id: number;
  content: string;
  sender_type: 'visitor' | 'admin';
  is_read: boolean;
  created_at: string;
}

// Contact
export interface ContactFormData {
  name: string;
  email: string;
  company?: string;
  subject?: string;
  message: string;
}

// Auth
export interface User {
  id: number;
  email: string;
  name: string;
  role: 'admin' | 'super_admin';
}

export interface AuthTokens {
  access_token: string;
  refresh_token: string;
  expires_in: number;
}
```

#### 5.2.2 Theme Types (`styles/theme.ts` atualizado)

```typescript
export interface ThemeColors {
  // Base
  background: string;
  backgroundSecondary: string;
  surface: string;
  surfaceHover: string;
  
  // Text
  text: string;
  textSecondary: string;
  textMuted: string;
  
  // Brand
  primary: string;
  primaryHover: string;
  primaryLight: string;
  
  // Semantic
  success: string;
  error: string;
  warning: string;
  info: string;
  
  // Border
  border: string;
  borderLight: string;
  
  // Overlay
  overlay: string;
}

export interface Theme {
  mode: 'dark' | 'light';
  colors: ThemeColors;
  typography: {
    fontFamily: {
      heading: string;
      body: string;
      mono: string;
    };
    fontSize: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
      xxl: string;
      hero: string;
    };
    fontWeight: {
      normal: number;
      medium: number;
      semibold: number;
      bold: number;
    };
    lineHeight: {
      tight: number;
      normal: number;
      relaxed: number;
    };
  };
  spacing: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    xxl: string;
    section: string;
  };
  borderRadius: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
    full: string;
  };
  shadows: {
    sm: string;
    md: string;
    lg: string;
    glow: string;
  };
  transitions: {
    fast: string;
    normal: string;
    slow: string;
    theme: string;
  };
  breakpoints: {
    mobile: string;
    tablet: string;
    desktop: string;
    wide: string;
  };
  zIndex: {
    dropdown: number;
    sticky: number;
    modal: number;
    toast: number;
  };
}

// Dark Theme
export const darkTheme: Theme = {
  mode: 'dark',
  colors: {
    background: '#0a0a0a',
    backgroundSecondary: '#050505',
    surface: '#111111',
    surfaceHover: '#1a1a1a',
    text: '#ffffff',
    textSecondary: '#e0e0e0',
    textMuted: '#888888',
    primary: '#0070f3',
    primaryHover: '#0060df',
    primaryLight: 'rgba(0, 112, 243, 0.1)',
    success: '#10b981',
    error: '#ef4444',
    warning: '#f59e0b',
    info: '#3b82f6',
    border: '#222222',
    borderLight: '#333333',
    overlay: 'rgba(0, 0, 0, 0.8)',
  },
  // ... rest of theme
};

// Light Theme
export const lightTheme: Theme = {
  mode: 'light',
  colors: {
    background: '#ffffff',
    backgroundSecondary: '#f8f9fa',
    surface: '#ffffff',
    surfaceHover: '#f0f0f0',
    text: '#111111',
    textSecondary: '#333333',
    textMuted: '#666666',
    primary: '#0070f3',
    primaryHover: '#0060df',
    primaryLight: 'rgba(0, 112, 243, 0.05)',
    success: '#10b981',
    error: '#ef4444',
    warning: '#f59e0b',
    info: '#3b82f6',
    border: '#e0e0e0',
    borderLight: '#f0f0f0',
    overlay: 'rgba(255, 255, 255, 0.8)',
  },
  // ... rest of theme
};
```

### 5.3 Zustand Stores

#### 5.3.1 Theme Store (`store/themeStore.ts`)

```typescript
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type ThemeMode = 'dark' | 'light';

interface ThemeState {
  mode: ThemeMode;
  toggleTheme: () => void;
  setTheme: (mode: ThemeMode) => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      mode: 'dark', // Default dark
      toggleTheme: () => set((state) => ({ 
        mode: state.mode === 'dark' ? 'light' : 'dark' 
      })),
      setTheme: (mode) => set({ mode }),
    }),
    {
      name: 'theme-storage',
    }
  )
);
```

#### 5.3.2 Auth Store (`store/authStore.ts`)

```typescript
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User, AuthTokens } from '@/types';

interface AuthState {
  user: User | null;
  tokens: AuthTokens | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  
  setAuth: (user: User, tokens: AuthTokens) => void;
  logout: () => void;
  setLoading: (loading: boolean) => void;
  updateTokens: (tokens: AuthTokens) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      tokens: null,
      isAuthenticated: false,
      isLoading: true,
      
      setAuth: (user, tokens) => set({ 
        user, 
        tokens, 
        isAuthenticated: true,
        isLoading: false 
      }),
      
      logout: () => set({ 
        user: null, 
        tokens: null, 
        isAuthenticated: false 
      }),
      
      setLoading: (isLoading) => set({ isLoading }),
      
      updateTokens: (tokens) => set({ tokens }),
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ 
        tokens: state.tokens,
        user: state.user,
        isAuthenticated: state.isAuthenticated
      }),
    }
  )
);
```

#### 5.3.3 Chat Store (`store/chatStore.ts`)

```typescript
import { create } from 'zustand';
import type { ChatMessage } from '@/types';

interface ChatState {
  sessionId: string | null;
  messages: ChatMessage[];
  isConnected: boolean;
  isAdminOnline: boolean;
  isTyping: boolean;
  soundEnabled: boolean;
  
  setSessionId: (id: string) => void;
  addMessage: (message: ChatMessage) => void;
  setMessages: (messages: ChatMessage[]) => void;
  setConnected: (connected: boolean) => void;
  setAdminOnline: (online: boolean) => void;
  setTyping: (typing: boolean) => void;
  toggleSound: () => void;
  reset: () => void;
}

export const useChatStore = create<ChatState>((set) => ({
  sessionId: null,
  messages: [],
  isConnected: false,
  isAdminOnline: false,
  isTyping: false,
  soundEnabled: false, // Opt-in
  
  setSessionId: (sessionId) => set({ sessionId }),
  addMessage: (message) => set((state) => ({ 
    messages: [...state.messages, message] 
  })),
  setMessages: (messages) => set({ messages }),
  setConnected: (isConnected) => set({ isConnected }),
  setAdminOnline: (isAdminOnline) => set({ isAdminOnline }),
  setTyping: (isTyping) => set({ isTyping }),
  toggleSound: () => set((state) => ({ soundEnabled: !state.soundEnabled })),
  reset: () => set({ 
    sessionId: null, 
    messages: [], 
    isConnected: false,
    isTyping: false 
  }),
}));
```

### 5.4 Socket.io Client (`utils/socket.ts`)

```typescript
import { io, Socket } from 'socket.io-client';
import { useChatStore } from '@/store/chatStore';

const SOCKET_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

class SocketService {
  private socket: Socket | null = null;
  private adminSocket: Socket | null = null;
  
  // Chat do visitante
  connectChat() {
    if (this.socket?.connected) return;
    
    this.socket = io(`${SOCKET_URL}/chat`, {
      transports: ['websocket', 'polling'],
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });
    
    this.socket.on('connect', () => {
      useChatStore.getState().setConnected(true);
    });
    
    this.socket.on('disconnect', () => {
      useChatStore.getState().setConnected(false);
    });
    
    this.socket.on('session_created', (data) => {
      useChatStore.getState().setSessionId(data.session_id);
      useChatStore.getState().addMessage({
        id: 0,
        content: data.welcome_message,
        sender_type: 'admin',
        is_read: true,
        created_at: new Date().toISOString(),
      });
    });
    
    this.socket.on('message', (data) => {
      useChatStore.getState().addMessage(data);
      
      // Play sound if enabled
      if (useChatStore.getState().soundEnabled && data.sender_type === 'admin') {
        this.playNotificationSound();
      }
    });
    
    this.socket.on('admin_status', (data) => {
      useChatStore.getState().setAdminOnline(data.is_online);
    });
    
    this.socket.on('typing', (data) => {
      useChatStore.getState().setTyping(data.is_typing);
    });
    
    return this.socket;
  }
  
  joinChat(visitorName?: string, visitorCompany?: string) {
    this.socket?.emit('join', { 
      visitor_name: visitorName, 
      visitor_company: visitorCompany 
    });
  }
  
  sendMessage(content: string) {
    this.socket?.emit('message', { content });
  }
  
  sendTyping(isTyping: boolean) {
    this.socket?.emit('typing', { is_typing: isTyping });
  }
  
  disconnectChat() {
    this.socket?.emit('leave');
    this.socket?.disconnect();
    this.socket = null;
    useChatStore.getState().reset();
  }
  
  // Admin socket
  connectAdmin(token: string) {
    if (this.adminSocket?.connected) return;
    
    this.adminSocket = io(`${SOCKET_URL}/admin-chat`, {
      auth: { token },
      transports: ['websocket', 'polling'],
    });
    
    // Setup admin event listeners...
    return this.adminSocket;
  }
  
  private playNotificationSound() {
    const audio = new Audio('/sounds/notification.mp3');
    audio.volume = 0.3;
    audio.play().catch(() => {}); // Ignore autoplay errors
  }
}

export const socketService = new SocketService();
```

### 5.5 Custom Hooks

#### 5.5.1 useChat Hook (`hooks/useChat.ts`)

```typescript
import { useEffect, useCallback } from 'react';
import { useChatStore } from '@/store/chatStore';
import { socketService } from '@/utils/socket';

interface UseChatOptions {
  autoConnect?: boolean;
}

export function useChat(options: UseChatOptions = {}) {
  const { autoConnect = false } = options;
  const store = useChatStore();
  
  useEffect(() => {
    if (autoConnect) {
      socketService.connectChat();
    }
    
    return () => {
      // Cleanup on unmount if needed
    };
  }, [autoConnect]);
  
  const connect = useCallback(() => {
    socketService.connectChat();
  }, []);
  
  const join = useCallback((name?: string, company?: string) => {
    socketService.joinChat(name, company);
  }, []);
  
  const sendMessage = useCallback((content: string) => {
    if (content.trim()) {
      socketService.sendMessage(content);
      // Optimistic update
      store.addMessage({
        id: Date.now(),
        content,
        sender_type: 'visitor',
        is_read: false,
        created_at: new Date().toISOString(),
      });
    }
  }, [store]);
  
  const disconnect = useCallback(() => {
    socketService.disconnectChat();
  }, []);
  
  return {
    ...store,
    connect,
    join,
    sendMessage,
    disconnect,
  };
}
```

#### 5.5.2 useSkills Hook (`hooks/useSkills.ts`)

```typescript
import { useQuery } from '@tanstack/react-query';
import { skillsApi } from '@/api/skills';
import type { Skill, SkillCategory } from '@/types';

export function useSkills(category?: SkillCategory) {
  return useQuery({
    queryKey: ['skills', category],
    queryFn: () => skillsApi.getAll(category),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useSkillsByCategory() {
  const { data: skills, ...rest } = useSkills();
  
  const grouped = skills?.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<SkillCategory, Skill[]>);
  
  return { grouped, skills, ...rest };
}
```

### 5.6 Componentes Principais

#### 5.6.1 Chat Interface (`components/sections/ChatInterface/`)

```typescript
// ChatInterface.tsx
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useChat } from '@/hooks/useChat';
import { useTranslation } from 'react-i18next';
import * as S from './ChatInterface.style';

interface ChatInterfaceProps {
  onClose?: () => void;
}

export function ChatInterface({ onClose }: ChatInterfaceProps) {
  const { t } = useTranslation();
  const [inputValue, setInputValue] = useState('');
  const [visitorName, setVisitorName] = useState('');
  const [visitorCompany, setVisitorCompany] = useState('');
  const [step, setStep] = useState<'intro' | 'chat'>('intro');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const {
    messages,
    isConnected,
    isAdminOnline,
    isTyping,
    soundEnabled,
    connect,
    join,
    sendMessage,
    toggleSound,
  } = useChat();
  
  useEffect(() => {
    connect();
  }, [connect]);
  
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  const handleStartChat = () => {
    join(visitorName || 'Visitante', visitorCompany);
    setStep('chat');
  };
  
  const handleSend = () => {
    if (inputValue.trim()) {
      sendMessage(inputValue);
      setInputValue('');
    }
  };
  
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };
  
  return (
    <S.Container>
      <S.Header>
        <S.HeaderInfo>
          <S.Title>{t('livelab.chat.title')}</S.Title>
          <S.Status $online={isAdminOnline}>
            <S.StatusDot $online={isAdminOnline} />
            {isAdminOnline ? t('livelab.chat.online') : t('livelab.chat.offline')}
          </S.Status>
        </S.HeaderInfo>
        <S.HeaderActions>
          <S.SoundToggle onClick={toggleSound} $active={soundEnabled}>
            {soundEnabled ? '🔔' : '🔕'}
          </S.SoundToggle>
          {onClose && <S.CloseButton onClick={onClose}>×</S.CloseButton>}
        </S.HeaderActions>
      </S.Header>
      
      <AnimatePresence mode="wait">
        {step === 'intro' ? (
          <S.IntroForm
            as={motion.div}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <S.IntroTitle>{t('livelab.chat.intro.title')}</S.IntroTitle>
            <S.IntroDescription>{t('livelab.chat.intro.description')}</S.IntroDescription>
            
            <S.InputGroup>
              <S.Label>{t('livelab.chat.intro.name')}</S.Label>
              <S.Input
                value={visitorName}
                onChange={(e) => setVisitorName(e.target.value)}
                placeholder={t('livelab.chat.intro.namePlaceholder')}
              />
            </S.InputGroup>
            
            <S.InputGroup>
              <S.Label>{t('livelab.chat.intro.company')} ({t('common.optional')})</S.Label>
              <S.Input
                value={visitorCompany}
                onChange={(e) => setVisitorCompany(e.target.value)}
                placeholder={t('livelab.chat.intro.companyPlaceholder')}
              />
            </S.InputGroup>
            
            <S.StartButton onClick={handleStartChat}>
              {t('livelab.chat.intro.start')}
            </S.StartButton>
          </S.IntroForm>
        ) : (
          <S.ChatArea
            as={motion.div}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <S.Messages>
              {messages.map((msg, index) => (
                <S.Message
                  key={msg.id || index}
                  $isOwn={msg.sender_type === 'visitor'}
                  as={motion.div}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <S.MessageContent>{msg.content}</S.MessageContent>
                  <S.MessageTime>
                    {new Date(msg.created_at).toLocaleTimeString()}
                  </S.MessageTime>
                </S.Message>
              ))}
              
              {isTyping && (
                <S.TypingIndicator>
                  <S.TypingDot />
                  <S.TypingDot />
                  <S.TypingDot />
                </S.TypingIndicator>
              )}
              
              <div ref={messagesEndRef} />
            </S.Messages>
            
            <S.InputArea>
              <S.MessageInput
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={t('livelab.chat.placeholder')}
                maxLength={1000}
              />
              <S.SendButton onClick={handleSend} disabled={!inputValue.trim()}>
                {t('livelab.chat.send')}
              </S.SendButton>
            </S.InputArea>
          </S.ChatArea>
        )}
      </AnimatePresence>
      
      {!isAdminOnline && step === 'chat' && (
        <S.OfflineNotice>
          {t('livelab.chat.offlineNotice')}
        </S.OfflineNotice>
      )}
    </S.Container>
  );
}
```

### 5.7 Animações (`styles/animations.ts`)

```typescript
import { Variants } from 'framer-motion';

// Page transitions
export const pageVariants: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

export const pageTransition = {
  type: 'tween',
  ease: 'anticipate',
  duration: 0.4,
};

// Stagger children
export const staggerContainer: Variants = {
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

export const staggerItem: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.4, ease: 'easeOut' }
  },
};

// Fade in on scroll
export const fadeInUp: Variants = {
  initial: { opacity: 0, y: 60 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: [0.6, -0.05, 0.01, 0.99] }
  },
};

// Scale on hover
export const scaleOnHover: Variants = {
  initial: { scale: 1 },
  hover: { scale: 1.05 },
  tap: { scale: 0.98 },
};

// Pulse animation (for live indicator)
export const pulse = {
  scale: [1, 1.2, 1],
  opacity: [1, 0.8, 1],
  transition: {
    duration: 2,
    repeat: Infinity,
    ease: 'easeInOut',
  },
};

// Typing indicator dots
export const typingDot: Variants = {
  animate: {
    y: [0, -5, 0],
    transition: {
      duration: 0.6,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

// Hero text reveal
export const heroTextReveal: Variants = {
  initial: { y: '100%' },
  animate: {
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.6, 0.01, -0.05, 0.95],
    },
  },
};

// Parallax scroll
export const parallaxY = (offset: number) => ({
  y: offset,
  transition: { type: 'spring', stiffness: 100 },
});
```

### 5.8 Router Configuration (`Router.tsx`)

```typescript
import { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Layout } from '@/components/layout/Layout';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { PageLoader } from '@/components/common/PageLoader';

// Lazy load pages
const Home = lazy(() => import('@/pages/Home'));
const About = lazy(() => import('@/pages/About'));
const Skills = lazy(() => import('@/pages/Skills'));
const LiveLab = lazy(() => import('@/pages/LiveLab'));
const Contact = lazy(() => import('@/pages/Contact'));

// Admin pages
const AdminLogin = lazy(() => import('@/pages/admin/Login'));
const AdminDashboard = lazy(() => import('@/pages/admin/Dashboard'));
const AdminChat = lazy(() => import('@/pages/admin/Chat'));
const AdminSkills = lazy(() => import('@/pages/admin/Skills'));
const AdminCertificates = lazy(() => import('@/pages/admin/Certificates'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'about', element: <About /> },
      { path: 'skills', element: <Skills /> },
      { path: 'live-lab', element: <LiveLab /> },
      { path: 'contact', element: <Contact /> },
    ],
  },
  {
    path: '/admin',
    children: [
      { path: 'login', element: <AdminLogin /> },
      {
        element: (
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        ),
        children: [
          { index: true, element: <AdminDashboard /> },
          { path: 'chat', element: <AdminChat /> },
          { path: 'skills', element: <AdminSkills /> },
          { path: 'certificates', element: <AdminCertificates /> },
        ],
      },
    ],
  },
]);

export function Router() {
  return (
    <Suspense fallback={<PageLoader />}>
      <RouterProvider router={router} />
    </Suspense>
  );
}
```

---

## 6. Checklist de Implementação

### Fase 1: Fundação (Backend)
- [ ] Configurar Neon PostgreSQL e atualizar `DATABASE_URL`
- [ ] Criar migrations com Alembic
- [ ] Implementar modelo `User` e autenticação JWT
- [ ] Configurar `slowapi` para rate limiting
- [ ] Criar endpoint `/api/v1/auth/login`
- [ ] Criar endpoint `/api/v1/auth/me`
- [ ] Testar autenticação com Postman/Insomnia

### Fase 2: Fundação (Frontend)
- [ ] Instalar novas dependências (`react-router-dom`, `zustand`, `socket.io-client`, `react-hook-form`, `zod`)
- [ ] Criar estrutura de pastas atualizada
- [ ] Implementar sistema de temas (dark/light) com Zustand
- [ ] Criar `ThemeProvider` com styled-components
- [ ] Implementar `Router.tsx` com lazy loading
- [ ] Criar `Layout` com Header e Footer
- [ ] Implementar navegação responsiva (mobile menu)
- [ ] Testar transição de temas

### Fase 3: Skills & Certificados (Backend)
- [ ] Criar modelos `Skill` e `Certificate`
- [ ] Criar schemas Pydantic
- [ ] Implementar CRUD services
- [ ] Criar endpoints públicos (`GET /skills`, `GET /certificates`)
- [ ] Criar endpoints admin com autenticação
- [ ] Configurar Cloudinary para upload de imagens
- [ ] Testar upload de certificados

### Fase 4: Skills & Certificados (Frontend)
- [ ] Criar página Skills com grid animado
- [ ] Implementar filtro por categoria
- [ ] Criar componente `SkillCard` com animações
- [ ] Criar página de certificados
- [ ] Implementar filtro por plataforma
- [ ] Criar componente `CertificateCard`
- [ ] Implementar animações de entrada (stagger)

### Fase 5: Páginas Estáticas
- [ ] Refatorar Home com novas seções
- [ ] Implementar Hero com animações avançadas
- [ ] Criar seção Skills Preview
- [ ] Criar seção Live Lab Preview
- [ ] Criar página About
- [ ] Criar página Contact com formulário
- [ ] Implementar validação com Zod
- [ ] Testar responsividade em todos breakpoints

### Fase 6: Chat em Tempo Real (Backend)
- [ ] Instalar `python-socketio`
- [ ] Criar modelos `ChatSession` e `ChatMessage`
- [ ] Implementar `ConnectionManager`
- [ ] Criar namespace `/chat` para visitantes
- [ ] Criar namespace `/admin-chat` para admin
- [ ] Implementar eventos de mensagem
- [ ] Configurar Telegram Bot para notificações
- [ ] Testar WebSocket com cliente de teste

### Fase 7: Chat em Tempo Real (Frontend)
- [ ] Instalar `socket.io-client`
- [ ] Criar `socketService` singleton
- [ ] Implementar `useChatStore` com Zustand
- [ ] Criar hook `useChat`
- [ ] Criar componente `ChatInterface`
- [ ] Implementar indicador de digitação
- [ ] Implementar som de notificação (opt-in)
- [ ] Criar página Live Lab completa

### Fase 8: Painel Admin
- [ ] Criar página de login admin
- [ ] Implementar `ProtectedRoute`
- [ ] Criar `AdminLayout`
- [ ] Criar Dashboard com estatísticas
- [ ] Criar painel de chat com múltiplas conversas
- [ ] Criar CRUD de Skills no admin
- [ ] Criar CRUD de Certificados no admin
- [ ] Criar visualização de contatos

### Fase 9: Email & Notificações
- [ ] Configurar Resend
- [ ] Implementar `EmailService`
- [ ] Criar template de email para contato
- [ ] Criar template de notificação de chat
- [ ] Configurar Telegram Bot
- [ ] Implementar `TelegramService`
- [ ] Testar fluxo completo de notificações

### Fase 10: Polish & Performance
- [ ] Implementar `prefers-reduced-motion`
- [ ] Adicionar Skeleton loaders
- [ ] Otimizar bundle size (analyze)
- [ ] Implementar lazy loading de imagens
- [ ] Adicionar meta tags SEO
- [ ] Criar sitemap.xml
- [ ] Configurar robots.txt
- [ ] Testar Lighthouse (alvo: >90)

### Fase 11: Internacionalização
- [ ] Expandir arquivos de tradução (pt-BR, en-US)
- [ ] Traduzir todas as novas páginas
- [ ] Traduzir mensagens de erro
- [ ] Traduzir emails
- [ ] Testar alternância de idioma

### Fase 12: Deploy
- [ ] Configurar Vercel para frontend
- [ ] Configurar Render para backend
- [ ] Configurar variáveis de ambiente
- [ ] Configurar domínio personalizado
- [ ] Configurar SSL/HTTPS
- [ ] Testar WebSocket em produção
- [ ] Configurar monitoramento (Sentry opcional)

---

## 7. Pontos de Atenção e Débitos Técnicos

### 7.1 Pontos de Atenção

| Item | Descrição | Mitigação |
|------|-----------|-----------|
| **WebSocket em Render** | Free tier pode ter cold starts | Implementar reconexão automática robusta |
| **Rate Limiting** | Sem Redis, usar in-memory | Funciona para escala atual, migrar para Redis se necessário |
| **Imagens Certificados** | Dependência do Cloudinary | Fazer backup local das URLs |
| **Telegram Bot** | Requer criação manual | Documentar processo de setup |
| **JWT Refresh** | Tokens em localStorage | Considerar httpOnly cookies em v2 |

### 7.2 Débitos Técnicos (@todo)

```typescript
// @todo [SECURITY] Migrar tokens para httpOnly cookies
// Prioridade: Média | Esforço: Médio
// Atualmente usando localStorage, vulnerável a XSS

// @todo [PERFORMANCE] Implementar Redis para cache e rate limiting
// Prioridade: Baixa | Esforço: Médio
// Upstash oferece tier gratuito, migrar quando necessário

// @todo [FEATURE] Implementar PWA com Web Push
// Prioridade: Baixa | Esforço: Alto
// Alternativa ao Telegram para notificações nativas

// @todo [FEATURE] Adicionar analytics (Plausible/Umami)
// Prioridade: Baixa | Esforço: Baixo
// Métricas de visitantes sem Google Analytics

// @todo [TESTING] Adicionar testes E2E com Playwright
// Prioridade: Média | Esforço: Alto
// Cobrir fluxos críticos: chat, contato, admin

// @todo [UX] Implementar modo offline para chat
// Prioridade: Baixa | Esforço: Médio
// Salvar mensagens localmente quando offline

// @todo [INFRA] Configurar CI/CD com GitHub Actions
// Prioridade: Média | Esforço: Baixo
// Automatizar deploy e testes
```

---

## 8. Variáveis de Ambiente

### 8.1 Backend (`.env`)

```env
# Database
DATABASE_URL=postgresql://user:pass@host/dbname

# Environment
ENVIRONMENT=production

# JWT
JWT_SECRET_KEY=your-super-secret-key-min-32-chars
JWT_ALGORITHM=HS256
JWT_ACCESS_TOKEN_EXPIRE_MINUTES=30
JWT_REFRESH_TOKEN_EXPIRE_DAYS=7

# CORS
CORS_ORIGINS=https://viniciusdatti.dev,https://www.viniciusdatti.dev

# Resend
RESEND_API_KEY=re_xxxxxxxxxxxx
RESEND_FROM_EMAIL=contato@viniciusdatti.dev
NOTIFICATION_EMAIL=viniciusdatti@gmail.com

# Telegram
TELEGRAM_BOT_TOKEN=123456789:ABCdefGHIjklMNOpqrsTUVwxyz
TELEGRAM_CHAT_ID=123456789

# Cloudinary
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=123456789012345
CLOUDINARY_API_SECRET=abcdefghijklmnopqrstuvwxyz

# Rate Limiting
RATE_LIMIT_PER_MINUTE=60
CONTACT_RATE_LIMIT_PER_HOUR=3
CHAT_RATE_LIMIT_PER_MINUTE=10
```

### 8.2 Frontend (`.env`)

```env
VITE_API_URL=https://api.viniciusdatti.dev
VITE_SOCKET_URL=https://api.viniciusdatti.dev
```

---

## 9. Referências

- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [Socket.io Documentation](https://socket.io/docs/v4/)
- [python-socketio](https://python-socketio.readthedocs.io/)
- [Zustand](https://github.com/pmndrs/zustand)
- [Framer Motion](https://www.framer.com/motion/)
- [Resend](https://resend.com/docs)
- [Telegram Bot API](https://core.telegram.org/bots/api)
- [Cloudinary](https://cloudinary.com/documentation)
- [Neon PostgreSQL](https://neon.tech/docs)
- [Vercel](https://vercel.com/docs)
- [Render](https://render.com/docs)

---

*Documento gerado em: 14/02/2026*
*Versão: 1.0*
*Status: Aprovado para implementação*
