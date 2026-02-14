# Portfólio Vinicius Datti - V2

## Descrição Geral

Transformar o portfólio atual (single-page simples) em uma **aplicação full-stack completa e impressionante** que demonstre as habilidades técnicas de Vinicius Datti como desenvolvedor web. O projeto deve servir como vitrine profissional para recrutadores, destacando competências em React, TypeScript, Python, WebSockets e UX/UI de alta qualidade.

O diferencial será um **sistema de chat em tempo real** onde recrutadores podem entrar em contato diretamente, demonstrando domínio de comunicação real-time via WebSocket.

---

## Informações do Profissional

- **Nome:** Vinicius Datti
- **Título:** Desenvolvedor Web | React · TypeScript · Python
- **Experiência:** 3 anos
- **Localização:** São Paulo
- **Formação:** Engenharia de Software - UniCesumar (cursando)
- **LinkedIn:** https://www.linkedin.com/in/vinicius-datti-791482267/
- **GitHub:** https://github.com/viniciusdatti
- **Email de contato:** viniciusdatti@gmail.com

---

## Requisitos Funcionais

### RF01 - Estrutura de Navegação

O site deve possuir navegação clara e fluida entre as seguintes seções/páginas:

1. **Home** - Landing page principal
2. **Sobre** - Informações detalhadas sobre o profissional
3. **Skills & Certificados** - Competências técnicas e certificações
4. **Live Lab** - Demonstrações interativas (Chat em tempo real)
5. **Contato** - Formulário e informações de contato

A navegação deve:
- Ser responsiva (menu hamburger em mobile)
- Ter indicador visual da seção atual
- Suportar navegação por scroll suave (smooth scroll)
- Manter header fixo com blur/transparência elegante

---

### RF02 - Home (Landing Page)

#### RF02.1 - Hero Section
- Exibir nome "Vinicius Datti" com animação de entrada impactante
- Subtítulo com título profissional animado (typewriter ou similar)
- Breve tagline sobre especialização
- CTAs principais: "Conhecer mais" e "Entrar em contato"
- Elemento visual abstrato/geométrico animado como background (não foto)
- Indicador de scroll para baixo

#### RF02.2 - Seção Preview de Skills
- Grid visual das principais tecnologias (ícones animados)
- Categorias: Frontend, Backend, Ferramentas
- Ao hover, mostrar nível de proficiência
- Link para página completa de Skills

#### RF02.3 - Seção Live Lab Preview
- Card destacado apresentando o Chat em Tempo Real
- Indicador visual de "ao vivo" (pulse animation)
- Breve explicação do que é e por que foi construído
- CTA para acessar o Live Lab

#### RF02.4 - Seção CTA de Contato
- Chamada para ação convidando recrutadores
- Destaque para o chat em tempo real como diferencial
- Botão para ir ao contato

---

### RF03 - Página Sobre

#### RF03.1 - Introdução
- Texto de apresentação pessoal (sem foto)
- Destaque para diferenciais: foco em UX/UI, qualidade técnica, testes
- Ícone/avatar abstrato ou iniciais estilizadas como elemento visual

#### RF03.2 - Resumo Profissional
- Cards com números de destaque:
  - 3+ anos de experiência
  - 7 certificados
  - Tecnologias dominadas
- Texto sobre filosofia de trabalho

#### RF03.3 - Stack Tecnológico
- Visualização das tecnologias principais organizadas por categoria
- Frontend: React, TypeScript, JavaScript, styled-components, Framer Motion
- Backend: Python, FastAPI, PostgreSQL
- Testes: Jest, Playwright
- Ferramentas: Git, WebSocket, Docker
- IoT: Menção à experiência com soluções IoT

#### RF03.4 - Formação
- Engenharia de Software - UniCesumar (em andamento)
- Cursos complementares (Udemy, RocketSeat, Alura)

---

### RF04 - Página Skills & Certificados

#### RF04.1 - Skills Técnicas
- Organização por categorias com visual diferenciado:
  - **Frontend:** React, TypeScript, JavaScript, HTML, CSS, styled-components, Framer Motion
  - **Backend:** Python, FastAPI, PostgreSQL, REST APIs
  - **Testes:** Jest (unitários), Playwright (E2E)
  - **Real-time:** WebSocket
  - **Ferramentas:** Git, Docker, VS Code
  - **IoT:** Experiência com soluções IoT
  
- Cada skill deve ter:
  - Ícone da tecnologia
  - Nome
  - Indicador visual de proficiência (barra, círculo, ou design criativo)
  - Animação ao entrar na viewport

#### RF04.2 - Certificados
- Exibição dos 7 certificados em cards visuais
- Informações por certificado:
  - Nome do curso
  - Plataforma (Udemy, RocketSeat, Alura) com logo
  - Ano de conclusão (se disponível)
  - Badge/selo visual da plataforma
- Possibilidade de filtrar por plataforma
- Animação de entrada escalonada (stagger)

---

### RF05 - Live Lab (Demonstração Técnica)

#### RF05.1 - Introdução do Live Lab
- Explicação do propósito: demonstrar habilidades na prática
- Destaque para tecnologias utilizadas (WebSocket, React, Python)

#### RF05.2 - Chat em Tempo Real
O chat deve permitir que recrutadores conversem diretamente com Vinicius:

**Para o Visitante (Recrutador):**
- Interface de chat elegante e intuitiva
- Campo para inserir nome e empresa (opcional) antes de iniciar
- Envio de mensagens em tempo real
- Indicador de "digitando..." quando Vinicius estiver respondendo
- Indicador de status (online/offline)
- Histórico da conversa mantido durante a sessão
- Mensagem automática de boas-vindas quando iniciar o chat
- Notificação sonora sutil ao receber resposta (opcional, com toggle)

**Para Vinicius (Admin):**
- Painel simples para visualizar conversas ativas
- Notificação em tempo real de novas mensagens
- Notificação por email quando receber mensagem (backup)
- Possibilidade de responder pelo painel
- Visualização do nome/empresa do visitante

**Comportamento Offline:**
- Quando Vinicius estiver offline, exibir mensagem informativa
- Oferecer alternativa: formulário de contato por email
- Salvar mensagem para Vinicius ver depois

#### RF05.3 - Explicação Técnica
- Seção explicando como o chat foi construído
- Diagrama visual simples da arquitetura (WebSocket)
- Tecnologias utilizadas destacadas
- Link para código no GitHub (se público)

---

### RF06 - Página de Contato

#### RF06.1 - Formulário de Contato
- Campos:
  - Nome (obrigatório)
  - Email (obrigatório, com validação)
  - Empresa (opcional)
  - Assunto (opcional)
  - Mensagem (obrigatório)
- Validação em tempo real dos campos
- Feedback visual de sucesso/erro
- Envio de email para viniciusdatti@gmail.com
- Proteção contra spam (rate limiting, honeypot)

#### RF06.2 - Informações de Contato
- Email: viniciusdatti@gmail.com
- LinkedIn: link com ícone
- GitHub: link com ícone
- Localização: São Paulo (apenas informativo)

#### RF06.3 - CTA para Chat
- Destaque para o chat em tempo real como alternativa
- "Prefere conversar agora? Acesse o Live Lab"

---

### RF07 - Elementos Globais de UX/UI

#### RF07.1 - Tema e Aparência
- **Tema padrão:** Dark mode
- **Toggle de tema:** Botão para alternar entre dark/light mode
- Persistência da preferência do usuário (localStorage)
- Transição suave entre temas

#### RF07.2 - Animações e Micro-interações
Inspirado em portfólios premiados (Awwwards), incluir:
- Animações de entrada de elementos (fade, slide, scale)
- Parallax sutil em backgrounds
- Hover effects elaborados em cards e botões
- Cursor personalizado (opcional, desktop only)
- Loading states elegantes
- Transições de página suaves
- Scroll-triggered animations
- Micro-interações em formulários (focus, success, error)

#### RF07.3 - Responsividade
- Design mobile-first
- Breakpoints: mobile (<768px), tablet (768-1024px), desktop (>1024px)
- Menu hamburger animado em mobile
- Adaptação de layouts para cada breakpoint
- Touch-friendly em dispositivos móveis

#### RF07.4 - Performance
- Lazy loading de imagens e componentes
- Code splitting por rotas
- Otimização de animações (will-change, transform)
- Skeleton loaders durante carregamentos

#### RF07.5 - Acessibilidade
- Navegação por teclado
- Contraste adequado de cores
- Labels em formulários
- Alt text em imagens
- Focus states visíveis
- Suporte a leitores de tela

---

### RF08 - Internacionalização

- Manter suporte a PT-BR e EN-US (já existente)
- Toggle de idioma no header
- Todo conteúdo traduzido
- Persistência da preferência do usuário

---

### RF09 - SEO e Meta Tags

- Title e description otimizados por página
- Open Graph tags para compartilhamento em redes sociais
- Favicon personalizado
- Sitemap.xml
- robots.txt

---

## Regras de Negócio

### RN01 - Chat em Tempo Real
- Mensagens devem ser entregues em menos de 500ms
- Conexão WebSocket deve reconectar automaticamente em caso de queda
- Limite de 1000 caracteres por mensagem
- Rate limiting: máximo 10 mensagens por minuto por usuário
- Histórico de conversas mantido por 24 horas no servidor

### RN02 - Formulário de Contato
- Rate limiting: máximo 3 envios por hora por IP
- Email deve ser enviado em até 30 segundos após submissão
- Validação de email deve aceitar formatos válidos
- Mensagem mínima de 10 caracteres

### RN03 - Tema
- Preferência de tema deve ser salva no localStorage
- Se não houver preferência, usar dark mode como padrão
- Transição entre temas deve durar 300ms

### RN04 - Animações
- Animações devem respeitar `prefers-reduced-motion`
- Em dispositivos com baixa performance, reduzir animações
- Animações não devem bloquear interações do usuário

---

## Pontos de Atenção para Implementação

### Arquitetura Sugerida

**Frontend (React + TypeScript):**
- Manter estrutura atual com melhorias
- Adicionar React Router para navegação entre páginas
- Implementar Context API ou Zustand para estado global (tema, idioma)
- Socket.io-client para WebSocket
- Framer Motion para animações avançadas

**Backend (FastAPI + Python):**
- Manter estrutura atual
- Adicionar endpoints para:
  - WebSocket (chat)
  - Envio de emails (SMTP ou serviço como SendGrid)
  - Rate limiting
- Considerar Redis para:
  - Sessões de chat
  - Rate limiting
  - Cache

**Banco de Dados:**
- PostgreSQL (já existente)
- Novas tabelas:
  - `chat_sessions`: sessões de chat
  - `chat_messages`: mensagens do chat
  - `contact_submissions`: envios do formulário

### WebSocket - Considerações
- Usar Socket.io (facilita reconexão e fallbacks)
- Implementar heartbeat para detectar desconexões
- Considerar namespace separado para chat
- Autenticação simples para o painel admin

### Email - Considerações
- Usar serviço como SendGrid, Resend ou SMTP direto
- Template HTML para emails de contato
- Notificação por email quando receber mensagem no chat

### Deploy - Sugestões
- Frontend: Vercel ou Netlify (gratuito)
- Backend: Railway, Render ou Fly.io (planos gratuitos disponíveis)
- Banco de dados: Supabase ou Railway PostgreSQL
- WebSocket: Verificar suporte do provedor escolhido

### Segurança
- CORS configurado corretamente
- Rate limiting em todas as rotas públicas
- Sanitização de inputs
- HTTPS obrigatório em produção
- Variáveis de ambiente para secrets

### Performance
- Lighthouse score alvo: >90 em todas as métricas
- Lazy loading de rotas
- Otimização de bundle size
- Compressão de assets

---

## Fases de Implementação Sugeridas

### Fase 1 - Fundação
- Configurar React Router
- Implementar sistema de temas (dark/light)
- Criar layout base com header/footer
- Estruturar páginas vazias

### Fase 2 - Páginas Estáticas
- Home (Hero, previews)
- Sobre
- Skills & Certificados
- Contato (formulário)

### Fase 3 - Animações e Polish
- Implementar animações de entrada
- Micro-interações
- Responsividade completa
- Testes de UX

### Fase 4 - Live Lab (Chat)
- Backend WebSocket
- Frontend do chat
- Painel admin básico
- Notificações por email

### Fase 5 - Finalização
- SEO e meta tags
- Testes E2E
- Otimização de performance
- Deploy

---

## Referências de Design

Inspiração em portfólios premiados:
- **Bruno Simon** - Interatividade e criatividade
- **Awwwards Winners** - Qualidade visual e animações
- **Princípios:** "Show, don't tell" - demonstrar habilidades na prática

---

*Documento gerado em: 14/02/2026*
*Versão: 1.0*
