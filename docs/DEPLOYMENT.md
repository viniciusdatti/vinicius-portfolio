# Guia de Deploy — Portfólio Vinicius

Este documento descreve como subir o projeto para produção e deixá-lo funcional e hospedado, conforme a especificação técnica (frontend na **Vercel**, backend na **Render**, banco **Neon PostgreSQL**).

---

## Visão geral

| Camada        | Serviço  | Motivo                                      |
|---------------|----------|---------------------------------------------|
| **Frontend**  | Vercel   | Plano gratuito, CI/CD, CDN global           |
| **Backend**   | Render   | 750h/mês grátis, WebSocket, deploy automático |
| **Banco**     | Neon     | PostgreSQL serverless, tier gratuito       |

Fluxo: o usuário acessa o site na Vercel → o React chama a API na Render → o backend usa o PostgreSQL no Neon.

---

## 1. Banco de dados (Neon PostgreSQL)

1. Acesse [Neon](https://neon.tech) e crie uma conta (ou faça login).
2. Crie um novo projeto (ex.: `portfolio`).
3. Na dashboard, copie a **connection string** (formato `postgresql://user:password@host/dbname?sslmode=require`).
4. Guarde essa URL; você vai usá-la no backend como `DATABASE_URL`.

**Dica:** Use a connection string do branch **main** (ou o branch que você usar em produção). O Neon oferece um tier gratuito com 0,5 GB.

---

## 2. Backend na Render

### 2.1 Criar o Web Service

1. Acesse [Render](https://render.com) e faça login (pode usar GitHub).
2. **New** → **Web Service**.
3. Conecte o repositório do projeto (ex.: `vinicius-portfolio`).
4. Configure:
   - **Name:** `portfolio-api` (ou outro nome).
   - **Region:** escolha a mais próxima do seu público (ex.: Oregon).
   - **Root Directory:** `backend`.
   - **Runtime:** `Python 3`.
   - **Build Command:**
     ```bash
     pip install -r requirements.txt
     ```
   - **Start Command:**
     ```bash
     uvicorn app.main:socket_app --host 0.0.0.0 --port $PORT
     ```
     (O Render define `PORT` automaticamente. Usar `socket_app` garante que a API REST e o Socket.IO funcionem.)

### 2.2 Variáveis de ambiente (Backend)

Em **Environment** do serviço, adicione:

| Variável | Descrição | Exemplo |
|----------|-----------|--------|
| `ENVIRONMENT` | Ambiente | `production` |
| `DATABASE_URL` | Connection string do Neon | `postgresql://user:pass@host/db?sslmode=require` |
| `CORS_ORIGINS` | Origens permitidas (frontend) | `https://seu-app.vercel.app,https://www.seudominio.com` |
| `RESEND_API_KEY` | (Opcional) API key do Resend | para e-mails do formulário de contato |
| `EMAIL_FROM` | E-mail remetente (Resend) | `noreply@seudominio.com` |
| `EMAIL_TO_ADMIN` | E-mail para notificações | `seu@email.com` |
| `TELEGRAM_BOT_TOKEN` | (Opcional) Bot Telegram | para notificações |
| `TELEGRAM_CHAT_ID` | (Opcional) Chat ID | para notificações |
| `CLOUDINARY_*` | (Opcional) Cloudinary | se usar upload de imagens |

**Importante:**

- `CORS_ORIGINS` deve incluir a URL exata do frontend na Vercel (ex.: `https://vinicius-portfolio.vercel.app`). Pode listar várias origens separadas por vírgula, sem espaços.

### 2.3 Criar tabelas no banco (primeiro deploy)

O backend só cria tabelas automaticamente em `ENVIRONMENT=development`. Em produção, é preciso criar as tabelas uma vez. Duas opções:

**Opção A — Comando de release (recomendado no Render)**  
Em **Settings** do Web Service, em **Build & Deploy**, adicione um **Pre-Deploy Command** (ou use **Shell** em um deploy manual):

```bash
python -c "from app.db.base import Base; from app.db.session import engine; Base.metadata.create_all(bind=engine)"
```

**Opção B — Manual (uma vez)**  
Em um terminal local, com `DATABASE_URL` apontando para o Neon:

```bash
cd backend
# Ative o venv e defina DATABASE_URL
python -c "from app.db.base import Base; from app.db.session import engine; Base.metadata.create_all(bind=engine)"
```

Depois do primeiro deploy, anote a URL do backend (ex.: `https://portfolio-api.onrender.com`). Ela será usada no frontend.

---

## 3. Frontend na Vercel

### 3.1 Conectar o repositório

1. Acesse [Vercel](https://vercel.com) e faça login (GitHub recomendado).
2. **Add New** → **Project** e importe o repositório do portfólio.
3. Configure:
   - **Root Directory:** `interfaces/web` (obrigatório).
   - **Production Branch:** `master`.
   - **Framework Preset:** Vite (ou deixe a Vercel ler `interfaces/web/vercel.json`).
   - **Build Command:** `yarn build` (Vite + `prebuild` do favicon).
   - **Output Directory:** `dist` (não use `build` — isso era do CRA antigo).
   - **Node.js Version:** `22.x` (alinhado a `engines` no `package.json`).

O arquivo `interfaces/web/vercel.json` no repositório fixa `dist`, Node 22, rewrites de SPA (React Router) e cache de assets. Você pode confirmar em **Settings** → **General** que a Vercel não sobrescreveu com valores antigos do CRA.

### 3.2 Variáveis de ambiente (Frontend)

Em **Settings** → **Environment Variables** do projeto, adicione (escopo **Production** e, se quiser preview, **Preview** também):

| Variável | Valor | Observação |
|----------|--------|------------|
| `VITE_API_URL` | `https://vinicius-portfolio.onrender.com/api/v1` | URL real do backend (com `/api/v1` no final). |
| `VITE_APP_ENV` | `production` | Opcional. |

**Importante:**

- Variáveis `VITE_*` são embutidas no build — após alterar, faça **Redeploy**.
- A URL da API deve ser **HTTPS** e terminar em `/api/v1`.
- O Socket.IO usa o host da API (sem `/api/v1`). No Render, `CORS_ORIGINS` deve incluir **exatamente** a origem do site na Vercel (ex.: `https://vinicius-portfolio-weld.vercel.app`), sem barra no final.

**Docker (compose prod):** use `VITE_API_URL=/api/v1` no build do frontend; o nginx em `interfaces/web/docker/nginx.conf` faz proxy de `/api` e `/socket.io` para o serviço `backend`.

### 3.3 Deploy

Após salvar as variáveis, faça um novo deploy (ou deixe o deploy automático rodar após push em `master`). O site ficará em algo como `https://vinicius-portfolio-weld.vercel.app`.

Depois de obter a URL final do frontend, volte ao **Render** e atualize `CORS_ORIGINS` para incluir essa URL.

### 3.4 Migração CRA → Vite (se o projeto na Vercel era antigo)

Se o último deploy usava `react-scripts` e pasta `build`:

1. Merge do código com Vite em `master`.
2. Confirme **Output Directory** = `dist` e **Node** = 22.
3. Remova variáveis `REACT_APP_*` e use só `VITE_*`.
4. **Redeploy** em Production.

---

## 4. Ordem recomendada

1. **Neon:** criar projeto e copiar `DATABASE_URL`.
2. **Render:** criar Web Service com `backend` como root, configurar build/start e **todas** as env (incluindo `DATABASE_URL`, `CORS_ORIGINS` com um placeholder temporário, `ENVIRONMENT=production`).
3. **Render:** rodar o comando de criação de tabelas (Pre-Deploy ou manual) e fazer o primeiro deploy.
4. **Vercel:** criar projeto com root `interfaces/web`, definir `VITE_API_URL` com a URL do Render e fazer o deploy.
5. **Render:** atualizar `CORS_ORIGINS` com a URL real do frontend na Vercel (e de qualquer domínio customizado, se houver).

---

## 5. Verificação rápida

- **Backend:** abra `https://SUA-URL-RENDER/health`. Deve retornar algo como `{"status":"healthy","version":"2.0.0"}`.
- **Frontend:** abra o site na Vercel; a home deve carregar e as chamadas à API (projetos, etc.) devem funcionar.
- **Formulário de contato:** só envia e-mail se `RESEND_API_KEY`, `EMAIL_FROM` e `EMAIL_TO_ADMIN` estiverem configurados no Render.
- **Chat / WebSocket:** o Socket.IO está no mesmo `socket_app`; o cliente deriva o host de `VITE_API_URL` (sem `/api/v1`). Confira `CORS_ORIGINS` no Render.

---

## 6. Domínio próprio (opcional)

- **Vercel:** em **Settings** → **Domains**, adicione seu domínio e siga as instruções de DNS.
- **Render:** em **Settings** → **Custom Domains**, adicione o subdomínio da API (ex.: `api.seudominio.com`) e configure o CNAME conforme indicado.
- Atualize `CORS_ORIGINS` no Render para incluir `https://seudominio.com` e `https://www.seudominio.com`.
- No frontend (Vercel), defina `VITE_API_URL` para a URL do backend (ex.: `https://api.seudominio.com/api/v1`).

---

## 7. Referências

- [Neon — Docs](https://neon.tech/docs)
- [Render — Web Services](https://render.com/docs/web-services)
- [Vercel — Docs](https://vercel.com/docs)
- Especificação técnica do projeto: `docs/portfolio-v2/technical_specifications/technical_specification_pt-br.md`
