# Deploy do portfólio — Guia para iniciantes

Você não precisa entender de servidores. Siga este guia **na ordem** e, no final, seu portfólio estará no ar.

---

## O que vamos fazer (em poucas palavras)

Seu projeto tem **3 partes**:

1. **Banco de dados** — Onde ficam salvos os projetos, contatos, etc.  
   → Vamos usar o **Neon** (grátis).

2. **Backend (API)** — O “servidor” que o site chama para buscar dados e enviar formulário.  
   → Vamos usar o **Render** (grátis).

3. **Frontend (site)** — A página que as pessoas abrem no navegador.  
   → Vamos usar a **Vercel** (grátis).

**Ordem:** primeiro o banco, depois o backend, por último o site. Assim um não quebra o outro.

---

## Antes de começar

- Ter o projeto no **GitHub** (se ainda não tiver, crie um repositório e suba o código).
- Ter uma conta no **GitHub** (para logar no Neon, Render e Vercel).
- Ter **cerca de 30–40 minutos** para fazer tudo com calma.

---

# PARTE 1 — Banco de dados (Neon)

**O que é:** Um serviço que hospeda um banco PostgreSQL na nuvem. Seu backend vai se conectar a ele.

### Passo 1.1 — Entrar no Neon

1. Abra no navegador: **https://neon.tech**
2. Clique em **Sign Up** (ou **Login** se já tiver conta).
3. Escolha **Sign up with GitHub** e autorize o Neon a acessar sua conta.

### Passo 1.2 — Criar um projeto

1. Depois de logar, você deve ver um botão tipo **New Project** ou **Create a project**.
2. Clique nele.
3. **Project name:** pode deixar `portfolio` ou escrever o que quiser.
4. **Region:** escolha uma região (ex.: **South America** ou **US East**).
5. Clique em **Create Project**.

### Passo 1.3 — Copiar a connection string

1. Quando o projeto for criado, a tela mostra algo como **Connection string** ou **Database URL**.
2. Há um campo com um texto longo começando com `postgresql://...`.
3. Clique no ícone de **copiar** ao lado desse texto.
4. **Guarde em um bloco de notas:** você vai colar isso no Render na Parte 2.  
   - Exemplo (o seu será diferente):  
     `postgresql://usuario:senha@ep-xxx.region.aws.neon.tech/neondb?sslmode=require`

**Se não achar a connection string:** no menu do projeto, procure por **Dashboard** ou **Connection details** e copie a **connection string** do branch **main**.

---

# PARTE 2 — Backend na Render (API)

**O que é:** A Render vai “ligar” seu código do backend (a pasta `backend` do projeto) e deixar ele acessível na internet com uma URL. Essa URL é a sua API.

### Passo 2.1 — Entrar na Render

1. Abra: **https://render.com**
2. Clique em **Get Started** (ou **Login**).
3. Escolha **Sign in with GitHub** e autorize.

### Passo 2.2 — Criar um novo Web Service

1. No painel da Render, clique no botão **New +** (ou **Create**).
2. Escolha **Web Service** (serviço web).
3. Se pedir para conectar o GitHub, conecte e **autorize a Render a ver seus repositórios**.
4. Na lista de repositórios, procure **vinicius-portfolio** (ou o nome do seu repo) e clique em **Connect** ao lado dele.

### Passo 2.3 — Preencher os campos do serviço

A tela vai pedir várias informações. Preencha **exatamente** assim:

| Campo | O que escrever |
|-------|----------------|
| **Name** | `portfolio-api` (ou outro nome que você quiser; sem espaços) |
| **Region** | Escolha a mais próxima (ex.: **Oregon** ou **Frankfurt**) |
| **Branch** | `main` (ou `master`, se for o nome da sua branch principal) |
| **Root Directory** | **Importante:** escreva só: `backend` |
| **Runtime** | **Python 3** |
| **Build Command** | `pip install -r requirements.txt` |
| **Start Command** | `uvicorn app.main:socket_app --host 0.0.0.0 --port $PORT` |

**Sobre o Root Directory:** isso diz à Render que o código do servidor está na pasta `backend` do seu repositório. Se deixar em branco, ela não acha o `requirements.txt` e o deploy falha.

### Passo 2.4 — Adicionar variáveis de ambiente

Na mesma tela, role até a seção **Environment Variables** (Variáveis de ambiente). Clique em **Add Environment Variable** e adicione **uma a uma** as variáveis abaixo.

**Obrigatórias:**

| Key (nome) | Value (valor) |
|------------|----------------|
| `ENVIRONMENT` | `production` |
| `DATABASE_URL` | Cole aqui a **connection string** que você copiou do Neon (Passo 1.3). |
| `CORS_ORIGINS` | Por enquanto escreva: `https://vinicius-portfolio.vercel.app` (depois que o site estiver na Vercel, você pode ajustar para a URL real que a Vercel te der). |
| `JWT_SECRET_KEY` | Uma senha forte e longa. Exemplo: `minhaChaveSecretaSuperSegura2024!@#NuncaCompartilhe`. Em produção use algo aleatório e longo (pode gerar em https://randomkeygen.com/ na seção “CodeIgniter Encryption Keys”). |

**Opcionais (pode pular por enquanto):**

- Se quiser que o formulário de contato envie e-mail para você: mais tarde você pode adicionar `RESEND_API_KEY`, `EMAIL_FROM` e `EMAIL_TO_ADMIN`. Por agora pode deixar sem; o formulário ainda salva no banco.

Depois de preencher tudo, clique em **Create Web Service** (ou **Deploy**).

### Passo 2.5 — Esperar o primeiro deploy

1. A Render vai começar a “buildar” e depois “subir” seu backend. Isso leva alguns minutos.
2. Na tela você verá um **log** (texto rolando). Espere até aparecer algo como **Your service is live** ou um link do tipo `https://portfolio-api.onrender.com`.
3. Se der **erro:** veja a seção **Problemas comuns** no final deste guia.
4. **Anote a URL do serviço** (ex.: `https://portfolio-api.onrender.com`). Você vai usar no frontend **com** `/api/v1` no final, assim: `https://portfolio-api.onrender.com/api/v1`.

### Passo 2.6 — Criar as tabelas no banco (só uma vez)

O backend em produção não cria as tabelas sozinho. Precisamos rodar um comando **uma vez**:

1. No painel do Render, clique no seu serviço **portfolio-api**.
2. Vá em **Settings** (Configurações).
3. Role até **Build & Deploy**.
4. Procure **Pre-Deploy Command** (ou **Build Command** — depende da interface). Se houver **Pre-Deploy Command**, coloque este texto exatamente:
   ```bash
   python -c "from app.db.base import Base; from app.db.session import engine; Base.metadata.create_all(bind=engine)"
   ```
5. Salve e faça um **Manual Deploy** (botão **Manual Deploy** ou **Deploy latest commit**). Espere terminar.

**Se não achar Pre-Deploy Command:** não tem problema. Depois que o backend estiver no ar, me avise e podemos criar as tabelas de outro jeito (por exemplo, rodando um script local apontando para o banco do Neon).

### Passo 2.7 — Testar se o backend está no ar

1. Abra no navegador: `https://SUA-URL-DO-RENDER/health`  
   (troque `SUA-URL-DO-RENDER` pela URL que a Render te deu, **sem** `/api/v1`).
2. Você deve ver algo assim: `{"status":"healthy","version":"2.0.0"}`.  
   Se ver isso, o backend está funcionando.

---

# PARTE 3 — Frontend na Vercel (site)

**O que é:** A Vercel vai publicar a parte “visual” do seu projeto (a pasta `interfaces/web`) e te dar um link para acessar o site.

### Passo 3.1 — Entrar na Vercel

1. Abra: **https://vercel.com**
2. Clique em **Sign Up** ou **Log in**.
3. Escolha **Continue with GitHub** e autorize.

### Passo 3.2 — Importar o projeto

1. No painel, clique em **Add New…** → **Project** (ou **Import Project**).
2. Na lista de repositórios, ache **vinicius-portfolio** e clique em **Import** (ou **Connect**).

### Passo 3.3 — Configurar o projeto

Antes de dar **Deploy**, ajuste estes campos:

| Campo | O que fazer |
|-------|-------------|
| **Framework Preset** | Pode deixar **Create React App** (a Vercel detecta sozinho). |
| **Root Directory** | Clique em **Edit** ao lado e digite: `interfaces/web`. **Muito importante:** se não colocar isso, a Vercel não acha o `package.json` do frontend. |
| **Build Command** | Pode deixar `yarn build` ou `npm run build` (se usar yarn, melhor `yarn build`). |
| **Output Directory** | Deixe `build` (padrão do Create React App). |

### Passo 3.4 — Variável de ambiente (URL da API)

1. Expanda a seção **Environment Variables**.
2. Em **Key**, escreva: `REACT_APP_API_URL`
3. Em **Value**, escreva a URL do backend **terminando em** `/api/v1`.  
   Exemplo: `https://portfolio-api.onrender.com/api/v1`  
   (use a **sua** URL do Render, não esqueça o `https://` e o `/api/v1` no final.)
4. Clique em **Add** (ou **Save**).

Depois clique em **Deploy** (ou **Deploy Project**).

### Passo 3.5 — Esperar o deploy

1. A Vercel vai buildar e publicar. Leva alguns minutos.
2. Quando terminar, ela mostra um link tipo `https://vinicius-portfolio.vercel.app` (o nome pode variar).
3. **Anote esse link** — é a URL do seu site.

### Passo 3.6 — Ajustar o CORS no Render (importante)

Para o site (Vercel) conseguir falar com a API (Render), o backend precisa “liberar” a URL do site. Isso é o CORS.

1. Volte ao **Render** → seu serviço **portfolio-api** → **Environment** (ou **Environment Variables**).
2. Ache a variável **CORS_ORIGINS**.
3. Troque o valor para a **URL exata** do seu site na Vercel (sem barra no final).  
   Exemplo: `https://vinicius-portfolio.vercel.app`
4. Salve. O Render pode fazer um novo deploy sozinho; espere terminar.

### Passo 3.7 — Testar o site

1. Abra no navegador a URL que a Vercel te deu.
2. O site deve abrir. Navegue um pouco (projetos, contato, etc.).
3. Se a página de projetos não carregar ou der erro de rede, confira:
   - `REACT_APP_API_URL` na Vercel está com a URL do Render + `/api/v1`?
   - `CORS_ORIGINS` no Render está com a URL do site na Vercel (igual à que você abre no navegador)?

---

# Checklist final

Marque conforme for fazendo:

- [ ] Conta no Neon e projeto criado
- [ ] Connection string do Neon copiada
- [ ] Web Service na Render criado (root: `backend`)
- [ ] Variáveis no Render: `ENVIRONMENT`, `DATABASE_URL`, `CORS_ORIGINS`, `JWT_SECRET_KEY`
- [ ] Deploy do backend concluído e URL anotada
- [ ] Teste `/health` no navegador — retornou `healthy`?
- [ ] Pre-Deploy (criar tabelas) rodado ou combinado depois
- [ ] Projeto na Vercel importado (root: `interfaces/web`)
- [ ] `REACT_APP_API_URL` na Vercel = URL do Render + `/api/v1`
- [ ] Deploy do frontend concluído
- [ ] `CORS_ORIGINS` no Render atualizado com a URL do site na Vercel
- [ ] Site aberto no navegador e funcionando

---

# Problemas comuns

**“Build failed” na Render**

- Confira se **Root Directory** está exatamente: `backend`.
- Confira se no seu repositório existe o arquivo `backend/requirements.txt`.

**“Application failed to respond” ou erro 503 na Render**

- Espere 2–3 minutos; no plano grátis o servidor “acorda” depois de um tempo.
- Confira se o **Start Command** está exatamente:  
  `uvicorn app.main:socket_app --host 0.0.0.0 --port $PORT`

**Site na Vercel abre, mas projetos / contato não funcionam**

- O frontend não está conseguindo falar com o backend. Confira:
  - **Vercel:** variável `REACT_APP_API_URL` = `https://sua-url-render.com/api/v1` (com `https` e `/api/v1`).
  - **Render:** variável `CORS_ORIGINS` = URL do site na Vercel (ex.: `https://vinicius-portfolio.vercel.app`), sem barra no final.

**Não acho a connection string no Neon**

- Dentro do projeto no Neon, abra o menu ou **Dashboard** e procure por **Connection string**, **Database URL** ou **Connection details**. Use a do branch **main**.

---

# Resumo rápido (quando você já tiver feito uma vez)

1. **Neon:** criar projeto → copiar connection string.
2. **Render:** New Web Service → repo → Root `backend` → Build: `pip install -r requirements.txt` → Start: `uvicorn app.main:socket_app --host 0.0.0.0 --port $PORT` → variáveis `ENVIRONMENT`, `DATABASE_URL`, `CORS_ORIGINS`, `JWT_SECRET_KEY` → Deploy → anotar URL.
3. **Vercel:** Import Project → Root `interfaces/web` → `REACT_APP_API_URL` = URL Render + `/api/v1` → Deploy → anotar URL do site.
4. **Render:** atualizar `CORS_ORIGINS` com a URL do site na Vercel.

Se em algum passo você travar (por exemplo: “não acho esse botão” ou “deu esse erro”), anote exatamente em qual parte (Neon, Render ou Vercel) e qual mensagem aparece, e peça ajuda dizendo isso — fica mais fácil te orientar no ponto exato.
