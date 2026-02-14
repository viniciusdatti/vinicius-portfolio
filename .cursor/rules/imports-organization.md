# Regra de Organização de Imports

## Descrição
Todos os arquivos do projeto devem seguir uma organização padronizada de imports, separados por comentários que indicam a categoria.

## Estrutura para Frontend (React/TypeScript)

```typescript
// Core
import React from 'react';

// Libraries
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import styled from 'styled-components';

// Components
import { Header } from './components/Header';
import { Button } from '../Button';

// Hooks
import { useProjects, useChat } from '../../hooks';

// Store
import { useThemeStore, useAuthStore } from '../../store';

// Utils
import { socketService } from '../../utils/socket';

// Styles
import { fadeInUp, staggerContainer } from '../../styles/animations';

// Types
import type { Project, Skill } from '../../types';
```

## Estrutura para Backend (Python/FastAPI)

```python
# Core
from typing import List, Optional
from datetime import datetime

# Libraries
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

# App - Database
from app.db.session import get_db

# App - Models
from app.models.user import User
from app.models.skill import Skill

# App - Schemas
from app.schemas.user import UserCreate, UserResponse

# App - Services
from app.services import email_service, telegram_service

# App - Core
from app.core.config import get_settings
from app.core.security import verify_password
```

## Ordem de Categorias

### Frontend
1. **Core** - React, ReactDOM
2. **Libraries** - Bibliotecas externas (react-router-dom, framer-motion, styled-components, i18next, etc.)
3. **Components** - Componentes do projeto
4. **Hooks** - Custom hooks
5. **Store** - Zustand stores
6. **Utils** - Utilitários
7. **Styles** - Estilos e animações
8. **Types** - Tipos TypeScript (usar `import type` quando possível)

### Backend
1. **Core** - Módulos built-in do Python (typing, datetime, enum, etc.)
2. **Libraries** - Bibliotecas externas (fastapi, sqlalchemy, pydantic, etc.)
3. **App - Database** - Conexão e sessão do banco
4. **App - Models** - Modelos SQLAlchemy
5. **App - Schemas** - Schemas Pydantic
6. **App - Services** - Serviços (email, telegram, etc.)
7. **App - Core** - Configurações, segurança, rate limiting
8. **App - API** - Endpoints e dependências

## Regras Adicionais

1. Imports do mesmo módulo devem ser agrupados em uma única linha quando possível
2. Usar `import type` para imports apenas de tipos no TypeScript
3. Manter uma linha em branco entre cada categoria
4. Ordenar imports alfabeticamente dentro de cada categoria
5. Não misturar imports de categorias diferentes na mesma linha
